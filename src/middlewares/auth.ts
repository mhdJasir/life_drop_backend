// import {verify,JWT} from "jsonwebtoken";
// import { Request,Response ,NextFunction} from "express";
// require("dotenv").config();


// const authenticate = (req: Request, res: Response, next:NextFunction) => {
//   const token = req.headers.authorization;
//   if (!token || !token.startsWith("Bearer") || token.length < 25) {
//     console.log("No Token");
//     next();
//     return;
//   }
//   const payLoad = verify(
//     token.replace("Bearer ", ""),
//     process.env.JWT_SECRET
//   );
//   req.user = { _id: payLoad._id, name: payLoad.name };
//   next();
// };

// export default authenticate;
