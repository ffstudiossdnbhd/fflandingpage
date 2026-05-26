CREATE DATABASE IF NOT EXISTS ff_landing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ff_landing;

CREATE TABLE IF NOT EXISTS career_applications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  message TEXT NOT NULL,
  resume_original_name VARCHAR(255) NOT NULL,
  resume_stored_name VARCHAR(255) NOT NULL,
  resume_path VARCHAR(500) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_email (email),
  KEY idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_settings (
  id TINYINT UNSIGNED NOT NULL,
  email_to VARCHAR(190) NOT NULL,
  ad_enabled TINYINT(1) NOT NULL DEFAULT 0,
  ad_eyebrow VARCHAR(120) NOT NULL DEFAULT 'Sponsored',
  ad_title VARCHAR(255) NOT NULL,
  ad_body TEXT NOT NULL,
  ad_cta_label VARCHAR(100) NOT NULL,
  ad_cta_url VARCHAR(500) NOT NULL,
  ad_image_url VARCHAR(500) NOT NULL DEFAULT '',
  ad_posters_json TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS website_daily_visitors (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  visit_date DATE NOT NULL,
  visitor_hash CHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_date_visitor (visit_date, visitor_hash),
  KEY idx_visit_date (visit_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
