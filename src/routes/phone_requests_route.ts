import express from 'express';
import PhoneRquestsController from '../controllers/phone_requests';

const router = express.Router();


router.post('/userRequests', PhoneRquestsController.userRequests);
router.post('/addAPhoneRequest', PhoneRquestsController.addAPhoneRequest);
router.post('/acceptOrDeleteRequest', PhoneRquestsController.acceptOrDeleteRequest);

export default router;
