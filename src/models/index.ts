import sequelize from '../config/database';
import { User } from '../models/user';
import { Donor } from '../models/donor';
import  District  from '../models/district';
import { Sequelize } from 'sequelize';

const db: { [key: string]: any, sequelize?: Sequelize, Sequelize?: typeof Sequelize } = {};

for (const model of [User, Donor,District]) {
  db[model.name] = model;
}
Object.keys(db).forEach(modelName => {
  const model = db[modelName];
  if (model && model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
