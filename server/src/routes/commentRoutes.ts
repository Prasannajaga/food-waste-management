// src/routes/commentRoutes.ts
import { Router } from 'express';
import  Comment  from '../models/comment';

const router = Router();

// Create
router.post('/comments', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' });
  }
});

// Read
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// Read by ID
router.get('/comments/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comment' });
  }
});

// Update
router.put('/comments/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      await comment.update(req.body);
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
});

// Delete
router.delete('/comments/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      await comment.destroy();
      res.json({ message: 'Comment deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

export default router;