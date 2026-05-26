<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/admin_common.php';
$config = require __DIR__ . '/config.php';
apiRequireGet();
requireAdminAuth($config);

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

    $total = (int)($pdo->query('SELECT COUNT(*) AS total FROM website_daily_visitors')->fetch()['total'] ?? 0);
    $today = (int)($pdo->query('SELECT COUNT(*) AS total FROM website_daily_visitors WHERE visit_date = CURDATE()')->fetch()['total'] ?? 0);

    $trendStmt = $pdo->query(
        'SELECT DATE_FORMAT(visit_date, "%Y-%m-%d") AS day, COUNT(*) AS visitors
         FROM website_daily_visitors
         WHERE visit_date >= DATE_SUB(CURDATE(), INTERVAL 13 DAY)
         GROUP BY visit_date
         ORDER BY visit_date ASC'
    );
    $trendRows = $trendStmt->fetchAll();
    $map = [];
    foreach ($trendRows as $row) {
        $map[(string)$row['day']] = (int)$row['visitors'];
    }

    $trend = [];
    for ($i = 13; $i >= 0; $i--) {
        $day = date('Y-m-d', strtotime("-{$i} days"));
        $trend[] = [
            'day' => $day,
            'visitors' => $map[$day] ?? 0,
        ];
    }

    apiJson([
        'ok' => true,
        'analytics' => [
            'totalVisitors' => $total,
            'todayVisitors' => $today,
            'trend14Days' => $trend,
        ],
    ]);
} catch (Throwable $e) {
    apiJson(['ok' => false, 'message' => 'Failed to load analytics.'], 500);
}

