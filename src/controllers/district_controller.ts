import { NextFunction, Request, Response } from 'express';
import district  from '../models/district';

class DistrctController {

    static async getDistricts(_: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const donors = await district.findAll();
            res.status(200).send({
                message: "Donors listed successfully",
                data: donors
            });
            return;
        } catch (error) {
            next(error);
        }
    }
}


export default DistrctController;
