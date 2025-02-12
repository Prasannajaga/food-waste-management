// src/routes/claimRoutes.ts
import express from 'express';
import  ClaimController  from '../controllers/claimController';

const router = express.Router();
const claimController = new ClaimController();

router.post('/', claimController.createClaim);
router.get('/', claimController.getAllClaims);
router.get('/:id', claimController.getClaimById);
router.put('/:id', claimController.updateClaim);
router.delete('/:id', claimController.deleteClaim);

export default router;