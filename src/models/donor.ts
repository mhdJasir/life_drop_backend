import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Associations from '../config/associations';


interface DonorCreationAttributes extends Optional<DonorAttributes, 'id'> { }

interface DonorAttributes {
  id: number;
  userId: number;
  districtId: number;
  bloodType: string;
  place: string;
  address: string;
  latitude: number;
  longitude: number;
  dob: Date;
}

class Donor extends Model<DonorAttributes, DonorCreationAttributes> {

  public id!: number;
  public userId!: number;
  public districtId!: number;
  public bloodType!: string;
  public address!: string;
  public place!: string;
  public latitude!: number;
  public longitude!: number;
  public dob!: Date;


  static associate(models: any): void {
    Donor.belongsTo(models.User, {
      foreignKey: 'userId',
      as: Associations.user,
    });
    Donor.belongsTo(models.District, {
      foreignKey: 'districtId',
      as: Associations.district,
    });
    Donor.hasMany(models.DonorRequestResponse, {
      foreignKey: 'donor_id',
      as: 'donor',
    });
  }
}

Donor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
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
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Donor",
    tableName: "Donors",
  }
);

export { Donor, DonorCreationAttributes };
