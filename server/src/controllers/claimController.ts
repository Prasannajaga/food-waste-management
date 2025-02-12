// src/controllers/claimController.ts
import  Claim  from '../models/claim';
import { Request, Response } from 'express';

class ClaimController {
  async createClaim(req: Request, res: Response) {
    try {
      const claim = await Claim.create(req.body);
      res.status(201).json(claim);
    } catch (error) {
      res.status(500).json({ message: 'Error creating claim' });
    }
  }

  async getAllClaims(req: Request, res: Response) {
    try {
      const claims = await Claim.findAll();
      res.json(claims);
    } catch (error) {
      res.status(500).json({ message: 'Error getting all claims' });
    }
  }

  async getClaimById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const claim = await Claim.findByPk(id);
      if (!claim) {
        res.status(404).json({ message: 'Claim not found' });
      } else {
        res.json(claim);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting claim by id' });
    }
  }

  async updateClaim(req: Request, res: Response) {
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
  }

  async deleteClaim(req: Request, res: Response) {
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
  }
}

export default ClaimController;