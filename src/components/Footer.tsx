import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm flex items-center justify-center gap-2">
            Créé avec <Heart className="w-4 h-4 text-red-500 fill-current" /> pour le Magal de Touba
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2025 E-Magal Gi - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
