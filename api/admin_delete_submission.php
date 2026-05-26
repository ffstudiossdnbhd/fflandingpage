<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/admin_common.php';
$config = require __DIR__ . '/config.php';
apiRequirePost();
requireAdminAuth($config);

$input = json_decode(file_get_contents('php://input') ?: '{}', true);
$id = (int)($input['id'] ?? 0);
if ($id <= 0) {
    apiJson(['ok' => false, 'message' => 'ID submission tidak sah.'], 422);
}

try {
    $pdo = dbConnect($config);

    $findStmt = $pdo->prepare('SELECT id, resume_stored_name FROM career_applications WHERE id = :id LIMIT 1');
    $findStmt->execute([':id' => $id]);
    $row = $findStmt->fetch();

    if (!$row) {
      apiJson(['ok' => false, 'message' => 'Submission tidak dijumpai.'], 404);
    }

    $deleteStmt = $pdo->prepare('DELETE FROM career_applications WHERE id = :id LIMIT 1');
    $deleteStmt->execute([':id' => $id]);

    $stored = trim((string)($row['resume_stored_name'] ?? ''));
    if ($stored !== '') {
        $candidate = __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'resumes' . DIRECTORY_SEPARATOR . $stored;
        $resolved = realpath($candidate);
        $base = realpath(__DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'resumes');
        if ($resolved !== false && $base !== false && str_starts_with($resolved, $base) && is_file($resolved)) {
            @unlink($resolved);
        }
    }

    apiJson(['ok' => true, 'message' => 'Submission berjaya dipadam.']);
} catch (Throwable $e) {
    apiJson(['ok' => false, 'message' => 'Gagal padam submission.'], 500);
}
