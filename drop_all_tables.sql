-- Script pour supprimer toutes les tables de la base e_mgal_db
-- ATTENTION : Cette commande supprime TOUTES les données !

SET FOREIGN_KEY_CHECKS = 0;

-- Supprimer toutes les tables si elles existent
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS migrations;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS cache;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS failed_jobs;

SET FOREIGN_KEY_CHECKS = 1;

-- Message de confirmation
SELECT 'Toutes les tables ont été supprimées avec succès' as status;
