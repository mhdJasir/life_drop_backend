import { Request, Response, NextFunction } from "express";
import { BloodRequest, BloodRequestAttributes } from "../models/blood_requests";
import { JwtPayload } from "jsonwebtoken";
import { Donor } from "../models/donor";
import sequelize, { Op } from "sequelize";
import calculatePriority from "../methods/priority_finder";


interface AuthenticatedRequest extends Request {
    user?: JwtPayload | string;
}

const getProtectedData = (req: AuthenticatedRequest, res: Response): {} => {
    const user = req.user as JwtPayload;
    return user;
};

class BloodRequestController {


    static async addABloodRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const user = getProtectedData(req, res);
            const {
                patient_name, age, gender, bystander_name, phone, blood_group,
                date_of_requirement, time_of_requirement, units, place, address,
                alt_phone,latitude,longitude
            } = req.body;

            const existingRequest = await BloodRequest.findOne({
                where: {
                  user_id: (user as any).id,
                  patient_name: patient_name,
                  date_of_requirement: date_of_requirement,
                },
              });
            
              if (existingRequest) {
                res.status(400).send(
                    {
                     status: 400,
                     message: "This request is clreated already",
                    }
                );
                return;
              }

            const request: BloodRequestAttributes = {
                user_id: (user as any).id,
                patient_name: patient_name,
                age: age,
                gender: gender,
                latitude: latitude,
                longitude:longitude,
                alt_phone:alt_phone,
                bystander_name: bystander_name,
                phone: phone,
                blood_group: blood_group,
                date_of_requirement: date_of_requirement,
                time_of_requirement: time_of_requirement,
                units: units,
                place: place,
                address: address,
            };
            const savedData = await BloodRequest.create(request);
            res.status(200).send(
                {
                    status: 200,
                    message: "Blood request added successfully",
                    data: savedData
                }
            )
            return;
        } catch (error) {
            next(error);
        }
    }


    static async getBloodRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { districtId, bloodType, priority, page, limit } = req.body;
            const whereCondition: { [key: string]: any } = {};

            if (districtId) {
                whereCondition.districtId = districtId;
            }

            if (bloodType) {
                whereCondition.bloodType = bloodType;
            }
            if (priority) {
                whereCondition.priority = priority;
            }
            const count= limit || 20;
            const pageNumber=  page || 1;
            const offset = (pageNumber - 1) * count;
            const bloodRequests = await BloodRequest.findAll(
                {
                    where: whereCondition,
                    limit: count,
                    offset: offset,
                    order: [['date_of_requirement', 'ASC']],
                }
            );

            const bloodGroups = bloodRequests.map(request => request.blood_group);

            const donorsGroupedByBloodGroup = await Donor.findAll({
                where: {
                    bloodType: {
                        [Op.in]: bloodGroups,
                    },
                    // Add more filters if necessary (e.g., location)
                },
                attributes: ['bloodType', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                group: ['bloodType'],
            }) as unknown as DonorGroupCount[];

            bloodRequests.forEach(request => {
                const donorCount = donorsGroupedByBloodGroup.find(
                    group => group.blood_group === request.blood_group
                )?.count || 0;

                const priority = calculatePriority(request.date_of_requirement, donorCount);
                
                request.priority = priority;
            });

            res.status(200).send(
                {
                    status: 200,
                    message: "Blood requests retrieved successfully",
                    page: {
                        page: page,
                        limit: count,
                    },
                    data: bloodRequests,
                }
            )
            return;
        } catch (error) {
            next(error);
        }
    }

}

interface DonorGroupCount {
    blood_group: string;
    count: number;
}


export default BloodRequestController;