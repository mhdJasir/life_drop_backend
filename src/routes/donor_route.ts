import express from 'express';
import {Request,} from 'express';
import DonorController from '../controllers/donor_controller';
import multer from "multer";
import path from "path";

const router = express.Router();

const storageEngine = multer.diskStorage({
    destination: "./images/users",
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      const name = file.fieldname + '-' + uniqueSuffix + extension; 
      cb(null, name); 
    }
  });

const upload = multer({
    storage: storageEngine,
});

router.post('/donorRegistration', DonorController.donorRegistration);
router.post('/getDonors', DonorController.getDonors);
router.post('/getBloodTypeAvailability', DonorController.getBloodTypeAvailability);

export default router;
