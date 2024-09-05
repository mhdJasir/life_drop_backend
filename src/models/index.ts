import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const sequelize = require('../config/database'); 

interface Model {
  name: string;
  associate?: (models: Record<string, Model>) => void;
}
const db: Record<string, Model> = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    const model = db[modelName];
    if (model && model.associate) {
      model.associate(db);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
