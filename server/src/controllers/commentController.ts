// src/controllers/commentController.ts
import  Comment  from '../models/comment';
import { Request, Response } from 'express';

class CommentController {
  async createComment(req: Request, res: Response) {
    try {
      const comment = await Comment.create(req.body);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment' });
    }
  }

  async getAllComments(req: Request, res: Response) {
    try {
      const comments = await Comment.findAll();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error getting all comments' });
    }
  }

  async getCommentById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        res.json(comment);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting comment by id' });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        await comment.update(req.body);
        res.json(comment);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating comment' });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        await comment.destroy();
        res.json({ message: 'Comment deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting comment' });
    }
  }
}

export default CommentController;