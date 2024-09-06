import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

interface UserAttributes {
  id: number;
  name: string;
  gender: string;
  password: string;
  phonenumber: string;
  image: string;
  alt_phonenumber?: string;
}

class User extends Model<UserAttributes, UserCreationAttributes> {
  async comparePasswords(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  public id!: number;
  public name!: string;
  public gender!: string;
  public password!: string;
  public phonenumber!: string;
  public image!: string;
  public alt_phonenumber?: string;

  generateToken(): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET;
    return new Promise((resolve, reject) => {
      Jwt.sign({ _id: this.id, name: this.password }, jwtSecret!, { expiresIn: "30d" }, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token as string);
      });
    });
  }

  static associate(models: any): void {
    // Define associations here
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alt_phonenumber: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeCreate: async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export { User, UserCreationAttributes };
