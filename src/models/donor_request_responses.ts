import {
  Model,
  DataTypes,
  Optional,
  ForeignKey
} from 'sequelize';
import sequelize from '../config/database';
import { BloodRequest } from './blood_requests';
import { Donor } from './donor';
import { User } from './user';

interface DonorRequestResponseAttributes {
  id?: number;
  user_id: number;
  date_time: string;
  request_id: ForeignKey<BloodRequest['id']>;
  donor_id: ForeignKey<Donor['id']>;
  response_status?: 'pending' | 'accepted' | 'rejected';
  response_message?: string;

}

interface DonorRequestResponseCreationAttributes
  extends Optional<DonorRequestResponseAttributes, 'id'> { }

class DonorRequestResponse extends Model<
  DonorRequestResponseAttributes,
  DonorRequestResponseCreationAttributes
> implements DonorRequestResponseAttributes {
  public id!: number;
  public user_id!: number;
  public request_id!: number;
  public donor_id!: number;
  public date_time!: string;
  public response_status?: 'pending' | 'accepted' | 'rejected';
  public response_message?: string;

  static associate(models: any) {
    DonorRequestResponse.belongsTo(models.Donor, { foreignKey: 'donor_id', as: 'donor' })
    DonorRequestResponse.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    DonorRequestResponse.belongsTo(models.BloodRequest, { foreignKey: 'request_id', as: 'blood_request' })
  }
}

DonorRequestResponse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BloodRequest,
        key: 'id',
      },
    },
    donor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Donor,
        key: 'id',
      },
    },
    date_time: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    response_status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
    response_message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'donor_request_responses',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["request_id", "donor_id"]
      }
    ]
  }
);

export { DonorRequestResponse, DonorRequestResponseAttributes };
