<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer l'utilisateur administrateur
        User::create([
            'name' => 'Amsatou Ndiaye',
            'email' => 'amsatoundiaye@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Créer l'utilisateur régulier
        User::create([
            'name' => 'Utilisateur Régulier',
            'email' => 'user@example.com',
            'password' => Hash::make('user123'),
            'role' => 'user',
        ]);
    }
}
