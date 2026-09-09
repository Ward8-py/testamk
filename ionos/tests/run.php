<?php

declare(strict_types=1);

require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'private' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'QuoteService.php';

use function AMK\Quote\enforceAbuseControls;
use function AMK\Quote\isAllowedOrigin;
use function AMK\Quote\releaseDuplicateReservation;
use function AMK\Quote\validatePayload;

$failures = [];

function check(bool $condition, string $message): void
{
    global $failures;
    if (!$condition) {
        $failures[] = $message;
    }
}

$nowMilliseconds = 2_000_000_000_000;
$validPayload = [
    'service' => 'Kitchens',
    'postcode' => 'ha1 2uf',
    'name' => 'Test Customer',
    'phone' => '+44 7970 000000',
    'note' => 'A kitchen renovation',
    'source' => 'ionos-test',
    'privacyAccepted' => true,
    'formStartedAt' => $nowMilliseconds - 5000,
    'website' => '',
];

$valid = validatePayload($validPayload, $nowMilliseconds);
check($valid['fieldErrors'] === [], 'A valid quote must pass validation.');
check($valid['looksAutomated'] === false, 'A normally completed form must not be marked as automated.');
check($valid['form']['postcode'] === 'HA1 2UF', 'The postcode must be normalised to uppercase.');

$invalid = validatePayload([
    ...$validPayload,
    'service' => 'Injected service',
    'postcode' => '!',
    'name' => '',
    'phone' => 'abc',
    'privacyAccepted' => false,
], $nowMilliseconds);
foreach (['service', 'postcode', 'name', 'phone', 'privacyAccepted'] as $field) {
    check(isset($invalid['fieldErrors'][$field]), sprintf('Invalid %s must be rejected.', $field));
}

$bot = validatePayload([...$validPayload, 'website' => 'spam'], $nowMilliseconds);
check($bot['looksAutomated'] === true, 'The honeypot must reject automated submissions.');
$tooFast = validatePayload([...$validPayload, 'formStartedAt' => $nowMilliseconds - 100], $nowMilliseconds);
check($tooFast['looksAutomated'] === true, 'A form submitted too quickly must be rejected.');

$originConfig = ['allowed_origins' => ['https://www.amkbuildingconstruction.co.uk']];
check(isAllowedOrigin($originConfig, 'https://www.amkbuildingconstruction.co.uk'), 'The production origin must be accepted.');
check(!isAllowedOrigin($originConfig, 'https://example.com'), 'An unlisted origin must be rejected.');
check(!isAllowedOrigin($originConfig, null), 'A missing origin must be rejected.');

$storage = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'amk-quote-test-' . bin2hex(random_bytes(6));
$abuseConfig = ['hash_salt' => str_repeat('s', 32), 'storage_path' => $storage];
$first = enforceAbuseControls($abuseConfig, $valid['form'], '192.0.2.10', 1000);
check(!$first['rateLimited'] && !$first['duplicate'] && $first['reservation'] !== null, 'The first submission must be reserved.');
$duplicate = enforceAbuseControls($abuseConfig, $valid['form'], '192.0.2.10', 1001);
check($duplicate['duplicate'] === true, 'An identical submission must be suppressed for ten minutes.');
releaseDuplicateReservation($first['reservation']);
$afterRelease = enforceAbuseControls($abuseConfig, [...$valid['form'], 'note' => 'A changed request'], '192.0.2.11', 1002);
check(!$afterRelease['duplicate'], 'A released or changed submission must be accepted.');

for ($index = 0; $index < 5; $index += 1) {
    $form = [...$valid['form'], 'note' => 'Rate test ' . $index];
    enforceAbuseControls($abuseConfig, $form, '192.0.2.20', 2000 + $index);
}
$limited = enforceAbuseControls($abuseConfig, [...$valid['form'], 'note' => 'Rate test final'], '192.0.2.20', 2006);
check($limited['rateLimited'] === true, 'The sixth submission in ten minutes must be rate limited.');

function removeTree(string $path): void
{
    if (!is_dir($path)) return;
    foreach (scandir($path) ?: [] as $entry) {
        if ($entry === '.' || $entry === '..') continue;
        $target = $path . DIRECTORY_SEPARATOR . $entry;
        if (is_dir($target)) removeTree($target);
        else unlink($target);
    }
    rmdir($path);
}
removeTree($storage);

if ($failures !== []) {
    fwrite(STDERR, implode(PHP_EOL, array_map(static fn (string $failure): string => 'FAIL: ' . $failure, $failures)) . PHP_EOL);
    exit(1);
}

echo "IONOS quote backend tests passed.\n";
