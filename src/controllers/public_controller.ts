import { NextFunction, Request, Response } from 'express';
const fs = require('fs').promises;
import path from 'path';


class PublicController {

    static getBaseUrl(req: Request): String {
        let isServer;
        const hostname = req.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            isServer = false;
        } else {
            isServer = true;
        }
        return `${isServer ? "https" : "http"}://${req.get('host')}`;
    }

    static async getFonts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const fontsDir = path.join(__dirname, '../..', 'fonts');
            const files = await fs.readdir(fontsDir);
            const baseUrl = PublicController.getBaseUrl(req);
            const fontList = files.map((file: any) => ({
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
            const files = await fs.readdir(fontsDir);
            if (files.includes(fileName)) {
                res.status(409).json({ error: `Font '${fileName}' already exists` });
                return;
            }
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
