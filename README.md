# E-Mgal-gi - Guide d'installation

Ce guide t'accompagne pas à pas pour installer et configurer l'application E-Mgal-gi sur ton ordinateur. L'application est une plateforme web moderne pour le Magal de Touba, développée avec React.js et Express.js.

**⚠️ Important** : Tu devras adapter certains paramètres (comme le mot de passe MySQL) à ta configuration personnelle.

## Fonctionnalités principales

### Accueil
- Présentation détaillée du Magal de Touba (histoire, signification spirituelle)
- Message d'accueil personnalisé
- Actualités et annonces récentes
- Navigation rapide vers l'Agenda et la Bibliothèque

### Agenda
- Liste chronologique complète des événements du Magal
- Descriptions détaillées de chaque activité (ziarra, récital, conférences, etc.)
- Filtrage par catégories (ziarra, récital, conférence, service, prière)
- Gestion CRUD pour les administrateurs

### Bibliothèque
- Catalogue complet d'ouvrages (Khassaïdes, Histoire, Enseignements)
- Recherche par titre ou auteur
- Filtrage par catégories
- Téléchargement de fichiers PDF
- Aperçu des extraits disponibles

### Authentification et Autorisations
- Système d'authentification JWT sécurisé
- Rôles utilisateur : Administrateur et Utilisateur standard
- Gestion des favoris personnels
- Upload sécurisé de fichiers PDF

## Technologies utilisées

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Lucide React
- **Backend**: Express.js + TypeScript + Node.js
- **Base de données**: MySQL 8+
- **Sécurité**: JWT (jsonwebtoken) + bcryptjs + CORS
- **Upload de fichiers**: Multer
- **ORM**: mysql2 (queries directes)

## 📋 Prérequis système

- **Node.js** : Version 18 ou supérieure
- **MySQL** : Version 8 ou supérieure
- **npm** : Version 8 ou supérieure (inclus avec Node.js)
- **Navigateur web** : Chrome, Firefox, Safari ou Edge (dernières versions)

## 📦 Installation et Configuration - Étape par étape

