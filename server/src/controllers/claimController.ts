import { Request, Response } from 'express';
import  Claim  from '../models/claim';

// Create a new claim
export const createClaim = async (req: Request, res: Response) => {
    try {
        const claim = await Claim.create(req.body);
        res.status(201).json(claim);
    } catch (error) {
        res.status(500).json({ message: 'Error creating claim', error });
    }
};

// Get all claims
export const getAllClaims = async (req: Request, res: Response) => {
    try {
        const claims = await Claim.findAll();
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching claims', error });
    }
};

// Get a claim by ID
export const getClaimById = async (req: Request, res: Response) => {
    try {
        const claim = await Claim.findByPk(req.params.id);
        if (claim) {
            res.status(200).json(claim);
        } else {
            res.status(404).json({ message: 'Claim not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching claim', error });
    }
};

// Update a claim by ID
export const updateClaim = async (req: Request, res: Response) => {
    try {
        const [updated] = await Claim.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedClaim = await Claim.findByPk(req.params.id);
            res.status(200).json(updatedClaim);
        } else {
            res.status(404).json({ message: 'Claim not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating claim', error });
    }
};

// Delete a claim by ID
export const deleteClaim = async (req: Request, res: Response) => {
    try {
        const deleted = await Claim.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Claim deleted' });
        } else {
            res.status(404).json({ message: 'Claim not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting claim', error });
    }
};