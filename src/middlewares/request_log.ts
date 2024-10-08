import { Request, Response, NextFunction } from "express";
import { TestAttributes, TestModel } from "../models/test_model";


const logRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        const val: TestAttributes = {
            api: req.path,
            request: req.body,
        };
        TestModel.create(val);
        next();
    } catch (e) {
        next();
    }
};

export default logRequest;
