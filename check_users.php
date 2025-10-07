<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Contracts\Console\Kernel;
use App\Models\User;

$app = require_once 'bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();

echo "=== Vérification des utilisateurs ===\n\n";

try {
    $users = User::all();

    if ($users->count() > 0) {
        echo "✅ {$users->count()} utilisateur(s) trouvé(s) :\n\n";

        foreach ($users as $user) {
            echo "ID: {$user->id}\n";
            echo "Nom: {$user->name}\n";
            echo "Email: {$user->email}\n";
            echo "Rôle: {$user->role}\n";
            echo "Créé le: {$user->created_at}\n";
            echo "---\n";
        }
    } else {
        echo "❌ Aucun utilisateur trouvé. Les seeders n'ont peut-être pas fonctionné.\n";
    }

} catch (Exception $e) {
    echo "❌ Erreur lors de la vérification : " . $e->getMessage() . "\n";
}

echo "\n=== Fin de la vérification ===\n";
