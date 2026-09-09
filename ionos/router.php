<?php

declare(strict_types=1);

$root = dirname(__DIR__);
$publicRoot = $root . DIRECTORY_SEPARATOR . 'ionos-release' . DIRECTORY_SEPARATOR . 'public';
$privateRoot = $root . DIRECTORY_SEPARATOR . 'ionos-release' . DIRECTORY_SEPARATOR . 'private';
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');

if ($path === '/api/quote') {
    putenv('AMK_PRIVATE_ROOT=' . $privateRoot);
    require $publicRoot . DIRECTORY_SEPARATOR . 'api' . DIRECTORY_SEPARATOR . 'quote.php';
}

if ($path === '/api/quote.php' || preg_match('#^/services(?:/|$)#', $path) === 1) {
    http_response_code(404);
    readfile($publicRoot . DIRECTORY_SEPARATOR . '404.html');
    return true;
}

$candidate = $publicRoot . str_replace('/', DIRECTORY_SEPARATOR, $path);
if (is_file($candidate)) {
    return false;
}
if (is_dir($candidate) && is_file($candidate . DIRECTORY_SEPARATOR . 'index.html')) {
    readfile($candidate . DIRECTORY_SEPARATOR . 'index.html');
    return true;
}

http_response_code(404);
readfile($publicRoot . DIRECTORY_SEPARATOR . '404.html');
return true;
