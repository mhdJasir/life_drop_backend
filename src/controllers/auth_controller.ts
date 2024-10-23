import { NextFunction, Request, Response } from 'express';
import { User, UserCreationAttributes } from '../models/user';
import dotenv from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';
import Associations from '../config/associations';
import { Donor } from '../models/donor';

dotenv.config()

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

const getProtectedData = (req: AuthenticatedRequest, res: Response): {} => {
  const user = req.user as JwtPayload;
  return user;
};

class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, gender, password, phonenumber, alt_phonenumber } = req.body;

      const existingUser = await User.findOne({ where: { phonenumber } });
      if (existingUser) {
        res.status(400).json({ message: 'User with this phone number already exists' });
        return;
      }
      let filename;
      if (req.file) {
        filename = req.file.path;
      }

      const newUserData: UserCreationAttributes = {
        name: name as string,
        gender: gender as string,
        password: password as string,
        phonenumber: phonenumber as string,
        image: filename as string,
        alt_phonenumber: alt_phonenumber ? alt_phonenumber as string : undefined,
      };

      const newUser = await User.create(newUserData);

      const userResponse = {
        id: newUser.id,
        name: newUser.name,
        gender: newUser.gender,
        phonenumber: newUser.phonenumber,
        image: newUser.image,
        alt_phonenumber: newUser.alt_phonenumber,
      };

      res.status(201).json({ status: 200, message: 'User registered successfully', user: userResponse });
    } catch (error) {
      next(error);
      return;
    }
  }


  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { phonenumber, password } = req.body;
      const user = await User.findOne({ where: { phonenumber } });
      console.log(user);

      if (!user) {
        res.status(400).json({ message: 'No user registered with this number', });
        return;
      }
      const isMatchPassword = await user.comparePasswords(password);
      if (!isMatchPassword) {
        res.send({
          status: 400,
          message: "Wrong password entered",
        });
        return;
      }
      const token = await user.generateToken();
      const userResponse = {
        id: user.id,
        token: token,
        name: user.name,
        phone: user.phonenumber,
        image: user.image,
        alt_phone: user.alt_phonenumber,
        gender: user.gender,
      };
      res.status(200).json(
        {
          status: 200,
          message: 'User Login successfully',
          user: userResponse
        });
      return;

    } catch (error) {
      next(error);
    }
  }

  async userExist(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { phonenumber } = req.body;
    const user = await User.findOne({ where: { phonenumber } });
    if (user) {
      res.send(
        {
          status: 200,
          message: "User exists!",
        }
      );
      return;
    }
    res.send(
      {
        status: 400,
        message: "User donesnt exists",
      }
    );
    return;
  }

  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const useJwt = getProtectedData(req, res);
    const user = await User.findOne({
      where: { id: (useJwt as any).id }, attributes: [
        "id", "donor_id", "name", "gender", "phonenumber", "alt_phonenumber", "image",
      ],
      include: [
        {
            model: Donor,
            as: Associations.donor,
        },
    ],
    });
    res.send(
      {
        status: 200,
        message: "User profile fetched successfully",
        data: user
      }
    );
    return;
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const useJwt = getProtectedData(req, res);
    const { name } = req.body
    const user = await User.findOne({
      where: { id: (useJwt as any).id }
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    let filename;
    if (req.file) {
      filename = req.file.path;
    }
    user.name= name;
    user.image= filename as string;
    await user.save();

    const userData = user.toJSON() as any;

    delete userData.password;
    delete userData.createdAt;
    delete userData.updatedAt;

    res.send(
      {
        status: 200,
        message: "User profile fetched successfully",
        data: userData
      }
    );
    return;
  }
}

export default new AuthController();
