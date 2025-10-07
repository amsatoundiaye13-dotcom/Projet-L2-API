import { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Save, X } from 'lucide-react';
import { api, Event, Book } from '../services/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'events' | 'books'>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [bookFile, setBookFile] = useState<File | null>(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === 'events') {
        const data = await api.getEvents();
        setEvents(data);
      } else {
        const data = await api.getBooks();
        setBooks(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    }
  };

  const handleSaveEvent = async () => {
    try {
      if (editingEvent?.id) {
        await api.updateEvent(editingEvent.id, editingEvent);
      } else {
        await api.createEvent(editingEvent!);
      }
      setEditingEvent(null);
      setShowEventForm(false);
      loadData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSaveBook = async () => {
    try {
      if (editingBook?.id) {
        await api.updateBook(editingBook.id, editingBook);
      } else {
        const formData = new FormData();
        formData.append('title', editingBook!.title!);
        formData.append('author', editingBook!.author!);
        formData.append('description', editingBook!.description!);
        formData.append('category', editingBook!.category || 'général');
        if (editingBook!.cover_image_url) {
          formData.append('cover_image_url', editingBook!.cover_image_url);
        }
        if (bookFile) {
          formData.append('file', bookFile);
        }
        await api.createBook(formData);
      }
      setEditingBook(null);
      setShowBookForm(false);
      setBookFile(null);
      loadData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        await api.deleteEvent(id);
        loadData();
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      try {
        await api.deleteBook(id);
        loadData();
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Panneau d'administration</h1>
          <p className="text-emerald-100 mt-2">Gérer les événements et la bibliothèque</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'events'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Événements
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'books'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Bibliothèque
          </button>
        </div>

        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des événements</h2>
              <button
                onClick={() => {
                  setEditingEvent({});
                  setShowEventForm(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nouvel événement
              </button>
            </div>

            {showEventForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">
                  {editingEvent?.id ? 'Modifier' : 'Ajouter'} un événement
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Titre"
                    value={editingEvent?.title || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="date"
                    value={editingEvent?.event_date || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, event_date: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="time"
                    value={editingEvent?.event_time || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, event_time: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Lieu"
                    value={editingEvent?.location || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <select
                    value={editingEvent?.category || 'général'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="général">Général</option>
                    <option value="ziarra">Ziarra</option>
                    <option value="récital">Récital</option>
                    <option value="conférence">Conférence</option>
                    <option value="service">Service</option>
                    <option value="prière">Prière</option>
                  </select>
                  <input
                    type="text"
                    placeholder="URL de l'image (optionnel)"
                    value={editingEvent?.image_url || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, image_url: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <textarea
                    placeholder="Description"
                    value={editingEvent?.description || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    className="px-4 py-2 border rounded-lg md:col-span-2"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveEvent}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setEditingEvent(null);
                      setShowEventForm(false);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Annuler
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4">{event.title}</td>
                      <td className="px-6 py-4">{event.event_date}</td>
                      <td className="px-6 py-4">{event.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingEvent(event);
                              setShowEventForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'books' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestion de la bibliothèque</h2>
              <button
                onClick={() => {
                  setEditingBook({});
                  setShowBookForm(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nouveau livre
              </button>
            </div>

            {showBookForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">
                  {editingBook?.id ? 'Modifier' : 'Ajouter'} un livre
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Titre"
                    value={editingBook?.title || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Auteur"
                    value={editingBook?.author || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  <select
                    value={editingBook?.category || 'général'}
                    onChange={(e) => setEditingBook({ ...editingBook, category: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="général">Général</option>
                    <option value="Khassaïdes">Khassaïdes</option>
                    <option value="Histoire">Histoire</option>
                    <option value="Enseignements">Enseignements</option>
                  </select>
                  <input
                    type="text"
                    placeholder="URL de la couverture (optionnel)"
                    value={editingBook?.cover_image_url || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, cover_image_url: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  />
                  {!editingBook?.id && (
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setBookFile(e.target.files?.[0] || null)}
                      className="px-4 py-2 border rounded-lg md:col-span-2"
                    />
                  )}
                  <textarea
                    placeholder="Description"
                    value={editingBook?.description || ''}
                    onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                    className="px-4 py-2 border rounded-lg md:col-span-2"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveBook}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setEditingBook(null);
                      setShowBookForm(false);
                      setBookFile(null);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Annuler
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td className="px-6 py-4">{book.title}</td>
                      <td className="px-6 py-4">{book.author}</td>
                      <td className="px-6 py-4">{book.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingBook(book);
                              setShowBookForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
