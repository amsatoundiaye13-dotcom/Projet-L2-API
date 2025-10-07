# Configuration Laravel pour les Utilisateurs

Ce guide explique comment configurer Laravel pour créer les utilisateurs de test.

## Fichiers créés

### 1. Migration des utilisateurs
- **Fichier :** `database/migrations/2014_10_12_000000_create_users_table.php`
- **Description :** Crée la table `users` avec les colonnes nécessaires dont `role`

### 2. Modèle User
- **Fichier :** `app/Models/User.php`
- **Description :** Modèle Eloquent pour les utilisateurs avec méthode `isAdmin()`

### 3. Seeder des utilisateurs
- **Fichier :** `database/seeders/UserSeeder.php`
- **Description :** Crée deux utilisateurs de test

### 4. DatabaseSeeder
- **Fichier :** `database/seeders/DatabaseSeeder.php`
- **Description :** Configure l'exécution du UserSeeder

## Commandes à exécuter

### 1. Installer les dépendances (si pas déjà fait)
```bash
composer install
```

### 2. Configurer l'environnement
Copiez le fichier `.env.example` vers `.env` et configurez votre base de données :
```bash
cp .env.example .env
```

Modifiez les variables de base de données dans `.env` :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=votre_base_de_donnees
DB_USERNAME=votre_username
DB_PASSWORD=votre_password
```

### 3. Générer la clé d'application
```bash
php artisan key:generate
```

### 4. Exécuter les migrations et seeders
```bash
php artisan migrate:fresh --seed
```

Cette commande va :
- Supprimer toutes les tables existantes
- Recréer la structure de la base de données
- Insérer les utilisateurs de test

## Comptes de test créés

### Administrateur
- **Nom :** Amsatou Ndiaye
- **Email :** amsatoundiaye@gmail.com
- **Mot de passe :** admin123
- **Rôle :** admin

### Utilisateur régulier
- **Nom :** Utilisateur Régulier
- **Email :** user@example.com
- **Mot de passe :** user123
- **Rôle :** user

## Vérification

Pour vérifier que les utilisateurs ont été créés correctement :

```bash
php artisan tinker
```

Puis dans Tinker :
```php
User::all()
```

Vous devriez voir les deux utilisateurs avec leurs informations.

## Utilisation dans le code

Pour vérifier si un utilisateur est administrateur :
```php
if (auth()->user()->isAdmin()) {
    // Code pour administrateur
}
```

Pour vérifier le rôle directement :
```php
$user = auth()->user();
if ($user->role === 'admin') {
    // Code pour administrateur
}
