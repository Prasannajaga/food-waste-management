import express from 'express';
import {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment,
} from '../controllers/commentController';

const router = express.Router();

// CRUD routes for Comments
router.post('/comments', createComment);
router.get('/comments', getAllComments);
router.get('/comments/:id', getCommentById);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);

export default router;