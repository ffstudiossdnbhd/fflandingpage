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

function fail(string $message, int $status = 400): void {
    http_response_code($status);
    echo json_encode(['ok' => false, 'message' => $message]);
    exit;
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
$from = (string)$config['email_from'];

$subject = 'Permohonan Kerjaya Baru - ' . $name;
$boundary = '==Multipart_Boundary_x' . md5((string)microtime()) . 'x';
$headers = "From: {$from}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

$bodyText = "Nama: {$name}\nEmel: {$email}\nTelefon: {$phone}\n\nPesanan:\n{$message}\n";

$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $bodyText . "\r\n";

$fileData = file_get_contents($storedPath);
if ($fileData !== false) {
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: application/pdf; name=\"" . basename((string)$resume['name']) . "\"\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . basename((string)$resume['name']) . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($fileData)) . "\r\n";
}
$body .= "--{$boundary}--";

$emailSent = @mail($to, $subject, $body, $headers);
if (!$emailSent) {
    $emailError = 'Rekod telah disimpan, tetapi emel gagal dihantar. Semak konfigurasi SMTP/PHP mail server.';
}

echo json_encode([
    'ok' => true,
    'message' => $emailSent ? 'Permohonan berjaya dihantar.' : $emailError,
]);
