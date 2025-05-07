import { Router } from 'express';
import  Claim  from '../models/claim';
import { User } from '../models';
import { createNotification } from '../service/notificationService';

const router = Router();
 
router.post('/', async (req, res) => {
  try { 
    const data = req.body;
    data.claimed_at = new Date();
    
    const claim = await Claim.create(data);
    createNotification({
      recipient_id: data.recipient_id,
      sender_id : data.claimer_id,
      type: 'CLAIMS',
      reference_id: data.post_id,
      message: "Claimed your food"
    });
    res.json(claim);
  } catch (error) {
     res.status(500).json({ message: 'Error creating claim' , error : error});
  }
}); 

router.get('/', async (req, res) => {
  try {
    const claims = await Claim.findAll();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claims' });
  }
});

router.get('/post/:postId', async (req, res) => {
  try {
    const post_id = req.params.postId;

    const claims = await Claim.findAll({
      where: {
        post_id: post_id,
      },
      include: [
        {
          model: User,
          as: 'claimer',
          attributes: ['name' , "user_id"],
        },
      ],
    attributes: ['claimed_at' , 'status' , "claim_id"],
    });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claims' , error : error});
  }
});


router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const claim = await Claim.findByPk(id);
    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
    } else {
      res.json(claim);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claim' });
  }
});
 

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const claim = await Claim.findByPk(id);
    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
    } else {
      const data = req.body;
      await claim.update(data);
      createNotification({
        recipient_id: data.recipient_id,
        sender_id: data.sender_id,
        type: 'CLAIMS',
        reference_id: data.post_id,
        message: "accepted your Claim." 
      }); 
      res.json(claim);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating claim' });
  }
});
 

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const claim = await Claim.findByPk(id);
    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
    } else {
      await claim.destroy();
      res.json({ message: 'Claim deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting claim' });
  }
});

export default router;
