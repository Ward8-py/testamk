<?php

declare(strict_types=1);

namespace AMK\Quote;

use PHPMailer\PHPMailer\PHPMailer;
use Throwable;

const MAX_BODY_BYTES = 16384;
const RATE_WINDOW_SECONDS = 600;
const RATE_LIMIT = 5;
const DUPLICATE_WINDOW_SECONDS = 600;
const MAX_FORM_AGE_MILLISECONDS = 86400000;
const MIN_FORM_AGE_MILLISECONDS = 2000;

const SERVICES = [
    'Development & Renovation',
    'Kitchens',
    'Bathrooms',
    'Bedrooms',
    'Marble & Granite',
    'Flooring',
    'Furnishing',
    'Other',
];

function requestId(): string
{
    try {
        return bin2hex(random_bytes(12));
    } catch (Throwable) {
        return str_replace('.', '', uniqid('amk', true));
    }
}

function report(string $requestId, string $outcome): void
{
    error_log(sprintf('[quote:%s] %s', $requestId, $outcome));
}

/** @param array<string, mixed> $body */
function respond(array $body, int $status, string $requestId, array $extraHeaders = []): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    header('X-Request-ID: ' . $requestId);
    foreach ($extraHeaders as $name => $value) {
        header($name . ': ' . $value);
    }
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function stringLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function stringSlice(string $value, int $length): string
{
    return function_exists('mb_substr') ? mb_substr($value, 0, $length, 'UTF-8') : substr($value, 0, $length);
}

function cleanText(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }
    if (class_exists('\Normalizer')) {
        $normalised = \Normalizer::normalize($value, \Normalizer::FORM_C);
        if (is_string($normalised)) {
            $value = $normalised;
        }
    }
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? '';
    $value = preg_replace('/\s+/u', ' ', $value) ?? '';
    return stringSlice(trim($value), $maxLength);
}

/** @return array{form: array<string, mixed>, fieldErrors: array<string, string>, looksAutomated: bool} */
function validatePayload(array $payload, ?int $nowMilliseconds = null): array
{
    $keys = ['service', 'postcode', 'name', 'phone', 'note', 'source'];
    $lengths = [];
    foreach ($keys as $key) {
        $lengths[$key] = is_string($payload[$key] ?? null) ? stringLength($payload[$key]) : 0;
    }

    $form = [
        'service' => cleanText($payload['service'] ?? null, 80),
        'postcode' => strtoupper(cleanText($payload['postcode'] ?? null, 12)),
        'name' => cleanText($payload['name'] ?? null, 80),
        'phone' => cleanText($payload['phone'] ?? null, 30),
        'note' => cleanText($payload['note'] ?? null, 1500),
        'source' => cleanText($payload['source'] ?? null, 80) ?: 'website',
        'privacyAccepted' => ($payload['privacyAccepted'] ?? null) === true,
        'formStartedAt' => is_numeric($payload['formStartedAt'] ?? null) ? (float) $payload['formStartedAt'] : NAN,
        'website' => cleanText($payload['website'] ?? null, 200),
    ];

    $errors = [];
    if (!in_array($form['service'], SERVICES, true) || $lengths['service'] > 80) {
        $errors['service'] = 'Choose a service from the list.';
    }
    if ($lengths['postcode'] > 12) {
        $errors['postcode'] = 'Keep the postcode under 12 characters.';
    } elseif (preg_match('/^[A-Z0-9][A-Z0-9\s-]{1,10}[A-Z0-9]$/i', $form['postcode']) !== 1) {
        $errors['postcode'] = 'Enter a valid project postcode.';
    }
    if ($lengths['name'] > 80) {
        $errors['name'] = 'Keep your name under 80 characters.';
    } elseif (stringLength($form['name']) < 2) {
        $errors['name'] = 'Enter your name.';
    }
    if ($lengths['phone'] > 30) {
        $errors['phone'] = 'Keep the phone number under 30 characters.';
    } elseif (preg_match('/^[+()\d\s.\-]{7,30}$/', $form['phone']) !== 1) {
        $errors['phone'] = 'Enter a valid phone number.';
    }
    if ($lengths['note'] > 1500) {
        $errors['note'] = 'Keep the project note under 1,500 characters.';
    }
    if ($lengths['source'] > 80) {
        $errors['source'] = 'The form source is invalid.';
    }
    if (!$form['privacyAccepted']) {
        $errors['privacyAccepted'] = 'Confirm that you have read the Privacy Policy.';
    }

    $nowMilliseconds ??= (int) floor(microtime(true) * 1000);
    $elapsed = $nowMilliseconds - $form['formStartedAt'];
    $automated = $form['website'] !== ''
        || !is_finite($form['formStartedAt'])
        || $elapsed < MIN_FORM_AGE_MILLISECONDS
        || $elapsed > MAX_FORM_AGE_MILLISECONDS;

    return ['form' => $form, 'fieldErrors' => $errors, 'looksAutomated' => $automated];
}

