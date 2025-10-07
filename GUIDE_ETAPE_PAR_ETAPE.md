# Guide Étape par Étape - Configuration Laravel avec Base de Données Existante

## 📋 Votre situation
- Vous avez déjà une base de données MySQL `e_mgal_db`
- Mot de passe MySQL : `77884455`
- Vous voulez générer les tables Laravel dans cette base existante

## 🔧 Étape 1 : Configuration du fichier .env

**Action manuelle requise :** Modifiez votre fichier `.env` (à la racine du projet Laravel) :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e_mgal_db
DB_USERNAME=root
DB_PASSWORD=77884455
```

## 🚀 Étape 2 : Installation des dépendances

```bash
composer install
```

## 🔑 Étape 3 : Génération de la clé d'application

```bash
php artisan key:generate
```

## 🗄️ Étape 4 : Migration de la base de données

⚠️ **ATTENTION :** Cette commande va supprimer TOUTES les tables existantes dans `e_mgal_db` et les recréer.

```bash
php artisan migrate:fresh
```

## 👥 Étape 5 : Création des utilisateurs de test

```bash
php artisan db:seed --class=UserSeeder
```

## 🔍 Étape 6 : Vérification

```bash
php artisan tinker
```

Puis dans Tinker :
```php
User::all()
```

Vous devriez voir :
- Administrateur : amsatoundiaye@gmail.com
- Utilisateur : user@example.com

## 📝 Commande complète (si vous voulez tout faire d'un coup)

```bash
composer install && php artisan key:generate && php artisan migrate:fresh --seed
```

## ✅ Résultat attendu

Après ces étapes, votre base de données `e_mgal_db` contiendra :
- Table `users` avec les colonnes : id, name, email, password, role, timestamps
- 2 utilisateurs de test avec mots de passe hashés

## 🔧 Dépannage

Si vous avez des erreurs :
1. Vérifiez que MySQL est démarré
2. Vérifiez les paramètres dans `.env`
3. Vérifiez que la base `e_mgal_db` existe
4. Testez la connexion : `php artisan migrate:status`
