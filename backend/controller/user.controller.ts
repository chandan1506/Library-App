import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserModel } from '../model/userModel';

const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const data = await UserModel.findOne({ email });
  if (data) {
    res.status(200).json({ message: 'User is already registered' });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 5);
      const new_user = new UserModel({
        name,
        email,
        password: hashedPassword,
        role,
      });
      await new_user.save();
      res.status(200).json({ message: 'User is registered' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Something went wrong, please try again' });
    }
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { userID: user._id, role: user.role },
          process.env.key || '',
          { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(400).json({ message: 'Wrong credentials' });
      }
    } else {
      res.status(401).json({ message: 'Cannot login' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login };
