// src/routes/commentRoutes.ts
import { Router } from 'express'; 
import Likes from '../models/Like'; 
import { createNotification } from '../service/notificationService';

const router = Router();
 
 router.post('/', async (req, res) => {
  try {
    const data = req.body;
    data.created_at = new Date();

    const isLiked = await Likes.findOne({
      where : {
        user_id : data.user_id,
        post_id : data.post_id,
      }
    });

    if(isLiked){
      const response = await isLiked.destroy();
      res.json(response);
    }
    else{
      const Like = await Likes.create(data); 
      createNotification({
        recipient_id: data.recipient_id,
        sender_id: data.user_id,
        type: 'LIKES',
        reference_id: data.post_id,
        message: 'liked your post.'
      });
      res.json(Like);
    }


   
    
  } catch (error) {
     res.status(500).json({ message: 'Error creating likes'  , err : error});
  }
});




export default router;