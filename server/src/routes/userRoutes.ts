// src/routes/userRoutes.ts
import { Router } from 'express';
import  User  from '../models/Users';

const router = Router();

// Create
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Read
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Update
router.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      await user.update(req.body);
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete
router.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router;