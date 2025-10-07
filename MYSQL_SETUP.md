# Configuration MySQL pour Laravel

## 1. Créer la base de données

Avant d'exécuter Laravel, vous devez créer la base de données MySQL :

### Via phpMyAdmin ou MySQL Workbench
1. Ouvrez phpMyAdmin ou MySQL Workbench
2. Créez une nouvelle base de données nommée `laravel` (ou le nom que vous voulez)
3. Assurez-vous que l'encodage est `utf8mb4_unicode_ci`

### Via ligne de commande MySQL
```sql
CREATE DATABASE laravel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 2. Configurer le fichier .env

Copiez le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Puis modifiez les paramètres de base de données dans `.env` :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe_mysql
```

**Remplacez `votre_mot_de_passe_mysql` par votre vrai mot de passe MySQL.**

## 3. Vérifier la connexion

Après avoir configuré `.env`, testez la connexion :

```bash
php artisan migrate:status
```

Si la connexion réussit, vous verrez le statut des migrations. Sinon, vérifiez vos paramètres dans `.env`.

## 4. Exécuter les migrations et seeders

Une fois la connexion établie :

```bash
php artisan migrate:fresh --seed
```

Cette commande va :
- Supprimer toutes les tables existantes
- Créer la table `users` avec la structure définie
- Insérer les utilisateurs de test

## 5. Vérification finale

Pour vérifier que tout fonctionne :

```bash
php artisan tinker
```

Puis dans Tinker :
```php
User::all()
```

Vous devriez voir les deux utilisateurs créés.

## 🔧 Dépannage

### Erreur de connexion
- Vérifiez que MySQL est démarré
- Vérifiez les paramètres dans `.env`
- Assurez-vous que l'utilisateur MySQL a les droits sur la base de données

### Erreur de migration
- Vérifiez que la base de données existe
- Vérifiez les permissions de l'utilisateur MySQL

### Port MySQL différent
Si MySQL utilise un port différent (par exemple 3307), modifiez dans `.env` :
```env
DB_PORT=3307
```

## 📋 Résumé des actions MySQL

- ✅ Créer la base de données `laravel`
- ✅ Configurer `.env` avec les bonnes informations
- ✅ Tester la connexion avec `php artisan migrate:status`
- ✅ Exécuter `php artisan migrate:fresh --seed`

Une fois ces étapes terminées, Laravel sera entièrement configuré avec la base de données MySQL.
