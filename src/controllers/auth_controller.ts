import { Request, Response } from 'express';
import { User,UserCreationAttributes } from '../models/user';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, gender, password, phonenumber, alt_phonenumber } = req.body;

      const existingUser = await User.findOne({ where: { phonenumber } });
      if (existingUser) {
        res.status(400).json({ message: 'User with this phone number already exists' });
        return;
      }

      const newUserData: UserCreationAttributes = {
        name: name as string,
        gender: gender as string,
        password: password as string,
        phonenumber: phonenumber as string,
        alt_phonenumber: alt_phonenumber ? alt_phonenumber as string : undefined,
      };

      const newUser = await User.create(newUserData);

      const userResponse = {
        id: newUser.id,
        name: newUser.name,
        gender: newUser.gender,
        phonenumber: newUser.phonenumber,
        alt_phonenumber: newUser.alt_phonenumber,
      };

      res.status(201).json({ message: 'User created successfully', user: userResponse });
    } catch (error) {
      console.error('Error creating user:', (error as Error).stack);
      res.status(300).json({ message: 'Internal server error' });
    
    }
  }
}

export default new AuthController();
