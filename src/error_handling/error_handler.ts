import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";
import { ForeignKeyConstraintError, UniqueConstraintError } from 'sequelize';


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UniqueConstraintError) {
        const message = `Duplicate entry: this is already exists`;
        return res.status(400).json({
            status: 400,
            message: message,
        });
    }
    
    if (err instanceof ValidationError) {
        return res.status(400).json({
            status: 400,
            message: 'Validation error',
            errors: err.errors.map((e: any) => e.path)
        });
    }
    if (err instanceof ForeignKeyConstraintError) {
        const message = `Foreign Key Constraint Error on model '${err.table}' with fields: ${err.fields}`;

        return res.status(400).json({
            status: 400,
            message: message,
        });
    }

    console.log(err);

    return res.status(500).json({
        message: 'Server error',
        errors: err,

    });
};

export default errorHandler;