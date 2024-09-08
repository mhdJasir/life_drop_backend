import express from 'express';
import DistrctController from '../controllers/district_controller';

const router = express.Router();


router.post('/getDistricts', DistrctController.getDistricts);

export default router;
