import express from 'express';
import BloodRequestController from '../controllers/blood_request_controller';

const router = express.Router();


router.post('/createBloodRequest', BloodRequestController.addABloodRequest);
router.post('/getBloodRequests', BloodRequestController.getBloodRequests);

export default router;
