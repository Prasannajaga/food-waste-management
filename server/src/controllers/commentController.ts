import { Request, Response } from 'express';
import  Comment  from '../models/comment';

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
};

// Get all comments
export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

// Get a comment by ID
export const getCommentById = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment', error });
    }
};

// Update a comment by ID
export const updateComment = async (req: Request, res: Response) => {
    try {
        const [updated] = await Comment.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedComment = await Comment.findByPk(req.params.id);
            res.status(200).json(updatedComment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
};

// Delete a comment by ID
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const deleted = await Comment.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Comment deleted' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};