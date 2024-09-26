import { NextFunction, Request, Response } from 'express';
import { TestModel, TestAttributes } from '../models/test_model';
import { stringify } from 'querystring';

class TestController {

    static async saveData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { data } = req.body;
            const val: TestAttributes = {
                data: stringify(data)
            };
            const savedData = await TestModel.create(val);
            res.status(200).send({
                status: 200,
                message: "Data saved successfully",
                data: savedData
            });
            return;
        } catch (error) {
            next(error);
        }
    }

    static async getData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await TestModel.findAll({attributes: ["data"]});
            res.status(200).send({
                message: "Data listed successfully",
                data: data
            });
            return;
        } catch (error) {
            next(error);
        }
    }

    static async clearData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await TestModel.truncate();
            res.status(200).send({
                message: "Data deleted successfully",
            });
            return;
        } catch (error) {
            next(error);
        }
    }
}


export default TestController;
