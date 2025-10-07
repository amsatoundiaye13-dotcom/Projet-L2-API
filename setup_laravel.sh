#!/bin/bash

echo "=== Configuration Laravel pour les utilisateurs ==="

# Vérifier si composer est installé
if ! command -v composer &> /dev/null; then
    echo "Composer n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si .env existe
if [ ! -f .env ]; then
    echo "Création du fichier .env..."
    cp .env.example .env
    echo "⚠️  Veuillez configurer votre base de données dans le fichier .env"
    echo "Puis relancer ce script."
    exit 1
fi

echo "Installation des dépendances..."
composer install

echo "Génération de la clé d'application..."
php artisan key:generate

echo "Exécution des migrations et seeders..."
php artisan migrate:fresh --seed

echo ""
echo "=== Configuration terminée ==="
echo ""
echo "Comptes de test créés :"
echo "Administrateur: amsatoundiaye@gmail.com / admin123"
echo "Utilisateur: user@example.com / user123"
echo ""
echo "Pour vérifier les utilisateurs créés :"
echo "php artisan tinker"
echo "Puis: User::all()"
echo ""
echo "=== Terminé ==="
