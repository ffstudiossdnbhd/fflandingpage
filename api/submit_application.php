<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

$config = require __DIR__ . '/config.php';
require __DIR__ . '/admin_common.php';

function fail(string $message, int $status = 400): void {
    http_response_code($status);
    echo json_encode(['ok' => false, 'message' => $message]);
    exit;
}

function smtpExpect($socket, int $code): void {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (preg_match('/^\d{3}\s/', $line)) {
            break;
        }
    }
    if (!str_starts_with($response, (string)$code)) {
        throw new RuntimeException("SMTP expected {$code}, got: {$response}");
    }
}

function smtpSend($socket, string $command, int $expectCode): void {
    fwrite($socket, $command . "\r\n");
    smtpExpect($socket, $expectCode);
}

function sendViaSmtp(array $smtp, string $from, string $to, string $subject, string $headers, string $body): bool {
    $host = (string)($smtp['host'] ?? '');
    $port = (int)($smtp['port'] ?? 465);
    $secure = strtolower((string)($smtp['secure'] ?? 'ssl'));
    $username = (string)($smtp['username'] ?? '');
    $password = (string)($smtp['password'] ?? '');
    $timeout = (int)($smtp['timeout'] ?? 20);

    if ($host === '' || $username === '' || $password === '') {
        throw new RuntimeException('SMTP config incomplete.');
    }

    $transport = ($secure === 'ssl' ? 'ssl://' : '') . $host;
    $socket = @stream_socket_client($transport . ':' . $port, $errno, $errstr, $timeout);
    if (!$socket) {
        throw new RuntimeException("SMTP connect failed: {$errstr} ({$errno})");
    }

    try {
        stream_set_timeout($socket, $timeout);
        smtpExpect($socket, 220);
        smtpSend($socket, 'EHLO localhost', 250);
        smtpSend($socket, 'AUTH LOGIN', 334);
        smtpSend($socket, base64_encode($username), 334);
        smtpSend($socket, base64_encode($password), 235);
        smtpSend($socket, 'MAIL FROM:<' . $from . '>', 250);
        smtpSend($socket, 'RCPT TO:<' . $to . '>', 250);
        smtpSend($socket, 'DATA', 354);

        $raw = "Date: " . date(DATE_RFC2822) . "\r\n";
        $raw .= "To: {$to}\r\n";
        $raw .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $raw .= $headers . "\r\n";
        $raw .= $body;

        $safeRaw = preg_replace('/(?m)^\./', '..', $raw);
        fwrite($socket, $safeRaw . "\r\n.\r\n");
        smtpExpect($socket, 250);
        smtpSend($socket, 'QUIT', 221);
    } finally {
        fclose($socket);
    }

    return true;
}

$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    fail('Sila lengkapkan medan wajib.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('Alamat emel tidak sah.');
}
if (!isset($_FILES['resume']) || !is_array($_FILES['resume'])) {
    fail('Resume PDF diperlukan.');
}

