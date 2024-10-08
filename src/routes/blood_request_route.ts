import express from 'express';
import BloodRequestController from '../controllers/blood_request_controller';
import logRequest from '../middlewares/request_log';

const router = express.Router();


router.post('/createBloodRequest',logRequest, BloodRequestController.addABloodRequest);
router.post('/getBloodRequests',logRequest, BloodRequestController.getBloodRequests);

export default router;
