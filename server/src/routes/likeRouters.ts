// src/routes/commentRoutes.ts
import { Router } from 'express'; 
import Likes from '../models/Like';

const router = Router();
 
 router.post('/', async (req, res) => {
  try {
    const Like = await Likes.create(req.body); 
    res.json(Like);
  } catch (error) {
     res.status(500).json({ message: 'Error creating likes'  , err : error});
  }
});

export default router;