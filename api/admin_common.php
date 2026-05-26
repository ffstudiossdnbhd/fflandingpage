<?php
declare(strict_types=1);

function apiJson(array $payload, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload);
    exit;
}

function apiRequirePost(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        apiJson(['ok' => false, 'message' => 'Method not allowed'], 405);
    }
}

function apiRequireGet(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        apiJson(['ok' => false, 'message' => 'Method not allowed'], 405);
    }
}

function dbConnect(array $config): PDO {
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db_host'], $config['db_name']);
    return new PDO($dsn, (string)$config['db_user'], (string)$config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}

function ensureSettingsRow(PDO $pdo, array $config): void {
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS app_settings (
            id TINYINT UNSIGNED NOT NULL,
            email_to VARCHAR(190) NOT NULL,
            ad_enabled TINYINT(1) NOT NULL DEFAULT 0,
            ad_title VARCHAR(255) NOT NULL,
            ad_body TEXT NOT NULL,
            ad_cta_label VARCHAR(100) NOT NULL,
            ad_cta_url VARCHAR(500) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $stmt = $pdo->query('SELECT COUNT(*) AS total FROM app_settings');
    $count = (int)($stmt->fetch()['total'] ?? 0);
    if ($count > 0) {
        try {
            $pdo->exec('ALTER TABLE app_settings ADD COLUMN ad_image_url VARCHAR(500) NOT NULL DEFAULT \'\' AFTER ad_cta_url');
        } catch (Throwable $ignored) {
            // Column may already exist.
        }
        try {
            $pdo->exec('ALTER TABLE app_settings ADD COLUMN ad_posters_json TEXT NULL AFTER ad_image_url');
        } catch (Throwable $ignored) {
            // Column may already exist.
        }
        try {
            $pdo->exec('ALTER TABLE app_settings ADD COLUMN ad_eyebrow VARCHAR(120) NOT NULL DEFAULT \'Sponsored\' AFTER ad_enabled');
        } catch (Throwable $ignored) {
            // Column may already exist.
        }
        return;
    }

    $insert = $pdo->prepare('INSERT INTO app_settings (id, email_to, ad_enabled, ad_eyebrow, ad_title, ad_body, ad_cta_label, ad_cta_url, ad_image_url, ad_posters_json, created_at, updated_at) VALUES (1, :email_to, 0, :ad_eyebrow, :ad_title, :ad_body, :ad_cta_label, :ad_cta_url, :ad_image_url, :ad_posters_json, NOW(), NOW())');
    $insert->execute([
        ':email_to' => (string)$config['email_to'],
        ':ad_eyebrow' => 'Sponsored',
        ':ad_title' => 'Iklan Tajaan',
        ':ad_body' => 'Ruang iklan ini boleh diurus dari admin panel.',
        ':ad_cta_label' => 'Ketahui Lagi',
        ':ad_cta_url' => '#',
        ':ad_image_url' => '',
        ':ad_posters_json' => '[]',
    ]);
}

function getAppSettings(PDO $pdo, array $config): array {
    ensureSettingsRow($pdo, $config);
    $stmt = $pdo->query('SELECT id, email_to, ad_enabled, ad_eyebrow, ad_title, ad_body, ad_cta_label, ad_cta_url, ad_image_url, ad_posters_json, updated_at FROM app_settings WHERE id = 1 LIMIT 1');
    $row = $stmt->fetch();

    if (!$row) {
        return [
            'email_to' => (string)$config['email_to'],
            'ad_enabled' => false,
            'ad_eyebrow' => 'Sponsored',
            'ad_title' => 'Iklan Tajaan',
            'ad_body' => 'Ruang iklan ini boleh diurus dari admin panel.',
            'ad_cta_label' => 'Ketahui Lagi',
            'ad_cta_url' => '#',
            'ad_image_url' => '',
            'ad_posters' => [],
            'updated_at' => null,
        ];
    }

    $postersRaw = (string)($row['ad_posters_json'] ?? '[]');
    $posters = json_decode($postersRaw, true);
    if (!is_array($posters)) {
        $posters = [];
    }
    $posters = array_values(array_filter(array_map(static fn($x) => is_string($x) ? trim($x) : '', $posters), static fn($x) => $x !== ''));

    return [
        'email_to' => (string)$row['email_to'],
        'ad_enabled' => (int)$row['ad_enabled'] === 1,
        'ad_eyebrow' => (string)($row['ad_eyebrow'] ?? 'Sponsored'),
        'ad_title' => (string)$row['ad_title'],
        'ad_body' => (string)$row['ad_body'],
        'ad_cta_label' => (string)$row['ad_cta_label'],
        'ad_cta_url' => (string)$row['ad_cta_url'],
        'ad_image_url' => (string)($row['ad_image_url'] ?? ''),
        'ad_posters' => $posters,
        'updated_at' => $row['updated_at'] ?? null,
    ];
}

function requireAdminAuth(array $config): void {
    session_start();
    $expectedEmail = strtolower(trim((string)($config['admin_email'] ?? 'admin@financialfaiz.com')));
    $expectedPassword = (string)($config['admin_password'] ?? 'admin123');
    $ok = isset($_SESSION['ff_admin_ok']) && $_SESSION['ff_admin_ok'] === true;
    $email = isset($_SESSION['ff_admin_email']) ? strtolower(trim((string)$_SESSION['ff_admin_email'])) : '';
    $pass = isset($_SESSION['ff_admin_pass']) ? (string)$_SESSION['ff_admin_pass'] : '';

    if (
        !$ok
        || $email === ''
        || !hash_equals($expectedEmail, $email)
        || !hash_equals($expectedPassword, $pass)
    ) {
        apiJson(['ok' => false, 'message' => 'Unauthorized'], 401);
    }
}
