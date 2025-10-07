<?php

echo "=== Vérification de la configuration MySQL ===\n\n";

// Charger les variables d'environnement
if (!file_exists('.env')) {
    echo "❌ Fichier .env non trouvé. Copiez .env.example vers .env\n";
    exit(1);
}

$env = parse_ini_file('.env');

// Vérifier les paramètres essentiels
$required = ['DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD'];
$missing = [];

foreach ($required as $key) {
    if (!isset($env[$key]) || empty($env[$key])) {
        $missing[] = $key;
    }
}

if (!empty($missing)) {
    echo "❌ Paramètres manquants dans .env : " . implode(', ', $missing) . "\n";
    exit(1);
}

echo "✅ Paramètres .env présents\n";

// Tester la connexion MySQL
try {
    $dsn = "mysql:host={$env['DB_HOST']};port={$env['DB_PORT']};charset=utf8mb4";
    $pdo = new PDO($dsn, $env['DB_USERNAME'], $env['DB_PASSWORD'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    echo "✅ Connexion MySQL réussie\n";

    // Vérifier si la base de données existe
    $stmt = $pdo->query("SHOW DATABASES LIKE '{$env['DB_DATABASE']}'");
    $exists = $stmt->fetch();

    if ($exists) {
        echo "✅ Base de données '{$env['DB_DATABASE']}' existe\n";
    } else {
        echo "⚠️  Base de données '{$env['DB_DATABASE']}' n'existe pas\n";
        echo "   Créez-la avec : CREATE DATABASE {$env['DB_DATABASE']} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n";
    }

} catch (PDOException $e) {
    echo "❌ Erreur de connexion MySQL : " . $e->getMessage() . "\n";
    echo "   Vérifiez vos paramètres dans .env\n";
    exit(1);
}

echo "\n=== Configuration OK ===\n";
echo "Vous pouvez maintenant exécuter : php artisan migrate:fresh --seed\n";
