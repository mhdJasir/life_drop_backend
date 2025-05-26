import express from 'express';
import { Request, } from 'express';
import multer from "multer";
import path from "path";
import PublicController from '../controllers/public_controller';

const router = express.Router();

const storageEngine = multer.diskStorage({
    destination: "./fonts",
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const extension = path.extname(file.originalname);
        console.log(extension);
        
        if (!['.ttf', '.woff', '.woff2','.otf'].includes(extension)) {
            cb(Error('Invalid file type. Only .ttf, .woff, .woff2, .otf are allowed'), '');
            return;
        }
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storageEngine,
});

router.get('/fonts', PublicController.getFonts);
router.post('/addFont', upload.single("file"), PublicController.addFont);

export default router;
