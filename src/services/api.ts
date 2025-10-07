const API_URL = 'http://localhost:5000/api';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  category: string;
  image_url?: string;
  created_at: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  cover_image_url?: string;
  file_path: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class ApiService {

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la requête');
    }

    return response.json();
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    return data;
  }

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    return data;
  }

  async getEvents(): Promise<Event[]> {
    return this.request('/events');
  }

  async getEvent(id: number): Promise<Event> {
    return this.request(`/events/${id}`);
  }

  async createEvent(event: Partial<Event>): Promise<Event> {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async updateEvent(id: number, event: Partial<Event>): Promise<Event> {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
    });
  }

  async deleteEvent(id: number): Promise<void> {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  async getBooks(): Promise<Book[]> {
    return this.request('/books');
  }

  async getBook(id: number): Promise<Book> {
    return this.request(`/books/${id}`);
  }

  async createBook(formData: FormData): Promise<Book> {
    const response = await fetch(`${API_URL}/books`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création du livre');
    }

    return response.json();
  }

  async updateBook(id: number, book: Partial<Book>): Promise<Book> {
    return this.request(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(book),
    });
  }

  async deleteBook(id: number): Promise<void> {
    return this.request(`/books/${id}`, {
      method: 'DELETE',
    });
  }

  async getFavorites(): Promise<Event[]> {
    return this.request('/favorites', {
      method: 'GET',
    });
  }

  async addFavorite(eventId: number): Promise<{ message: string }> {
    return this.request('/favorites', {
      method: 'POST',
      body: JSON.stringify({ event_id: eventId }),
    });
  }

  async removeFavorite(eventId: number): Promise<{ message: string }> {
    return this.request(`/favorites/${eventId}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
