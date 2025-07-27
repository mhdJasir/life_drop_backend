import express from 'express';
const app = express();
import bodyParser from "body-parser";
import apiPath from "./config/path_conf";
import authRouter from "./routes/auth_route";
import donorRoute from "./routes/donor_route";
import districtRoute from "./routes/district_route";
import phoneReqRoute from "./routes/phone_requests_route";
import bloodRequestRoute from "./routes/blood_request_route";
import webhhokRoute from "./routes/webb_hooks";
import publicRoute from "./routes/public_route";
import donorReqResRoute from "./routes/donor_request_response_route";
import authMiddleware from "./middlewares/auth";
import errorHandler from "./error_handling/error_handler";
import cors from 'cors';
import db from "./models";
import deleteInvalidRequests from './crone/delete_outdated_requests';

///CRON-JOBS
deleteInvalidRequests.start();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/images", express.static("images"));
app.use("/files", express.static("files"));
app.use('/fonts', express.static("fonts"));

app.use(apiPath, publicRoute);
app.use(apiPath, authRouter);
app.use(apiPath, webhhokRoute);
app.use(apiPath, authMiddleware, donorRoute);
app.use(apiPath, authMiddleware, districtRoute);
app.use(apiPath, authMiddleware, phoneReqRoute);
app.use(apiPath, authMiddleware, bloodRequestRoute);
app.use(apiPath, authMiddleware, donorReqResRoute);

app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", async () => {
  await (db as any).sequelize.sync();
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
