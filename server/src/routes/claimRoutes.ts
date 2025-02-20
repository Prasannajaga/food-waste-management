import express from 'express';
import {
    createClaim,
    getAllClaims,
    getClaimById,
    updateClaim,
    deleteClaim,
} from '../controllers/claimController';

const router = express.Router();

// CRUD routes for Claims
router.post('/claims', createClaim);
router.get('/claims', getAllClaims);
router.get('/claims/:id', getClaimById);
router.put('/claims/:id', updateClaim);
router.delete('/claims/:id', deleteClaim);

export default router;