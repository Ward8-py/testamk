<?php

declare(strict_types=1);

$privateRoot = getenv('AMK_PRIVATE_ROOT');
if (!is_string($privateRoot) || $privateRoot === '') {
    $privateRoot = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'private';
}

$serviceFile = $privateRoot . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'QuoteService.php';
$autoloadFile = $privateRoot . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
$configFile = $privateRoot . DIRECTORY_SEPARATOR . 'config.php';

if (!is_file($serviceFile) || !is_file($autoloadFile) || !is_file($configFile)) {
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode([
        'ok' => false,
        'code' => 'DELIVERY_FAILED',
        'message' => 'Online delivery is temporarily unavailable. Please use WhatsApp.',
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

require $autoloadFile;
require $serviceFile;

$config = require $configFile;
if (!is_array($config)) {
    $config = [];
}

AMK\Quote\handleQuoteRequest($config);
