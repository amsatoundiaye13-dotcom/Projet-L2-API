# E-Magal-Gi - Installation & Structure

**E-Magal-Gi** est une plateforme web dédiée au Magal de Touba, construite avec **React.js** et **Express.js**.

## ⚙️ Fonctionnalités principales

### Accueil
- Présentation du Magal de Touba
- Message d'accueil et actualités
- Navigation vers Agenda et Bibliothèque

### Agenda
- Liste des événements (ziarra, récital, conférences, etc.)
- CRUD pour administrateurs
- Filtrage par catégories

### Bibliothèque
- Catalogue de Khassaïdes, Histoire, Enseignements
- Recherche par titre/auteur
- Téléchargement de PDF

### Authentification
- JWT sécurisé
- Rôles : Admin / Utilisateur
- Favoris
- Upload sécurisé de fichiers

---

## 🧰 Technologies utilisées

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js, TypeScript
- **Base de données**: MySQL 8+
- **Sécurité**: JWT, bcryptjs, CORS
- **Fichiers**: Multer (upload)
- **ORM**: `mysql2`

---

## 🚀 Installation & Configuration

### Prérequis

- Node.js v18+
- npm v8+
- MySQL v8+
- Git

### Étapes

#### 1. Clonage du dépôt

```bash
git clone https://github.com/amsatoundiaye13-dotcom/Projet-L2-API.git
cd Projet-L2-API
npm install
