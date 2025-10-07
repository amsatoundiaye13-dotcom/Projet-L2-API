# Utilisation de Laravel pour la gestion des utilisateurs

Ce document explique comment utiliser Laravel pour gérer la base de données et les utilisateurs dans ce projet.

## 📋 Prérequis

- **PHP 8.2+**
- **Composer** (gestionnaire de dépendances PHP)
- **MySQL 8.0+** installé et démarré

## 🗄️ Configuration MySQL

### 1. Créer la base de données

```sql
CREATE DATABASE laravel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Configurer l'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Modifier .env avec vos paramètres MySQL
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=votre_mot_de_passe
```

### 3. Tester la connexion MySQL

```bash
php check_mysql.php
```

## 🚀 Installation et exécution

### Méthode automatique (recommandée)

```bash
# Windows
./setup_laravel.bat

# Linux/Mac
./setup_laravel.sh
```

### Méthode manuelle

```bash
# Installer les dépendances
composer install

# Générer la clé d'application
php artisan key:generate

# Exécuter migrations et seeders
php artisan migrate:fresh --seed
```

## 👥 Utilisateurs créés

- **Administrateur** : `amsatoundiaye@gmail.com` / `admin123`
- **Utilisateur régulier** : `user@example.com` / `user123`

## 🔍 Vérification

```bash
# Vérifier le statut des migrations
php artisan migrate:status

# Accéder à Tinker pour voir les utilisateurs
php artisan tinker
User::all();
```

## Script d'installation

Un script Windows (`setup_laravel.bat`) et un script Linux/Mac (`setup_laravel.sh`) sont fournis pour automatiser ces étapes.

## Notes

- Assurez-vous que votre fichier `.env` est correctement configuré avec les paramètres de connexion à la base de données.
- Le modèle User inclut une méthode `isAdmin()` pour vérifier le rôle administrateur.

Pour toute question, contactez l'équipe de développement.
