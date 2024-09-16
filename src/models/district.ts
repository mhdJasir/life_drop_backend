'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Associations from '../config/associations';

  class District extends Model {
    static associate(models: any) {
      District.hasMany(models.Donor,{
        foreignKey: 'districtId',
        as: Associations.donor,
      })
    }
  }
  District.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'District',
    tableName: 'Districts',
  });


  export default District;