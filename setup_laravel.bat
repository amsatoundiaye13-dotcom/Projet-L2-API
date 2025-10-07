@echo off
echo === Configuration Laravel pour les utilisateurs ===

REM Vérifier si composer est installé
composer --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Composer n'est pas installé. Veuillez l'installer d'abord.
    pause
    exit /b 1
)

REM Vérifier si .env existe
if not exist .env (
    echo Création du fichier .env...
    copy .env.example .env
    echo ⚠️  Veuillez configurer votre base de données dans le fichier .env
    echo Puis relancer ce script.
    pause
    exit /b 1
)

echo Installation des dépendances...
composer install

echo.
echo Génération de la clé d'application...
php artisan key:generate

echo.
echo Exécution des migrations et seeders...
php artisan migrate:fresh --seed

echo.
echo === Configuration terminée ===
echo.
echo Comptes de test créés :
echo Administrateur: amsatoundiaye@gmail.com / admin123
echo Utilisateur: user@example.com / user123
echo.
echo Pour vérifier les utilisateurs créés :
echo php artisan tinker
echo Puis: User::all()
echo.
echo === Terminé ===
pause
