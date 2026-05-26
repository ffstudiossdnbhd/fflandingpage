<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/admin_common.php';
$config = require __DIR__ . '/config.php';
apiRequirePost();
requireAdminAuth($config);

if (!isset($_FILES['image']) || !is_array($_FILES['image'])) {
    apiJson(['ok' => false, 'message' => 'Fail gambar diperlukan.'], 422);
}

$file = $_FILES['image'];
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    apiJson(['ok' => false, 'message' => 'Upload gambar gagal.'], 422);
}
if (($file['size'] ?? 0) > 8 * 1024 * 1024) {
    apiJson(['ok' => false, 'message' => 'Saiz gambar melebihi 8MB.'], 422);
}

$tmp = (string)($file['tmp_name'] ?? '');
$mime = mime_content_type($tmp) ?: '';
$allowed = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
];
if (!isset($allowed[$mime])) {
    apiJson(['ok' => false, 'message' => 'Format gambar tidak disokong. Gunakan JPG, PNG, WEBP atau GIF.'], 422);
}

$uploadDir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'ads';
if (!is_dir($uploadDir) && !mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
    apiJson(['ok' => false, 'message' => 'Tidak dapat sediakan direktori upload.'], 500);
}

$baseName = preg_replace('/[^a-zA-Z0-9_-]/', '-', pathinfo((string)$file['name'], PATHINFO_FILENAME));
$baseName = trim((string)$baseName, '-');
if ($baseName === '') {
    $baseName = 'ad-image';
}
$filename = sprintf('%s-%s.%s', $baseName, date('YmdHis'), $allowed[$mime]);
$fullPath = $uploadDir . DIRECTORY_SEPARATOR . $filename;

if (!move_uploaded_file($tmp, $fullPath)) {
    apiJson(['ok' => false, 'message' => 'Gagal simpan gambar.'], 500);
}

$imageUrl = '/testwebsite/ff-3d-landing/api/uploads/ads/' . rawurlencode($filename);
apiJson(['ok' => true, 'message' => 'Gambar berjaya diupload.', 'imageUrl' => $imageUrl]);
