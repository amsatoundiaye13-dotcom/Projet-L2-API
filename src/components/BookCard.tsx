import { Download, BookOpen } from 'lucide-react';
import { Book } from '../services/api';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Khassaïdes': 'bg-indigo-100 text-indigo-800',
      'Histoire': 'bg-amber-100 text-amber-800',
      'Enseignements': 'bg-rose-100 text-rose-800',
      'général': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.général;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col h-full">
        <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 flex items-center justify-center h-32">
          <BookOpen className="w-16 h-16 text-emerald-600 opacity-50" />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(book.category)}`}>
              {book.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2 font-medium">{book.author}</p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{book.description}</p>

          <a
            href={`http://localhost:5000${book.file_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full group-hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span>Télécharger PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
