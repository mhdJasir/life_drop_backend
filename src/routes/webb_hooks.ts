import express from 'express';
import MetaWebHookController from '../controllers/metawebhook_controller';

const router = express.Router();

router.get('/webhook', MetaWebHookController.webhook);
router.post('/webhook', MetaWebHookController.messageUpdates);

export default router;
