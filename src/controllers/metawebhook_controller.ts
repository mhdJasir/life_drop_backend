import { Request, Response, NextFunction } from 'express';

const VERIFY_TOKEN = 'jasir_super_token_123'; 

class MetaWebHookController {
  async webhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('✅ Webhook verified');
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(400);
    }
  }

  async messageUpdates(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
      const entries = body.entry || [];
      entries.forEach((entry: any) => {
        const changes = entry.changes || [];
        changes.forEach((change: any) => {
          const statuses = change.value?.statuses;
          if (statuses) {
            statuses.forEach((status: any) => {
              console.log('📬 Status update received:');
              console.log(`• Recipient: ${status.recipient_id}`);
              console.log(`• Status: ${status.status}`);
              console.log(`• Message ID: ${status.id}`);
              console.log(`• Timestamp: ${status.timestamp}`);
            });
          }
        });
      });
    }

    res.sendStatus(200);
  }
}

export default new MetaWebHookController();