$resume = $_FILES['resume'];
if (($resume['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    fail('Muat naik resume gagal.');
}
if (($resume['size'] ?? 0) > (int)$config['max_file_bytes']) {
    fail('Saiz resume melebihi had 50MB.');
}

$tmpPath = (string)$resume['tmp_name'];
$mime = mime_content_type($tmpPath);
$ext = strtolower(pathinfo((string)$resume['name'], PATHINFO_EXTENSION));
if ($mime !== 'application/pdf' && $ext !== 'pdf') {
    fail('Hanya fail PDF dibenarkan.');
}

$uploadDir = (string)$config['upload_dir'];
if (!is_dir($uploadDir) && !mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
    fail('Tidak dapat sediakan direktori muat naik.', 500);
}

$safeName = preg_replace('/[^a-zA-Z0-9_-]/', '-', pathinfo((string)$resume['name'], PATHINFO_FILENAME));
$safeName = trim((string)$safeName, '-');
if ($safeName === '') {
    $safeName = 'resume';
}
$storedFile = sprintf('%s-%s.pdf', $safeName, date('YmdHis'));
$storedPath = $uploadDir . DIRECTORY_SEPARATOR . $storedFile;
if (!move_uploaded_file($tmpPath, $storedPath)) {
    fail('Gagal simpan fail resume.', 500);
}

try {
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db_host'], $config['db_name']);
    $pdo = new PDO($dsn, (string)$config['db_user'], (string)$config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $stmt = $pdo->prepare('INSERT INTO career_applications (name, email, phone, message, resume_original_name, resume_stored_name, resume_path, created_at) VALUES (:name, :email, :phone, :message, :resume_original_name, :resume_stored_name, :resume_path, NOW())');
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':message' => $message,
        ':resume_original_name' => (string)$resume['name'],
        ':resume_stored_name' => $storedFile,
        ':resume_path' => $storedPath,
    ]);
} catch (Throwable $e) {
    if (is_file($storedPath)) {
        @unlink($storedPath);
    }
    fail('Database error: ' . $e->getMessage(), 500);
}

$emailSent = false;
$emailError = '';
$to = (string)$config['email_to'];

try {
    $settings = getAppSettings($pdo, $config);
    $dbEmailTo = trim((string)($settings['email_to'] ?? ''));
    if ($dbEmailTo !== '' && filter_var($dbEmailTo, FILTER_VALIDATE_EMAIL)) {
        $to = $dbEmailTo;
    }
} catch (Throwable $ignored) {
    // Fallback to config email if settings table is not ready.
}
$from = (string)$config['email_from'];
$fromName = (string)($config['email_from_name'] ?? 'Financial Faiz');
$encodedFromName = '=?UTF-8?B?' . base64_encode($fromName) . '?=';
$fromHeader = $encodedFromName . " <{$from}>";

$subject = 'Permohonan Kerjaya Baru - ' . $name;
$mixedBoundary = '==Multipart_Mixed_x' . md5((string)microtime()) . 'x';
$altBoundary = '==Multipart_Alt_x' . md5((string)microtime()) . 'x';
$headers = "From: {$fromHeader}\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$mixedBoundary}\"\r\n";

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safePhone = htmlspecialchars($phone !== '' ? $phone : '-', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
$submittedAt = date('Y-m-d H:i:s');

$bodyText = "Permohonan Kerjaya Baru\n\n"
    . "Nama: {$name}\n"
    . "Emel: {$email}\n"
    . "Telefon: " . ($phone !== '' ? $phone : '-') . "\n"
    . "Dihantar pada: {$submittedAt}\n\n"
    . "Pesanan:\n{$message}\n";

$bodyHtml = <<<HTML
<!doctype html>
<html lang="ms">
  <body style="margin:0;padding:24px;background:#f4f7ff;font-family:Arial,sans-serif;color:#1f2a37;">
    <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #d9e5ff;border-radius:14px;overflow:hidden;">
      <div style="padding:18px 22px;background:linear-gradient(120deg,#07348f,#0757d8);color:#ffffff;">
        <h2 style="margin:0;font-size:20px;line-height:1.3;">Permohonan Kerjaya Baru</h2>
        <p style="margin:8px 0 0;font-size:13px;opacity:0.9;">Financial Faiz Careers Submission</p>
      </div>
      <div style="padding:22px;">
        <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;border-bottom:1px solid #eef3ff;"><strong>Nama</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef3ff;text-align:right;">{$safeName}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eef3ff;"><strong>Emel</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef3ff;text-align:right;">{$safeEmail}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eef3ff;"><strong>Telefon</strong></td><td style="padding:8px 0;border-bottom:1px solid #eef3ff;text-align:right;">{$safePhone}</td></tr>
          <tr><td style="padding:8px 0;"><strong>Dihantar pada</strong></td><td style="padding:8px 0;text-align:right;">{$submittedAt}</td></tr>
        </table>
        <div style="margin-top:18px;padding:14px;border-radius:10px;background:#f8fbff;border:1px solid #e6efff;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#07348f;">Pesanan Pemohon</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">{$safeMessage}</p>
        </div>
        <p style="margin:16px 0 0;font-size:12px;color:#6b7280;">Resume PDF dilampirkan bersama emel ini.</p>
      </div>
    </div>
  </body>
</html>
HTML;

$body = "--{$mixedBoundary}\r\n";
$body .= "Content-Type: multipart/alternative; boundary=\"{$altBoundary}\"\r\n\r\n";

$body .= "--{$altBoundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $bodyText . "\r\n";

$body .= "--{$altBoundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $bodyHtml . "\r\n";

$body .= "--{$altBoundary}--\r\n";

$fileData = file_get_contents($storedPath);
if ($fileData !== false) {
    $body .= "--{$mixedBoundary}\r\n";
    $body .= "Content-Type: application/pdf; name=\"" . basename((string)$resume['name']) . "\"\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . basename((string)$resume['name']) . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($fileData)) . "\r\n";
}
$body .= "--{$mixedBoundary}--";

$smtp = $config['smtp'] ?? ['enabled' => false];
try {
    if (($smtp['enabled'] ?? false) === true) {
        $emailSent = sendViaSmtp((array)$smtp, $from, $to, $subject, $headers, $body);
    } else {
        $emailSent = @mail($to, $subject, $body, $headers);
    }
} catch (Throwable $mailEx) {
    $emailSent = false;
    $emailError = 'Rekod telah disimpan, tetapi emel gagal dihantar. Ralat SMTP: ' . $mailEx->getMessage();
}
if (!$emailSent && $emailError === '') {
    $emailError = 'Rekod telah disimpan, tetapi emel gagal dihantar. Semak konfigurasi SMTP/PHP mail server.';
}

echo json_encode([
    'ok' => true,
    'message' => $emailSent ? 'Permohonan berjaya dihantar.' : $emailError,
]);
