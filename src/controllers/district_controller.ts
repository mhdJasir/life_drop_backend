import { NextFunction, Request, Response } from 'express';
import district from '../models/district';
import District from '../models/district';
import { Donor } from '../models/donor';
import Associations from '../config/associations';
import sequelize from 'sequelize';
import { User } from '../models/user';

class DistrctController {

    static async getDistricts(_: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const districtsWithDonorCount = await District.findAll({
                attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.col('donor.id')), 'donorCount']], // Changed Donor.id to donor.id
                include: [{
                    as: Associations.donor,
                    model: Donor,
                    attributes: []
                }],
                group: ['District.id'],
                order: [[sequelize.literal('donorCount'), 'DESC']],
            });
    
            res.status(200).send({
                status: 200,
                message: "Donors listed successfully",
                data: districtsWithDonorCount
            });
            return;
        } catch (error) {
            next(error);
        }
    }
    
    static async getADistrict(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { districtId } = req.body;
            const districtWithDonors = await District.findOne({
                where: {
                    id: districtId
                },
                include: [{
                    model: Donor,
                    as: Associations.donor,
                    include: [
                        {
                            model: User,
                            as: Associations.user,
                            attributes: ["id","name","gender","phonenumber","alt_phonenumber"],
                        },
                    ],
                }]
            });
            res.status(200).send({
                message: "District detail fetched successfully",
                data: districtWithDonors
            });
            return;
        } catch (error) {
            next(error);
        }
    }
}


export default DistrctController;
