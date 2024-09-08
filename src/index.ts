import express from "express";
const app = express();
import bodyParser from "body-parser";
import path from "./config/path_conf";
import authRouter from "./routes/auth_route";
import donorRoute from "./routes/donor_route";
import districtRoute from "./routes/district_route";
import authMiddleware from "./middlewares/auth";
import errorHandler from "./error_handling/error_handler";
import db from "./models";

const PORT: number = Number(process.env.PORT) || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/images", express.static("images"));


app.use(path, authRouter);
app.use(path, authMiddleware, donorRoute);
app.use(path, districtRoute);

app.use(errorHandler);


app.listen(PORT, "0.0.0.0", async () => {
  await (db as any).sequelize.sync();
  console.log(`sever up at  ${PORT}`);
});
