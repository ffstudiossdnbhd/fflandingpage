<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/admin_common.php';
$config = require __DIR__ . '/config.php';
apiRequirePost();

session_start();
$input = json_decode(file_get_contents('php://input') ?: '{}', true);
$email = strtolower(trim((string)($input['email'] ?? '')));
$password = trim((string)($input['password'] ?? ''));
$expectedEmail = strtolower(trim((string)($config['admin_email'] ?? 'admin@financialfaiz.com')));
$expectedPassword = (string)($config['admin_password'] ?? 'admin123');

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    apiJson(['ok' => false, 'message' => 'Email tidak sah.'], 401);
}

if (!hash_equals($expectedEmail, $email) || $password === '' || !hash_equals($expectedPassword, $password)) {
    apiJson(['ok' => false, 'message' => 'Email atau password tidak sah.'], 401);
}

$_SESSION['ff_admin_ok'] = true;
$_SESSION['ff_admin_email'] = $email;
$_SESSION['ff_admin_pass'] = $password;
apiJson(['ok' => true, 'message' => 'Login berjaya.']);
