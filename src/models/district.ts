'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

  class District extends Model {
    static associate(models: any) {
    }
  }
  District.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'District',
  });


  export default District;