/** @param array<string, mixed> $config */
function isAllowedOrigin(array $config, ?string $origin): bool
{
    if (!is_string($origin) || $origin === '') {
        return false;
    }
    $normalisedOrigin = rtrim($origin, '/');
    foreach (($config['allowed_origins'] ?? []) as $allowed) {
        if (is_string($allowed) && hash_equals(rtrim($allowed, '/'), $normalisedOrigin)) {
            return true;
        }
    }
    return false;
}

function ensurePrivateDirectory(string $path): void
{
    if (!is_dir($path) && !mkdir($path, 0700, true) && !is_dir($path)) {
        throw new \RuntimeException('Private storage unavailable.');
    }
    if (!is_writable($path)) {
        throw new \RuntimeException('Private storage is not writable.');
    }
}

/** @return array{rateLimited: bool, duplicate: bool, reservation: ?array{path: string, token: string}} */
function enforceAbuseControls(array $config, array $form, string $clientIp, ?int $now = null): array
{
    $secret = $config['hash_salt'] ?? '';
    $storage = $config['storage_path'] ?? '';
    if (!is_string($secret) || strlen($secret) < 24 || !is_string($storage) || $storage === '') {
        throw new \RuntimeException('Security configuration unavailable.');
    }

    $now ??= time();
    ensurePrivateDirectory($storage);
    $rateDirectory = $storage . DIRECTORY_SEPARATOR . 'rate';
    $duplicateDirectory = $storage . DIRECTORY_SEPARATOR . 'duplicate';
    ensurePrivateDirectory($rateDirectory);
    ensurePrivateDirectory($duplicateDirectory);

    $ipHash = hash_hmac('sha256', $clientIp, $secret);
    $ratePath = $rateDirectory . DIRECTORY_SEPARATOR . $ipHash . '.json';
    $rateHandle = fopen($ratePath, 'c+');
    if ($rateHandle === false || !flock($rateHandle, LOCK_EX)) {
        if (is_resource($rateHandle)) {
            fclose($rateHandle);
        }
        throw new \RuntimeException('Rate limiter unavailable.');
    }
    rewind($rateHandle);
    $decoded = json_decode(stream_get_contents($rateHandle) ?: '[]', true);
    $timestamps = is_array($decoded) ? array_values(array_filter($decoded, static fn ($item): bool => is_int($item) && $item > $now - RATE_WINDOW_SECONDS)) : [];
    $rateLimited = count($timestamps) >= RATE_LIMIT;
    if (!$rateLimited) {
        $timestamps[] = $now;
        ftruncate($rateHandle, 0);
        rewind($rateHandle);
        if (fwrite($rateHandle, json_encode($timestamps)) === false || !fflush($rateHandle)) {
            flock($rateHandle, LOCK_UN);
            fclose($rateHandle);
            throw new \RuntimeException('Rate limiter write failed.');
        }
    }
    flock($rateHandle, LOCK_UN);
    fclose($rateHandle);

    if ($rateLimited) {
        return ['rateLimited' => true, 'duplicate' => false, 'reservation' => null];
    }

    $fingerprintInput = implode('|', [
        $form['service'],
        $form['postcode'],
        strtolower($form['name']),
        preg_replace('/\D/', '', $form['phone']) ?? '',
        strtolower($form['note']),
    ]);
    $fingerprint = hash_hmac('sha256', $fingerprintInput, $secret);
    $duplicatePath = $duplicateDirectory . DIRECTORY_SEPARATOR . $fingerprint . '.json';
    $duplicateHandle = fopen($duplicatePath, 'c+');
    if ($duplicateHandle === false || !flock($duplicateHandle, LOCK_EX)) {
        if (is_resource($duplicateHandle)) {
            fclose($duplicateHandle);
        }
        throw new \RuntimeException('Duplicate protection unavailable.');
    }
    rewind($duplicateHandle);
    $existing = json_decode(stream_get_contents($duplicateHandle) ?: '{}', true);
    $duplicate = is_array($existing) && is_int($existing['expires'] ?? null) && $existing['expires'] > $now;
    $reservation = null;
    if (!$duplicate) {
        $token = bin2hex(random_bytes(12));
        $state = ['expires' => $now + DUPLICATE_WINDOW_SECONDS, 'token' => $token];
        ftruncate($duplicateHandle, 0);
        rewind($duplicateHandle);
        if (fwrite($duplicateHandle, json_encode($state)) === false || !fflush($duplicateHandle)) {
            flock($duplicateHandle, LOCK_UN);
            fclose($duplicateHandle);
            throw new \RuntimeException('Duplicate protection write failed.');
        }
        $reservation = ['path' => $duplicatePath, 'token' => $token];
    }
    flock($duplicateHandle, LOCK_UN);
    fclose($duplicateHandle);

    return ['rateLimited' => false, 'duplicate' => $duplicate, 'reservation' => $reservation];
}

/** @param array{path: string, token: string}|null $reservation */
function releaseDuplicateReservation(?array $reservation): void
{
    if ($reservation === null || !is_file($reservation['path'])) {
        return;
    }
    $handle = @fopen($reservation['path'], 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return;
    }
    rewind($handle);
    $existing = json_decode(stream_get_contents($handle) ?: '{}', true);
    if (is_array($existing) && hash_equals((string) ($existing['token'] ?? ''), $reservation['token'])) {
        ftruncate($handle, 0);
        rewind($handle);
        fflush($handle);
    }
    flock($handle, LOCK_UN);
    fclose($handle);
}

