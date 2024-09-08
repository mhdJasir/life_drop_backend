import { Request, Response } from 'express';
import { User, UserCreationAttributes } from '../models/user';
import dotenv from 'dotenv';

dotenv.config()

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, gender, password, phonenumber, alt_phonenumber } = req.body;
      const existingUser = await User.findOne({ where: { phonenumber } });
      if (existingUser) {
        res.status(400).json({ message: 'User with this phone number already exists' });
        return;
      }      
      let filename;
      if(req.file){
        filename =req.file.path;
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

      res.status(201).json({ message: 'User registered successfully', user: userResponse });
    } catch (error) {
      console.error('Error creating user:', (error as Error).message);
      res.status(300).json({ message: 'Internal server error occured' });
      return;
    }
  }


  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { phonenumber, password } = req.body;
      const user = await User.findOne({ where: { phonenumber } });
      console.log(user);
      
      if (!user) {
        return res.status(400).json({ message: 'No user registered with this number', });
      }
      const isMatchPassword = await user.comparePasswords(password);
      if (!isMatchPassword) {
        return res.send({
          status: false,
          message: "Wrong password entered",
        });
      }
      const token = await user.generateToken();
      const userResponse={
          message: "Login successful",
          id: user.id,
          token: token,
          name: user.name,
          phone: user.phonenumber,
          image: user.image,
          alt_phone: user.alt_phonenumber,
          gender: user.gender,
      }; 
      return res.status(200).json({ message: 'User Login successfully', user: userResponse });
    } catch (error) {      
      return res.status(300).json({ message: 'Internal server error occured' });
    }
  }
}

export default new AuthController();
