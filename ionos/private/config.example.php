<?php

declare(strict_types=1);

// Copy this file to config.php on IONOS, fill in the two private values, and
// keep it outside the directory connected to the public domain.
return [
    'allowed_origins' => [
        'https://www.amkbuildingconstruction.co.uk',
        'https://amkbuildingconstruction.co.uk',
        'https://staging.amkbuildingconstruction.co.uk',
    ],
    'smtp_host' => 'smtp.ionos.co.uk',
    'smtp_port' => 465,
    'smtp_username' => 'website@amkbuildingconstruction.co.uk',
    'smtp_password' => 'REPLACE_WITH_THE_MAILBOX_PASSWORD',
    'from_email' => 'website@amkbuildingconstruction.co.uk',
    'from_name' => 'AMK Website',
    'to_email' => 'info@amkbuildingconstruction.co.uk',
    'hash_salt' => 'REPLACE_WITH_AT_LEAST_24_RANDOM_CHARACTERS',
    'storage_path' => __DIR__ . DIRECTORY_SEPARATOR . 'storage',
    'log_path' => __DIR__ . DIRECTORY_SEPARATOR . 'logs' . DIRECTORY_SEPARATOR . 'quote.log',
];
