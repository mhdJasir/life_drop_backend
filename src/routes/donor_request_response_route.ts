import express from 'express';
import DonorRequestResponseController from '../controllers/donor_request_controller';
import logRequest from '../middlewares/request_log';

const router = express.Router();


router.post('/addRequestResponse', logRequest,DonorRequestResponseController.addRequestResponse);
router.get('/getUserRequestResponses',logRequest, DonorRequestResponseController.getUserRequestResponses);
router.get('/myResponses', logRequest,DonorRequestResponseController.myResponses);

export default router;
