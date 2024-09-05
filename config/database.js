const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const environment = process.env.NODE_ENV || 'development'; 
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

module.exports= sequelize;
