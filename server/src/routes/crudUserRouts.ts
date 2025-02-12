// src/routes/userRoutes.ts
import express from 'express';
import  UserController  from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;