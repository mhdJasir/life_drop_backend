import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BloodRequestAttributes {
  id?: number;
  user_id: number;
  patient_name: string;
  age: number;
  gender: string;
  bystander_name: string;
  phone: string;
  alt_phone?: string;
  blood_group: string;
  date_of_requirement: Date;
  time_of_requirement: string;
  units: number;
  latitude: number;
  longitude: number;
  place: string;
  priority?: string;
  address: string;
  other_info: string;
}

interface BloodRequestCreationAttributes extends Optional<BloodRequestAttributes, 'id'> { }

class BloodRequest extends Model<BloodRequestAttributes, BloodRequestCreationAttributes>
  implements BloodRequestAttributes {
  public id!: number;
  public user_id!: number;
  public patient_name!: string;
  public age!: number;
  public gender!: string;
  public bystander_name!: string;
  public phone!: string;
  public alt_phone?: string;
  public blood_group!: string;
  public priority!: string;
  public date_of_requirement!: Date;
  public time_of_requirement!: string;
  public units!: number;
  public latitude!: number;
  public longitude!: number;
  public place!: string;
  public address!: string;
  public other_info!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    BloodRequest.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    BloodRequest.belongsTo(models.Donor, { foreignKey: 'donor_id', as: 'donor' });
    BloodRequest.hasMany(models.DonorRequestResponse, { foreignKey: 'responses', as: 'blood_request' });
  }
}

BloodRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bystander_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    alt_phone: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    blood_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_requirement: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time_of_requirement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    other_info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'blood_requests',
    timestamps: false,
  }
);

export { BloodRequest, BloodRequestAttributes };
