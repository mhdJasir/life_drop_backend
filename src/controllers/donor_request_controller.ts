import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { DonorRequestResponse, DonorRequestResponseAttributes } from '../models/donor_request_responses';
import getNow from '../config/timezone';
import { User } from '../models/user';
import Associations from '../config/associations';
import { BloodRequest } from '../models/blood_requests';
import { Donor } from '../models/donor';


interface AuthenticatedRequest extends Request {
    user?: JwtPayload | string;
}

const getProtectedData = (req: AuthenticatedRequest, res: Response): {} => {
    const user = req.user as JwtPayload;
    return user;
};


class DonorRequestResponseController {
    static async addRequestResponse(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = getProtectedData(req, res);
        const { request_id, donor_id } = req.body;
        try {
            const request: DonorRequestResponseAttributes = {
                date_time: getNow(),
                donor_id: donor_id,
                request_id: request_id,
                user_id: (user as any).id,
            };
            const response = await DonorRequestResponse.create(request);
            res.status(200).send(
                {
                    status: 200,
                    messsage: "Congrats!. Your response send succeesfully",
                    data: response
                }
            );
            return;
        } catch (error) {
            next(error);
        }
    }

    static async getUserRequestResponses(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = getProtectedData(req, res);
        try {
            const response = await DonorRequestResponse.findAll(
                {
                    where: { user_id: (user as any).id },
                    include: [
                        {
                            model: Donor,
                            as: Associations.donor,
                            attributes: ["place","latitude","longitude","dob","districtId"],
                            include: [
                                {
                                    model: User,
                                    as: Associations.user,
                                    attributes: ["name","gender","phonenumber","alt_phonenumber"],
                                },
                            ]
                        },
                        {
                            model: BloodRequest,
                            as: 'blood_request',
                            attributes: ["phone","alt_phone","place","address","units","date_of_requirement","time_of_requirement"],
                        },
                    ]
                }
            );
            res.status(200).send(
                {
                    status: 200,
                    messsage: "Responses fetched successfully",
                    data: response
                }
            );
            return;
        } catch (error) {
            next(error);
        }
    }


    static async myResponses(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = getProtectedData(req, res);
        try {
            const userData = await User.findOne({ where: { id: (user as any).id } });
            if (!userData) {
                res.status(200).send(
                    {
                        status: 400,
                        messsage: "Invalid session, please login again",
                    }
                );
                return;
            }
            if (!userData.donor_id) {
                res.status(200).send(
                    {
                        status: 400,
                        messsage: "You should register as a donor first",
                    }
                );
                return;
            }
            const response = await DonorRequestResponse.findAll(
                {
                    where: { donor_id: userData.donor_id },
                    include: [
                        {
                            model: BloodRequest,
                            as: 'blood_request',
                            attributes: ["phone","alt_phone","place","address","units","date_of_requirement","time_of_requirement"],
                            include: [
                                {
                                    model: User,
                                    as: 'user',
                                    attributes: ["name","gender","phonenumber","alt_phonenumber"],
                                }
                            ]
                        },
                    ]
                }
            );
            res.status(200).send(
                {
                    status: 200,
                    messsage: "Your responses listed successfully",
                    data: response
                }
            );
            return;
        } catch (error) {
            next(error);
        }
    }
}


export default DonorRequestResponseController;
