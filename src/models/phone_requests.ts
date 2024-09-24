import { Model, DataTypes } from 'sequelize';
import Associations from '../config/associations';
import sequelize from '../config/database';


interface PhoneRequestsAttributes {
  user_id: number;
  donor_id: number;
  status: boolean;
}

class PhoneRequests extends Model<PhoneRequestsAttributes> implements PhoneRequestsAttributes {
  user_id!: number;
  donor_id!: number;
  status!: boolean;

  static associate(models: any) {
    PhoneRequests.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'requester',
    });
    PhoneRequests.belongsTo(models.User, {
      foreignKey: 'donor_id',
      as: 'donor',
    });
  }
}

PhoneRequests.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    donor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'phone_requests',
    indexes: [
      {
        unique: true,
        fields: ["user_id", "donor_id"]
      }
    ]
  }
);

export { PhoneRequests, PhoneRequestsAttributes };