### Étape 1 : Prérequis (si pas déjà fait)
Avant de commencer, assure-toi d'avoir installé :
- **Node.js** version 18+ (téléchargeable sur https://nodejs.org/)
- **MySQL** version 8+ (téléchargeable sur https://dev.mysql.com/downloads/mysql/)
- **Git** (téléchargeable sur https://git-scm.com/)

Vérifie les installations :
```bash
node --version  # Doit afficher v18.x.x ou plus
npm --version   # Doit afficher 8.x.x ou plus
mysql --version # Doit afficher 8.x.x ou plus
```

### Étape 2 : Clonage et installation des dépendances

```bash
# Ouvrez un terminal et allez dans votre dossier de projets
cd "C:\Users\[VOTRE_NOM_UTILISATEUR]\Documents\GitHub"

# Clonez le projet (remplacez [URL_DU_DEPOT] par l'URL GitHub réelle)
git clone [URL_DU_DEPOT] "E-Magal-Gi"
cd "E-Magal-Gi"

# Installez toutes les dépendances
npm install
```

### Étape 3 : Configuration de votre base de données MySQL

#### Méthode recommandée : Import automatique
```bash
# Remplacez [VOTRE_MOT_DE_PASSE_MYSQL] par votre vrai mot de passe MySQL
mysql -u root -p[VOTRE_MOT_DE_PASSE_MYSQL] < database/schema.sql
```

#### Si la méthode automatique ne marche pas :
Ouvrez MySQL Workbench ou la ligne de commande MySQL :
```sql
-- Connectez-vous à MySQL
mysql -u root -p

-- Créez la base de données
CREATE DATABASE e_mgal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utilisez la base de données
USE e_mgal_db;

-- Copiez-collez le contenu du fichier database/schema.sql ici
-- (ouvrez le fichier database/schema.sql et exécutez son contenu)

-- Quittez MySQL
EXIT;
```

### Étape 4 : Configuration de vos paramètres personnels

Ouvrez le fichier `server/.env` avec VS Code et modifiez ces lignes avec vos informations :

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=[VOTRE_MOT_DE_PASSE_MYSQL_RÉEL]
DB_NAME=e_mgal_db
JWT_SECRET=magal_secret_key_2025_touba_secure
```

**Exemple concret** :
Si votre mot de passe MySQL est `monmotdepasse123`, mettez :
```env
DB_PASSWORD=monmotdepasse123
```

## Démarrage de l'application

### Étape 5 : Lancement de l'application complète
Après avoir configuré MySQL et tes paramètres personnels, lance l'application complète :

```bash
# Assure-toi d'être dans le dossier du projet
cd "C:\Users\[VOTRE_NOM_UTILISATEUR]\Documents\GitHub\E-Magal-Gi"

# Lance à la fois le serveur backend et le frontend
npm run dev
```

Cette commande va :
- Démarrer le serveur API sur `http://localhost:5000`
- Démarrer l'application frontend sur `http://localhost:5173`

### Étape 6 : Test de connexion
Ouvre ton navigateur et va sur `http://localhost:5173`
- Tu devrais voir la page d'accueil de E-Mgal-gi
- Essaye de te connecter avec les comptes de test

## 👥 Comptes de démonstration

### Administrateur
- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `admin123`
- **Permissions** : Gestion complète des événements et livres

### Utilisateur standard
- **Nom d'utilisateur** : `utilisateur`
- **Mot de passe** : `user123`
- **Permissions** : Consultation et téléchargement

## 📖 Guide d'utilisation

### Navigation générale
1. **Connexion** : Utilisez les comptes de démonstration ou créez un nouveau compte
2. **Accueil** : Découvrez la présentation du Magal et les actualités
3. **Agenda** : Consultez le programme chronologique des événements
4. **Bibliothèque** : Explorez et téléchargez les ressources disponibles

### Pour les administrateurs
- **Ajout d'événements** : Bouton "Ajouter un événement" dans l'Agenda
- **Modification** : Bouton "Modifier" sur chaque carte d'événement
- **Suppression** : Bouton "Supprimer" avec confirmation
- **Gestion des livres** : Même interface dans la Bibliothèque avec upload PDF

### Recherche et filtrage
- **Agenda** : Filtrez par catégorie d'événement
- **Bibliothèque** : Recherchez par titre/auteur et filtrez par catégorie

## 🏗️ Architecture du projet

```
E-Magal Gi/
├── database/
│   └── schema.sql              # Schéma de base de données MySQL
├── dist/
│   └── server/                 # Code compilé du serveur
├── server/
│   ├── config/
│   │   └── database.ts         # Configuration de connexion MySQL
│   ├── middleware/
│   │   └── auth.ts             # Middleware JWT d'authentification
│   ├── routes/
│   │   ├── auth.ts             # Routes d'authentification
│   │   ├── events.ts           # API des événements
│   │   ├── books.ts            # API de la bibliothèque
│   │   └── favorites.ts        # API des favoris
│   ├── index.ts                # Point d'entrée du serveur Express
│   ├── tsconfig.json           # Configuration TypeScript serveur
│   └── .env                    # Variables d'environnement
├── src/
│   ├── components/             # Composants React réutilisables
│   │   ├── Navbar.tsx          # Barre de navigation
│   │   ├── EventCard.tsx       # Carte d'événement
│   │   ├── BookCard.tsx        # Carte de livre
│   │   ├── EventForm.tsx       # Formulaire d'événement
│   │   └── BookForm.tsx        # Formulaire de livre
│   ├── context/
│   │   └── AuthContext.tsx     # Contexte d'authentification
│   ├── pages/                  # Pages principales
│   │   ├── Home.tsx            # Page d'accueil
│   │   ├── Agenda.tsx          # Page des événements
│   │   └── Bibliotheque.tsx    # Page de la bibliothèque
│   ├── services/
│   │   └── api.ts              # Service API client
│   ├── App.tsx                 # Composant racine React
│   ├── main.tsx                # Point d'entrée Vite
│   └── index.css               # Styles globaux Tailwind
├── uploads/
│   └── books/                  # Stockage des fichiers PDF uploadés
├── package.json                # Dépendances et scripts npm
├── tailwind.config.js          # Configuration Tailwind CSS
├── tsconfig.json               # Configuration TypeScript frontend
├── vite.config.ts              # Configuration Vite
└── README.md                   # Documentation (ce fichier)
```

## 🔗 API Endpoints

### Authentification
```http
POST /api/auth/register    # Inscription utilisateur
POST /api/auth/login       # Connexion utilisateur
```

### Événements
```http
GET    /api/events         # Liste des événements
GET    /api/events/:id     # Détails d'un événement
POST   /api/events         # Créer un événement (admin)
PUT    /api/events/:id     # Modifier un événement (admin)
DELETE /api/events/:id     # Supprimer un événement (admin)
```

### Bibliothèque
```http
GET    /api/books          # Liste des livres
GET    /api/books/:id      # Détails d'un livre
POST   /api/books          # Créer un livre (admin + upload)
PUT    /api/books/:id      # Modifier un livre (admin)
DELETE /api/books/:id      # Supprimer un livre (admin)
```

### Favoris
```http
GET    /api/favorites      # Favoris de l'utilisateur
POST   /api/favorites      # Ajouter aux favoris
DELETE /api/favorites/:id  # Retirer des favoris
```

## 🧪 Tests et validation

### Test de l'API avec cURL

```bash
# Test de santé du serveur
curl http://localhost:5000/api/health

# Connexion administrateur
curl -X POST -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  http://localhost:5000/api/auth/login

# Récupération des événements
curl http://localhost:5000/api/events
```

### Tests fonctionnels
1. **Authentification** : Connexion avec différents comptes
2. **CRUD Événements** : Création, lecture, mise à jour, suppression
3. **CRUD Livres** : Upload et gestion des fichiers PDF
4. **Favoris** : Ajout et suppression de favoris
5. **Responsive** : Test sur mobile et desktop

## 🔒 Sécurité

- **Hashage des mots de passe** : bcrypt avec 10 rounds de salage
- **Authentification stateless** : JWT avec expiration (24h)
- **Protection des routes** : Middleware JWT pour les endpoints sensibles
- **Validation des uploads** : Fichiers PDF uniquement, taille max 50MB
- **CORS configuré** : Restrictions d'origine pour la sécurité
- **Sanitisation des entrées** : Validation des données utilisateur

## 🚀 Déploiement en production

### Build du frontend
```bash
npm run build
```

### Build du serveur
```bash
npm run build:server
```

### Variables d'environnement production
```env
NODE_ENV=production
PORT=5000
DB_HOST=votre-serveur-mysql
DB_USER=votre-utilisateur
DB_PASSWORD=votre-mot-de-passe
DB_NAME=e_mgal_db
JWT_SECRET=votre-cle-secrete-très-longue-et-complexe
```

## 🐛 Dépannage

### Problème : "npm : Impossible de charger le fichier... l'exécution de scripts est désactivée"
**Solution** : Politique d'exécution PowerShell
```powershell
# Ouvrez PowerShell en tant qu'administrateur et exécutez :
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
**Alternative** : Utilisez l'invite de commande (cmd) au lieu de PowerShell

### Problème : "Fatal: creation path already exists"
**Solution** : Le dossier existe déjà
```bash
# Option 1 : Supprimer et recloner
rmdir /s "E-Magal-Gi"
git clone [URL_DU_DEPOT] "E-Magal-Gi"

# Option 2 : Cloner avec un nouveau nom
git clone [URL_DU_DEPOT] "E-Magal-Gi-v2"
```

### Problème : "Le chemin d'accès spécifié est introuvable"
**Solution** : Vérifiez le chemin exact
```bash
# Vérifiez votre emplacement actuel
pwd

# Listez les dossiers disponibles
dir

# Exemple de chemin correct
cd "C:\Users\[VOTRE_NOM_UTILISATEUR]\Documents\GitHub\E-Magal-Gi"
```

### Problème : Erreur de connexion MySQL
**Solutions** :
- Vérifiez que MySQL est démarré (services Windows)
- Contrôlez le mot de passe dans `server/.env`
- Assurez-vous que la base `e_mgal_db` existe :
  ```sql
  mysql -u root -p
  SHOW DATABASES;
  ```

### Problème : Erreur de compilation TypeScript
```bash
npm run typecheck
```

### Problème : Ports déjà utilisés (5000 ou 5173)
**Solution** : Changez les ports
- Modifiez `PORT=5001` dans `server/.env`
- Ou arrêtez les processus utilisant ces ports

### Problème : `npm install` échoue
```bash
# Nettoyez et réinstallez
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Problème : L'application ne se lance pas
- Vérifiez que les deux terminaux sont ouverts (backend + frontend)
- Vérifiez les messages d'erreur dans les terminaux
- Assurez-vous que les ports ne sont pas utilisés par autre chose


