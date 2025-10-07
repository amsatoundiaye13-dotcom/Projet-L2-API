import React, { useState } from 'react';
import { Event } from '../services/api';

interface EventFormProps {
  event?: Event;
  onSave: (event: Omit<Event, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

const categories = [
  'ziarra',
  'récital',
  'conférence',
  'service',
  'prière',
];

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [event_date, setEventDate] = useState(event ? event.event_date.slice(0, 10) : '');
  const [event_time, setEventTime] = useState(event?.event_time || '');
  const [location, setLocation] = useState(event?.location || '');
  const [category, setCategory] = useState(event?.category || categories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, event_date, event_time, location, category });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-4">
      <div>
        <label className="block font-semibold mb-1">Titre</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Date</label>
        <input
          type="date"
          value={event_date}
          onChange={e => setEventDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Heure</label>
        <input
          type="time"
          value={event_time}
          onChange={e => setEventTime(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Lieu</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Catégorie</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Annuler</button>
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700">Enregistrer</button>
      </div>
    </form>
  );
};

export default EventForm;
