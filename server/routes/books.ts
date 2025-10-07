import express from 'express';
import { pool } from '../config/database.js';
import { authenticateUser, requireAdmin, AuthRequest } from '../middleware/auth.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads/books';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers PDF sont autorisés'));
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 }
});

router.get('/', async (req, res) => {
  try {
    const [books] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM books ORDER BY title ASC'
    );
    res.json(books);
  } catch (error) {
    console.error('Erreur lors de la récupération des livres:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [books] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM books WHERE id = ?',
      [req.params.id]
    );

    if (books.length === 0) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    res.json(books[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du livre:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/', authenticateUser, requireAdmin, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    const { title, author, description, category, cover_image_url } = req.body;

    if (!title || !author || !description || !req.file) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    const file_path = `/uploads/books/${req.file.filename}`;

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO books (title, author, description, category, cover_image_url, file_path, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, author, description, category || 'général', cover_image_url, file_path, req.user?.id]
    );

    res.status(201).json({ id: result.insertId, message: 'Livre créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création du livre:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.put('/:id', authenticateUser, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { title, author, description, category, cover_image_url } = req.body;
    const { id } = req.params;

    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE books SET title = ?, author = ?, description = ?, category = ?, cover_image_url = ? WHERE id = ?',
      [title, author, description, category, cover_image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    res.json({ message: 'Livre mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du livre:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.delete('/:id', authenticateUser, requireAdmin, async (req, res) => {
  try {
    const [books] = await pool.query<RowDataPacket[]>(
      'SELECT file_path FROM books WHERE id = ?',
      [req.params.id]
    );

    if (books.length === 0) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    const filePath = `.${books[0].file_path}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await pool.query<ResultSetHeader>(
      'DELETE FROM books WHERE id = ?',
      [req.params.id]
    );

    res.json({ message: 'Livre supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du livre:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
