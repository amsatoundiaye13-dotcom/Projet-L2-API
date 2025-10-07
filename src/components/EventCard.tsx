import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import { Event } from '../services/api';

interface EventCardProps {
  event: Event;
  isFavorite: boolean;
  onToggleFavorite: (eventId: number) => void;
}

export default function EventCard({ event, isFavorite, onToggleFavorite }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      ziarra: 'bg-blue-100 text-blue-800',
      récital: 'bg-purple-100 text-purple-800',
      conférence: 'bg-orange-100 text-orange-800',
      service: 'bg-green-100 text-green-800',
      prière: 'bg-teal-100 text-teal-800',
      général: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.général;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
          <button
            onClick={() => onToggleFavorite(event.id)}
            className="text-yellow-500 hover:scale-110 transition-transform"
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Star className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>{event.event_time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
