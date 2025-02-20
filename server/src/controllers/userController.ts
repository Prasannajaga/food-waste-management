import { Request, Response } from 'express';
import  Users  from '../models/Users';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await Users.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const [updated] = await Users.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedUser = await Users.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deleted = await Users.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};