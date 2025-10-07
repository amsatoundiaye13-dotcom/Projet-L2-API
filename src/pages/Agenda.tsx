import { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { api, Event } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';

export default function Agenda() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadEvents();
    if (isAuthenticated) {
      loadFavorites();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory, showFavoritesOnly, favorites]);

  async function loadEvents() {
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadFavorites() {
    try {
      const data = await api.getFavorites();
      const favoriteIds = new Set(data.map((f: any) => f.event_id));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
    }
  }

  function filterEvents() {
    let filtered = events;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(event => favorites.has(event.id));
    }

    setFilteredEvents(filtered);
  }

  async function toggleFavorite(eventId: number) {
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour ajouter des favoris');
      return;
    }

    const isFavorite = favorites.has(eventId);

    try {
      if (isFavorite) {
        await api.removeFavorite(eventId);
        const newFavorites = new Set(favorites);
        newFavorites.delete(eventId);
        setFavorites(newFavorites);
      } else {
        await api.addFavorite(eventId);
        const newFavorites = new Set(favorites);
        newFavorites.add(eventId);
        setFavorites(newFavorites);
      }
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris:', error);
      alert('Erreur lors de la gestion des favoris');
    }
  }

  const categories = [
    { id: 'all', label: 'Tous les événements' },
    { id: 'ziarra', label: 'Ziarra' },
    { id: 'récital', label: 'Récitals' },
    { id: 'conférence', label: 'Conférences' },
    { id: 'service', label: 'Services' },
    { id: 'prière', label: 'Prières' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenda du Magal</h1>
          <p className="text-xl text-emerald-100">
            Programme complet des événements et activités
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {isAuthenticated && (
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFavoritesOnly
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star className={`w-5 h-5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                Favoris ({favorites.size})
              </button>
            )}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {showFavoritesOnly
                ? 'Aucun événement favori. Ajoutez des événements à vos favoris en cliquant sur l\'étoile.'
                : 'Aucun événement trouvé pour cette catégorie.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isFavorite={favorites.has(event.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
