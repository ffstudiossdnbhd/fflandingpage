<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/admin_common.php';
$config = require __DIR__ . '/config.php';
apiRequireGet();
requireAdminAuth($config);

try {
    $pdo = dbConnect($config);
    $settings = getAppSettings($pdo, $config);

    $stmt = $pdo->query('SELECT id, name, email, phone, message, resume_original_name, resume_stored_name, created_at FROM career_applications ORDER BY created_at DESC, id DESC');
    $rows = $stmt->fetchAll();

    apiJson([
        'ok' => true,
        'settings' => [
            'emailTo' => $settings['email_to'],
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
            'updatedAt' => $settings['updated_at'],
        ],
        'submissions' => $rows,
    ]);
} catch (Throwable $e) {
    apiJson(['ok' => false, 'message' => 'Gagal load data admin.'], 500);
}
