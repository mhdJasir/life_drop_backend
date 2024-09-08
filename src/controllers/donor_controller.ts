import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Donor, DonorCreationAttributes } from '../models/donor';
import { User } from '../models/user';
import Associations from '../config/associations';

interface AuthenticatedRequest extends Request {
    user?: JwtPayload | string;
}

const getProtectedData = (req: AuthenticatedRequest, res: Response): {} => {
    const user = req.user as JwtPayload;
    return user;
};


class DonorController {
    static async donorRegistration(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = getProtectedData(req, res);
        const { blood_group, address, latitude, longitude, dob } = req.body;
        try {
            const data = await Donor.findOne({ where: { userId: (user as any).id } });
            if (data) {
                res.status(400).send(
                    {
                        messsage: "You're already registered as a donor",
                    }
                );
                return;
            }
            const donorData: DonorCreationAttributes = {
                address: address,
                bloodType: blood_group,
                dob: dob,
                latitude: latitude,
                longitude: longitude,
                userId: (user as any).id,
            };
            const donor = await Donor.create(donorData);

            res.status(200).send(
                {
                    messsage: "Congrats!. You're registered as a donor",
                    data: donor
                }
            );
            return;
        } catch (error) {
            next(error);
        }
    }


    static async getDonors(_: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const donors = await Donor.findAll({
                include: [{ model: User, as: 'user' , attributes: { exclude: ['password', 'email']}}],
              });
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


export default DonorController;
