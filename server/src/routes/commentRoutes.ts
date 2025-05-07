// src/routes/commentRoutes.ts
import { Router } from 'express';
import  Comment  from '../models/comment';
import { createNotification } from '../service/notificationService';
import { User } from '../models';

const router = Router();
 
router.post('/', async (req, res) => {
  try { 
    const data = req.body;
    data.created_at = new Date();

    const comment = await Comment.create(data);
    createNotification({
        recipient_id: data.recipient_id,
        sender_id: data.user_id,
        type: 'COMMENTS',
        reference_id: data.post_id,
        message: data.comment
      }); 
    res.json(comment);
  } catch (error) { 
    res.status(500).json({ message: 'Error creating comment' , error : error});
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' , error : error });
  }
});
 
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comment' , error : error});
  }
});

router.get('/byPost/:id', async (req, res) => {
  try { 
    const id = req.params.id; 
    const comment = await Comment.findAll({
      where : {post_id : id},
      include : {
        model : User,
        attributes : ["name"]
      }
    });
    
     if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
       res.json(comment);
    }
  } catch (error) {
     res.status(500).json({ message: 'Error fetching comment' , error : error });
  }
});
 
router.put('/:id', async (req, res) => {
  try { 
    const id = req.params.id;
    const comment = await Comment.findByPk(id);

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      await comment.update(req.body);      // Return the updated comment
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' , error : error});
  }
});
 
router.delete('/:id', async (req, res) => {
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
    res.status(500).json({ message: 'Error deleting comment' , error : error });
  }
});

export default router;