/** @param array<string, mixed> $config */
function deliverEmail(array $config, array $form, string $requestId): void
{
    foreach (['smtp_host', 'smtp_username', 'smtp_password', 'from_email', 'to_email'] as $key) {
        if (!is_string($config[$key] ?? null) || trim($config[$key]) === '') {
            throw new \RuntimeException('Email configuration unavailable.');
        }
    }

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->Port = (int) ($config['smtp_port'] ?? 465);
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAutoTLS = true;
    $mail->Timeout = 8;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom($config['from_email'], (string) ($config['from_name'] ?? 'AMK Website'));
    $mail->addAddress($config['to_email']);
    $mail->Subject = 'New AMK quote request — ' . $form['service'];
    $mail->isHTML(false);
    $mail->Body = implode("\n", [
        'New AMK quote request',
        '',
        'Service: ' . $form['service'],
        'Project postcode: ' . $form['postcode'],
        'Name: ' . $form['name'],
        'Phone: ' . $form['phone'],
        'Project note: ' . ($form['note'] ?: 'Not provided'),
        'Source: ' . $form['source'],
        'Privacy policy acknowledged: Yes',
        'Request reference: ' . $requestId,
    ]);
    $mail->send();
}

/** @param array<string, mixed> $config */
function handleQuoteRequest(array $config): never
{
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    if (is_string($config['log_path'] ?? null) && $config['log_path'] !== '') {
        ini_set('error_log', $config['log_path']);
    }

    $requestId = requestId();
    $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
    if ($method !== 'POST') {
        report($requestId, 'method_rejected');
        respond(['ok' => false, 'code' => 'METHOD_NOT_ALLOWED', 'message' => 'Use POST for this endpoint.'], 405, $requestId, ['Allow' => 'POST']);
    }

    if (!isAllowedOrigin($config, $_SERVER['HTTP_ORIGIN'] ?? null)) {
        report($requestId, 'origin_rejected');
        respond(['ok' => false, 'code' => 'ORIGIN_REJECTED', 'message' => 'This request could not be accepted.'], 403, $requestId);
    }

    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($contentLength > MAX_BODY_BYTES) {
        report($requestId, 'payload_rejected');
        respond(['ok' => false, 'code' => 'PAYLOAD_TOO_LARGE', 'message' => 'The request is too large.'], 413, $requestId);
    }

    $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
    if (!str_starts_with($contentType, 'application/json')) {
        report($requestId, 'content_type_rejected');
        respond(['ok' => false, 'code' => 'VALIDATION', 'message' => 'This request must use JSON.'], 415, $requestId);
    }

    $raw = file_get_contents('php://input');
    if (!is_string($raw) || strlen($raw) > MAX_BODY_BYTES) {
        report($requestId, 'payload_rejected');
        respond(['ok' => false, 'code' => 'PAYLOAD_TOO_LARGE', 'message' => 'The request is too large.'], 413, $requestId);
    }

    try {
        $payload = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    } catch (Throwable) {
        $payload = null;
    }
    if (!is_array($payload)) {
        report($requestId, 'invalid_payload');
        respond(['ok' => false, 'code' => 'VALIDATION', 'message' => 'Check the form and try again.'], 400, $requestId);
    }

    $validation = validatePayload($payload);
    if ($validation['looksAutomated']) {
        report($requestId, 'bot_rejected');
        respond(['ok' => false, 'code' => 'VALIDATION', 'message' => 'Check the form and try again.'], 400, $requestId);
    }
    if ($validation['fieldErrors'] !== []) {
        report($requestId, 'validation_failed');
        respond([
            'ok' => false,
            'code' => 'VALIDATION',
            'message' => 'Check the highlighted fields.',
            'fieldErrors' => $validation['fieldErrors'],
        ], 400, $requestId);
    }

    $reservation = null;
    try {
        $abuse = enforceAbuseControls(
            $config,
            $validation['form'],
            (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown')
        );
        if ($abuse['rateLimited']) {
            report($requestId, 'rate_limited');
            respond([
                'ok' => false,
                'code' => 'RATE_LIMITED',
                'message' => 'Too many requests. Please wait ten minutes or use WhatsApp.',
            ], 429, $requestId, ['Retry-After' => (string) RATE_WINDOW_SECONDS]);
        }
        if ($abuse['duplicate']) {
            report($requestId, 'duplicate_suppressed');
            respond(['ok' => true, 'duplicate' => true], 200, $requestId);
        }
        $reservation = $abuse['reservation'];
        deliverEmail($config, $validation['form'], $requestId);
        report($requestId, 'delivered');
        respond(['ok' => true], 200, $requestId);
    } catch (Throwable) {
        releaseDuplicateReservation($reservation);
        report($requestId, 'delivery_unavailable');
        respond([
            'ok' => false,
            'code' => 'DELIVERY_FAILED',
            'message' => 'Online delivery is temporarily unavailable. Please use WhatsApp.',
        ], 503, $requestId);
    }
}
