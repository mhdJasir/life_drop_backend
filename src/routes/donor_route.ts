import express from 'express';
import DonorController from '../controllers/donor_controller';

const router = express.Router();

router.post('/donorRegistration', DonorController.donorRegistration);
router.post('/getDonors', DonorController.getDonors);
router.post('/getBloodTypeAvailability', DonorController.getBloodTypeAvailability);

export default router;
