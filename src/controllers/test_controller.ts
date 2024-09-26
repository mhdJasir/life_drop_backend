import { NextFunction, Request, Response } from 'express';
import { TestModel, TestAttributes } from '../models/test_model';
import { Json } from 'sequelize/types/utils';

class TestController {

    static async saveData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { api, request, response } = req.body;
            const val: TestAttributes = {
                api: api,
                request: request,
                response: response,
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

            const data = await TestModel.findAll({ attributes: ["api","request","response","dateTime",] });
            const list: Array<Json> = [];

            data.forEach(entry => {
                const parsedReq = JSON.parse((entry.request as any));
                const parsedData = JSON.parse((entry.response as any));
                console.log(entry);
                
                const data = {
                    dateTime: entry.dateTime,
                    api: entry.api,
                    request: parsedReq,
                    response: parsedData,
                };
                list.push(
                    data as any
                );
            });
            res.status(200).send({
                message: "Data listed successfully",
                data: list
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
