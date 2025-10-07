import express from 'express';
import { pool } from '../config/database.js';
import { authenticateUser, AuthRequest } from '../middleware/auth.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = express.Router();

router.get('/', authenticateUser, async (req: AuthRequest, res) => {
  try {
    const [favorites] = await pool.query<RowDataPacket[]>(
      `SELECT f.*, e.title, e.description, e.event_date, e.event_time, e.location, e.category, e.image_url
       FROM favorites f
       JOIN events e ON f.event_id = e.id
       WHERE f.user_id = ?
       ORDER BY e.event_date ASC`,
      [req.user?.id]
    );
    res.json(favorites);
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/', authenticateUser, async (req: AuthRequest, res) => {
  try {
    const { event_id } = req.body;

    if (!event_id) {
      return res.status(400).json({ message: 'ID de l\'événement requis' });
    }

    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM favorites WHERE user_id = ? AND event_id = ?',
      [req.user?.id, event_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Événement déjà dans les favoris' });
    }

    await pool.query<ResultSetHeader>(
      'INSERT INTO favorites (user_id, event_id) VALUES (?, ?)',
      [req.user?.id, event_id]
    );

    res.status(201).json({ message: 'Ajouté aux favoris avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.delete('/:eventId', authenticateUser, async (req: AuthRequest, res) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM favorites WHERE user_id = ? AND event_id = ?',
      [req.user?.id, req.params.eventId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Favori non trouvé' });
    }

    res.json({ message: 'Retiré des favoris avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du favori:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
