import express, { Request, Response } from 'express';
const app = express();
import bodyParser from "body-parser";
import path from "./config/path_conf";
import authRouter from "./routes/auth_route";
import donorRoute from "./routes/donor_route";
import districtRoute from "./routes/district_route";
import testRoute from "./routes/test_route";
import phoneReqRoute from "./routes/phone_requests_route";
import authMiddleware from "./middlewares/auth";
import errorHandler from "./error_handling/error_handler";
import db from "./models";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/images", express.static("images"));

app.use(path, testRoute);
app.use(path, authRouter);
app.use(path, authMiddleware, donorRoute);
app.use(path, authMiddleware, districtRoute);
app.use(path, authMiddleware, phoneReqRoute);

app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", async () => {
  await (db as any).sequelize.sync({alter: true});
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
