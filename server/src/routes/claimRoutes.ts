// src/routes/claimRoutes.ts
import { Router } from 'express';
import  Claim  from '../models/claim';

const router = Router();

// Create
router.post('/claims', async (req, res) => {
  try {
    const claim = await Claim.create(req.body);
    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: 'Error creating claim' });
  }
});

// Read
router.get('/claims', async (req, res) => {
  try {
    const claims = await Claim.findAll();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claims' });
  }
});

// Read by ID
router.get('/claims/:id', async (req, res) => {
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

// Update
router.put('/claims/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const claim = await Claim.findByPk(id);
    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
    } else {
      await claim.update(req.body);
      res.json(claim);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating claim' });
  }
});

// Delete
router.delete('/claims/:id', async (req, res) => {
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