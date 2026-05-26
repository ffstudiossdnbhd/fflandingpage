<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/admin_common.php';
$config = require __DIR__ . '/config.php';
apiRequireGet();

try {
    $pdo = dbConnect($config);
    $settings = getAppSettings($pdo, $config);
    apiJson([
        'ok' => true,
        'ad' => [
            'enabled' => $settings['ad_enabled'],
            'eyebrow' => $settings['ad_eyebrow'],
            'title' => $settings['ad_title'],
            'body' => $settings['ad_body'],
            'ctaLabel' => $settings['ad_cta_label'],
            'ctaUrl' => $settings['ad_cta_url'],
            'imageUrl' => $settings['ad_image_url'],
            'posters' => $settings['ad_posters'],
        ],
    ]);
} catch (Throwable $e) {
    apiJson(['ok' => false, 'message' => 'Failed to load public settings.'], 500);
}
