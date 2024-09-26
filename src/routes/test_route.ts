import express from 'express';
import TestController from '../controllers/test_controller';

const router = express.Router();


router.post('/saveData', TestController.saveData);
router.post('/getData', TestController.getData);
router.post('/clearData', TestController.clearData);

export default router;
