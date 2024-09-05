import express from 'express';
import AuthController from '../controllers/auth_controller';

const router = express.Router();

router.post('/register', AuthController.register);

export default router;
