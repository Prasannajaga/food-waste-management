import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController';
import { BaseController } from '../config/baseController';
import User from '../models/Users';

const router = express.Router();
const baseController = new BaseController();

// CRUD routes for Users
router.post('/user', createUser);
router.get('/user', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Additional routes using BaseController
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await baseController.get(User, userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

router.get('/findAll', async (req, res) => {
    try {
        const users = await baseController.getAll(User);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

export default router;
