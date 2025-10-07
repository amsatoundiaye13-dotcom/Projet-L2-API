import express from 'express';
import { pool } from '../config/database.js';
import { authenticateUser, requireAdmin, AuthRequest } from '../middleware/auth.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [events] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM events ORDER BY event_date ASC, event_time ASC'
    );
    res.json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [events] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM events WHERE id = ?',
      [req.params.id]
    );

    if (events.length === 0) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    res.json(events[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/', authenticateUser, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { title, description, event_date, event_time, location, category, image_url } = req.body;

    if (!title || !description || !event_date || !event_time || !location) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO events (title, description, event_date, event_time, location, category, image_url, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, event_date, event_time, location, category || 'général', image_url, req.user?.id]
    );

    res.status(201).json({ id: result.insertId, message: 'Événement créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.put('/:id', authenticateUser, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { title, description, event_date, event_time, location, category, image_url } = req.body;
    const { id } = req.params;

    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE events SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?, category = ?, image_url = ? WHERE id = ?',
      [title, description, event_date, event_time, location, category, image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    res.json({ message: 'Événement mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.delete('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM events WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    res.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
