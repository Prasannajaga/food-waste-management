// src/routes/postRoutes.ts
import { Router } from 'express';
import  Post  from '../models/Post';

const router = Router();

// Create
router.post('/posts', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Read
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Read by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Update
router.put('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      await post.update(req.body);
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete
router.delete('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      await post.destroy();
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

export default router;