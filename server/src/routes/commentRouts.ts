// src/routes/commentRoutes.ts
import express from 'express';
import  CommentController  from '../controllers/commentController';

const router = express.Router();
const commentController = new CommentController();

router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;