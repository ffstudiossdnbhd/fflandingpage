<?php
return [
    'db_host' => '127.0.0.1',
    'db_name' => 'ff_landing',
    'db_user' => 'root',
    'db_pass' => '',
    'email_to' => 'joegrryiojamin.ff@gmail.com',
    'email_from' => 'joegrryiojamin.ff@gmail.com',
    'email_from_name' => 'Financial Faiz - Job Application',
    'admin_email' => 'ffstudiossdnbhd@gmail.com',
    'admin_password' => '1234qwer',
    'upload_dir' => __DIR__ . '/uploads/resumes',
    'max_file_bytes' => 50 * 1024 * 1024,
    'smtp' => [
        'enabled' => true,
        'host' => 'smtp.gmail.com',
        'port' => 465,
        'secure' => 'ssl', // ssl (465) recommended for Gmail app password
        'username' => 'joegrryiojamin.ff@gmail.com',
        'password' => 'fqfzlnanhombihda', // set Gmail App Password here
        'timeout' => 20,
    ],
];
