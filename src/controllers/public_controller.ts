import { NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from "fs";


class PublicController {

    static getBaseUrl(req: Request): string {
        const hostname = req.hostname;
        const isServer = !(hostname === 'localhost' || hostname === '127.0.0.1');
        return `${isServer ? 'https' : 'http'}://${req.get('host')}`;
    }

    static fontPath = () => path.join(__dirname, '../..', 'fonts');

    static async getFonts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const files = await fs.promises.readdir(PublicController.fontPath());
            const baseUrl = PublicController.getBaseUrl(req);
            const fontList = files.map(file => ({
                name: file,
                url: `${baseUrl}/fonts/${encodeURIComponent(file)}`
            }));
            res.json(fontList);
        } catch (err) {
            console.error('Error reading fonts directory:', err);
            res.status(500).json({ error: 'Failed to list fonts' });
        }
    }


    static async addFont(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).json({ error: 'No font file uploaded' });
                return;
            }
            const fileName = req.file.filename;

            const fontsDir = path.join(__dirname, '../..', 'fonts');
            const files = await fs.promises.readdir(fontsDir);
            const tempPath = req.file!.path;
            if (files.includes(fileName)) {
                res.status(409).json({ error: `Font '${fileName}' already exists` });
                await fs.promises.unlink(tempPath);
                return;
            }
            const originalName = req.file!.originalname;
            const targetPath = path.join(PublicController.fontPath(), originalName);

            await fs.promises.copyFile(tempPath, targetPath);
            await fs.promises.unlink(tempPath);
            const baseUrl = PublicController.getBaseUrl(req);
            res.status(201).json({
                name: fileName,
                url: `${baseUrl}/fonts/${fileName}`,
            });
        } catch (e) {
            res.status(500).json({ error: 'Failed to add font' });
        }
    }
}


export default PublicController;
