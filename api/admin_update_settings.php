<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/admin_common.php';
$config = require __DIR__ . '/config.php';
apiRequirePost();
requireAdminAuth($config);

$input = json_decode(file_get_contents('php://input') ?: '{}', true);
$emailTo = trim((string)($input['emailTo'] ?? ''));
$ad = $input['ad'] ?? [];

if (!filter_var($emailTo, FILTER_VALIDATE_EMAIL)) {
    apiJson(['ok' => false, 'message' => 'Email penerima tidak sah.'], 422);
}

$adEnabled = !empty($ad['enabled']) ? 1 : 0;
$adEyebrow = trim((string)($ad['eyebrow'] ?? ''));
$adTitle = trim((string)($ad['title'] ?? ''));
$adBody = trim((string)($ad['body'] ?? ''));
$adCtaLabel = trim((string)($ad['ctaLabel'] ?? ''));
$adCtaUrl = trim((string)($ad['ctaUrl'] ?? ''));
$adImageUrl = trim((string)($ad['imageUrl'] ?? ''));
$adPosters = $ad['posters'] ?? [];

if ($adTitle === '') $adTitle = 'Iklan Tajaan';
if ($adEyebrow === '') $adEyebrow = 'Sponsored';
if ($adBody === '') $adBody = 'Ruang iklan ini boleh diurus dari admin panel.';
if ($adCtaLabel === '') $adCtaLabel = 'Ketahui Lagi';
if ($adCtaUrl === '') $adCtaUrl = '#';

if (!preg_match('#^(https?://|/)#i', $adCtaUrl) && $adCtaUrl !== '#') {
    apiJson(['ok' => false, 'message' => 'URL CTA mesti bermula dengan http://, https:// atau /.'], 422);
}
if ($adImageUrl !== '' && !preg_match('#^(https?://|/)#i', $adImageUrl)) {
    apiJson(['ok' => false, 'message' => 'URL gambar mesti bermula dengan http://, https:// atau /.'], 422);
}
if (!is_array($adPosters)) {
    $adPosters = [];
}
$adPosters = array_values(array_filter(array_map(static fn($x) => is_string($x) ? trim($x) : '', $adPosters), static fn($x) => $x !== ''));
if (count($adPosters) > 8) {
    apiJson(['ok' => false, 'message' => 'Maksimum 8 poster sahaja dibenarkan.'], 422);
}
foreach ($adPosters as $posterUrl) {
    if (!preg_match('#^(https?://|/)#i', $posterUrl)) {
        apiJson(['ok' => false, 'message' => 'URL poster mesti bermula dengan http://, https:// atau /.'], 422);
    }
}

try {
    $pdo = dbConnect($config);
    ensureSettingsRow($pdo, $config);

    $stmt = $pdo->prepare('UPDATE app_settings SET email_to = :email_to, ad_enabled = :ad_enabled, ad_eyebrow = :ad_eyebrow, ad_title = :ad_title, ad_body = :ad_body, ad_cta_label = :ad_cta_label, ad_cta_url = :ad_cta_url, ad_image_url = :ad_image_url, ad_posters_json = :ad_posters_json, updated_at = NOW() WHERE id = 1');
    $stmt->execute([
        ':email_to' => $emailTo,
        ':ad_enabled' => $adEnabled,
        ':ad_eyebrow' => $adEyebrow,
        ':ad_title' => $adTitle,
        ':ad_body' => $adBody,
        ':ad_cta_label' => $adCtaLabel,
        ':ad_cta_url' => $adCtaUrl,
        ':ad_image_url' => $adImageUrl,
        ':ad_posters_json' => json_encode($adPosters, JSON_UNESCAPED_SLASHES),
    ]);

    apiJson(['ok' => true, 'message' => 'Settings berjaya dikemaskini.']);
} catch (Throwable $e) {
    apiJson(['ok' => false, 'message' => 'Gagal simpan settings.'], 500);
}
