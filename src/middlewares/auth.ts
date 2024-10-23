import { verify, Jwt, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();


const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer") || token.length < 25) {
        console.log("No Token");
        return res.status(403).json({ message: 'Please login again' });
    }
    try {
        const payLoad = verify(
            token.replace("Bearer ", ""),
            process.env.JWT_SECRET!
        );
        if(payLoad===undefined){
            return res.status(403).json({ message: 'Please login again' });
        }
        
        if (typeof payLoad === 'object' && (payLoad as JwtPayload)) {
            (req as any).user = payLoad;
            next();
        } else {
            return res.status(403).json({ message: 'Please login again' });
        }
    } catch (e) {
        return res.status(403).json({ message: 'Please login again' });
    }
};

export default authenticate;
