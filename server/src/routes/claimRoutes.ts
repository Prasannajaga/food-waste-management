// src/routes/claimRoutes.ts
import { Router } from 'express';
import  Claim  from '../models/claim';

const router = Router();

// Create
// This route creates a new claim and returns the newly created claim
router.post('/claims', async (req, res) => {
  try {
    // Create a new claim with the data sent in the request body
    const claim = await Claim.create(req.body);
    // Return the newly created claim
    res.json(claim);
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error creating claim' });
  }
});

// Read
// This route fetches all claims from the database and returns them
router.get('/claims', async (req, res) => {
  try {
    // Fetch all claims from the database
    const claims = await Claim.findAll();
    // Return all claims
    res.json(claims);
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error fetching claims' });
  }
});

// Read by ID
// This route fetches a claim by its id and returns it
router.get('/claims/:id', async (req, res) => {
  try {
    // Get the id of the claim from the request params
    const id = req.params.id;
    // Fetch the claim with the given id
    const claim = await Claim.findByPk(id);
    // If the claim is not found, return a 404 status code and a JSON object with an error message
    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
    } else {
      // If the claim is found, return it
      res.json(claim);
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error fetching claim' });
  }
});

// Update
// This route updates a claim and returns the updated claim
router.put('/claims/:id', async (req, res) => {
  try {
    // Get the id of the claim from the request params
    const id = req.params.id;
    // Fetch the claim with the given id
    const claim = await Claim.findByPk(id);
    // If the claim is not found, return a 404 status code and a JSON object with an error message
    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
    } else {
      // If the claim is found, update it with the data sent in the request body
      await claim.update(req.body);
      // Return the updated claim
      res.json(claim);
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error updating claim' });
  }
});

// Delete
// This route deletes a claim and returns a success message
router.delete('/claims/:id', async (req, res) => {
  try {
    // Get the id of the claim from the request params
    const id = req.params.id;
    // Fetch the claim with the given id
    const claim = await Claim.findByPk(id);
    // If the claim is not found, return a 404 status code and a JSON object with an error message
    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
    } else {
      // If the claim is found, delete it
      await claim.destroy();
      // Return a success message
      res.json({ message: 'Claim deleted successfully' });
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error deleting claim' });
  }
});

export default router;
