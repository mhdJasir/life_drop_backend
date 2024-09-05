import express from "express";
const app = express();
import bodyParser from "body-parser";
import sequelize from "./config/database";
import path from "./config/path_conf";
import authRouter from "./routes/auth_route";

const PORT: number = Number(process.env.PORT) || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use("/images", express.static("images"));
app.use(path, authRouter);


app.listen(PORT, "0.0.0.0", async () => {
  await sequelize.sync();
  console.log(`sever up at  ${PORT}`);
});
