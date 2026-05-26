<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/admin_common.php';
$config = require __DIR__ . '/config.php';

if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'POST'], true)) {
    apiJson(['ok' => false, 'message' => 'Method not allowed'], 405);
}

try {
    $pdo = dbConnect($config);
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS website_daily_visitors (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            visit_date DATE NOT NULL,
            visitor_hash CHAR(64) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY uniq_date_visitor (visit_date, visitor_hash),
            KEY idx_visit_date (visit_date)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $ip = (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
    $ua = (string)($_SERVER['HTTP_USER_AGENT'] ?? 'unknown');
    $salt = (string)($config['db_name'] ?? 'ff_landing');
    $visitorHash = hash('sha256', $ip . '|' . $ua . '|' . $salt);
    $today = date('Y-m-d');

    $stmt = $pdo->prepare('INSERT IGNORE INTO website_daily_visitors (visit_date, visitor_hash, created_at) VALUES (:visit_date, :visitor_hash, NOW())');
    $stmt->execute([
        ':visit_date' => $today,
        ':visitor_hash' => $visitorHash,
    ]);

    apiJson(['ok' => true]);
} catch (Throwable $e) {
    apiJson(['ok' => false, 'message' => 'track_failed'], 500);
}

