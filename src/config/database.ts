import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv"
dotenv.config();

const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
console.log(process.env.PASSWORD);

const environment = process.env.NODE_ENV || 'development'; 
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

export default sequelize;