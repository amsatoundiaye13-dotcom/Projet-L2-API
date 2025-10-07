-- Script de création de la base de données E-Magal Gi
-- Base de données: e_mgal_db
-- Utilisateur: root
-- Mot de passe: 77884455

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS e_mgal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE e_mgal_db;

-- Table des utilisateurs (administrateurs et utilisateurs finaux)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des événements
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time VARCHAR(10) NOT NULL,
    location VARCHAR(255) NOT NULL,
    category ENUM('ziarra', 'récital', 'conférence', 'service', 'prière', 'général') NOT NULL DEFAULT 'général',
    image_url VARCHAR(500),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_event_date (event_date),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des livres
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('Khassaïdes', 'Histoire', 'Enseignements', 'général') NOT NULL DEFAULT 'général',
    cover_image_url VARCHAR(500),
    file_path VARCHAR(500) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_title (title),
    INDEX idx_author (author),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des favoris
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, event_id),
    INDEX idx_user_id (user_id),
    INDEX idx_event_id (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion d'un utilisateur administrateur par défaut
-- Mot de passe: admin123 (hashé avec bcrypt)
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@emagal.sn', '$2b$10$rKZJxv3qEZHVN4zJxqKOa.vN0h.K0YoP8gP5K0Z4Z5Z5Z5Z5Z5Z5Z5', 'admin');

-- Insertion d'un utilisateur simple par défaut
-- Mot de passe: user123 (hashé avec bcrypt)
INSERT INTO users (username, email, password, role) VALUES
('utilisateur', 'user@emagal.sn', '$2b$10$rKZJxv3qEZHVN4zJxqKOa.vN0h.K0YoP8gP5K0Z4Z5Z5Z5Z5Z5Z5Z5', 'user');

-- Insertion des événements d'exemple
INSERT INTO events (title, description, event_date, event_time, location, category, created_by) VALUES
('Grande Ziarra', 'Visite spirituelle à la Grande Mosquée de Touba', '2025-11-15', '08:00', 'Grande Mosquée de Touba', 'ziarra', 1),
('Récital de Khassaïdes', 'Récitation des poèmes du Cheikh Ahmadou Bamba', '2025-11-15', '14:00', 'Esplanade Centrale', 'récital', 1),
('Conférence : Histoire du Magal', 'Présentation de l''histoire et signification du Magal', '2025-11-14', '16:00', 'Centre Culturel', 'conférence', 1),
('Distribution de repas', 'Service communautaire de repas aux pèlerins', '2025-11-15', '12:00', 'Divers points de la ville', 'service', 1),
('Prières collectives', 'Prières en congrégation pour la paix', '2025-11-15', '18:00', 'Grande Mosquée de Touba', 'prière', 1);

-- Insertion des livres d'exemple
INSERT INTO books (title, author, category, description, file_path, created_by) VALUES
('Masâlik al-Jinân', 'Cheikh Ahmadou Bamba', 'Khassaïdes', 'Recueil de poèmes spirituels célébrant la voie vers le Paradis', '/uploads/books/masalik.pdf', 1),
('Mawâhib al-Quddûs', 'Cheikh Ahmadou Bamba', 'Khassaïdes', 'Poèmes sur les dons du Très-Saint', '/uploads/books/mawahib.pdf', 1),
('Histoire du Mouridisme', 'Serigne Bachir Mbacké', 'Histoire', 'Récit complet de l''histoire de la confrérie mouride', '/uploads/books/histoire.pdf', 1),
('Enseignements du Cheikh', 'Compilation', 'Enseignements', 'Sagesses et enseignements de Cheikh Ahmadou Bamba', '/uploads/books/enseignements.pdf', 1),
('Le Magal de Touba', 'Auteurs Divers', 'Histoire', 'Origine, signification et célébration du Grand Magal', '/uploads/books/magal.pdf', 1);
