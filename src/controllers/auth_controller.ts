import { NextFunction, Request, Response } from 'express';
import { User, UserCreationAttributes } from '../models/user';
import dotenv from 'dotenv';

dotenv.config()

class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log(req.body);

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

}

export default new AuthController();
