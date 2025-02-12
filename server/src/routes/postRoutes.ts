// src/routes/postRoutes.ts
import express from 'express';
import  PostController  from '../controllers/postController';

const router = express.Router();
const postController = new PostController();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;