// src/controllers/userController.ts
import { Request, Response } from 'express';
import  User  from '../models/Users';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error getting all users' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting user by id' });
    }
  }

  async updateUser(req: Request, res: Response) {
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
  }

  async deleteUser(req: Request, res: Response) {
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
  }
}

export default UserController;