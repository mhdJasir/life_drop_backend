import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({
            message: 'Validation error',
            errors: err.errors.map((e: any) => e.message)
        });
    }
    console.log(err);
    
    return res.status(500).json({
        message: 'Server error',
        errors: err,

    });
};

export default errorHandler;