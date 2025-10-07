import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './config/database.js';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import booksRoutes from './routes/books.js';
import favoritesRoutes from './routes/favorites.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/favorites', favoritesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API E-Magal Gi en cours d\'exécution' });
});

async function startServer() {
  const dbConnected = await testConnection();

  if (!dbConnected) {
    console.error('Impossible de démarrer le serveur sans connexion à la base de données');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📡 API disponible sur http://localhost:${PORT}/api`);
    console.log(`💚 Base de données: ${process.env.DB_NAME}\n`);
  });
}

startServer();
