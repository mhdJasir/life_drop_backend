import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Donor, DonorCreationAttributes } from '../models/donor';
import sequelize from 'sequelize';
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
        const { blood_group, place, address, latitude, district_id, longitude, dob } = req.body;
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
                districtId: district_id,
                dob: dob,
                place: place,
                latitude: latitude,
                longitude: longitude,
                userId: (user as any).id,
            };
            const donor = await Donor.create(donorData);
            await User.update(
                { donor_id: donor.id },
                { where: { id: donor.userId } }
            );
            res.status(200).send(
                {
                    status: 200,
                    messsage: "Congrats!. You're registered as a donor",
                    data: donor
                }
            );
            return;
        } catch (error) {
            next(error);
        }
    }


    static async getDonors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { districtId, bloodType } = req.body;
            const whereCondition: { [key: string]: any } = {};

            if (districtId) {
                whereCondition.districtId = districtId;
            }

            if (bloodType) {
                whereCondition.bloodType = bloodType;
            }
            const donors = await Donor.findAll({
                where: whereCondition,
                include: [
                    {
                        model: User,
                        as: Associations.user,
                        attributes: ["id", "name", "gender", "phonenumber", "alt_phonenumber"],
                    },
                ],
            });
            res.status(200).send({
                message: "Donors listed successfully",
                status: 200,
                data: donors
            });
            return;
        } catch (error) {
            next(error);
            return;
        }
    }


    static async getBloodTypeAvailability(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const bloodGroups = await Donor.findAll({
                attributes: ["bloodType", [sequelize.fn('COUNT', sequelize.col('bloodType')), 'count']],
                group: ['bloodType'],
            });
            const bloodGroupsMap: { [key: string]: number } = {};
            bloodGroups.forEach((donor: any) => {
                bloodGroupsMap[donor.bloodType] = donor.getDataValue('count');
            });
            const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

            groups.forEach((group) => {
                if (!bloodGroupsMap[group]) {
                    bloodGroupsMap[group] = 0;
                }
            });

            const finalBloodGroups = Object.keys(bloodGroupsMap).map((key) => ({
                bloodType: key,
                count: bloodGroupsMap[key],
            }));

            res.status(200).send({
                message: "Blood types fetched successfully",
                status: 200,
                data: finalBloodGroups
            });
            return;
        } catch (error) {
            next(error);
        }
    }
}


export default DonorController;
