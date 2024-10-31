import { NextFunction, Request, Response } from 'express';
import { PhoneRequests, PhoneRequestsAttributes } from '../models/phone_requests';
import { User } from '../models/user';
import Associations from '../config/associations';
import { Donor } from '../models/donor';
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: JwtPayload | string;
}

const getProtectedData = (req: AuthenticatedRequest, res: Response): {} => {
    const user = req.user as JwtPayload;
    return user;
};


class PhoneRequestsController {
    static async userRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = getProtectedData(req, res);
            const userId = (user as any).id;
            const sentRequests = await PhoneRequests.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: User,
                        as: 'donor',
                        attributes: ['id', 'name', 'phonenumber'],
                        include: [
                            {
                                model: Donor,
                                as: Associations.donor,
                            }
                        ]
                    },
                ],
                
            });

            const receivedRequests = await PhoneRequests.findAll({
                where: { donor_id: userId },
                include: [
                    {
                        model: User,
                        as: 'requester',
                        attributes: ['id', 'name', 'phonenumber'],
                        include: [
                            {
                                model: Donor,
                                as: Associations.donor,
                            }
                        ]
                    },
                ],
            });

            const allRequests = {
                sent: sentRequests,
                received: receivedRequests,
            };
            res.status(200).send({
                status: 200,
                message: "Phone number requested successfully",
                data: allRequests
            });
            return;
        } catch (error) {
            next(error);
            return;
        }
    }


    static async addAPhoneRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { donor_id } = req.body;
            const user = getProtectedData(req, res);
            if ((user as any).id == donor_id) {
                res.status(400).send({
                    status: 400,
                    message: "Cant request to yourself",
                });
                return;
            }
            const attr: PhoneRequestsAttributes = {
                donor_id: donor_id,
                status: false,
                user_id: (user as any).id,
            };

            const request = await PhoneRequests.create(attr);
            res.status(200).send({
                status: 200,
                message: "Phone number requested successfully",
                data: request
            });
            return;
        } catch (error) {
            next(error);
            return;
        }
    }

    static async acceptOrDeleteRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { req_id, status } = req.body;

            const phoneRequest = await PhoneRequests.findByPk(req_id);

            if (!phoneRequest) {
                res.status(404).json({ message: 'Phone request not found' });
                return;
            }
            if (status === 0) {
                await phoneRequest.destroy();
                res.status(200).json({ status: 200, message: 'Phone request deleted successfully' });
                return;
            }
            if (status === 1) {
                phoneRequest.status = true;
                await phoneRequest.save();
                res.status(200).json({ message: 'Phone request status updated successfully' });
                return;
            }

            res.status(400).json({ status: 400, message: 'Invalid status value' });
            return;
        } catch (error) {
            next(error);
            return;
        }
    }
}


export default PhoneRequestsController;
