import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json('Login first');
  } else {
    try {
      const decode = jwt.verify(token, process.env.key || '');
      if (decode) {
        const user_ID = decode.userID;
        req.body.userID = user_ID;

         const userRole = decode.role;
         //console.log(userRole)
         req.body.userRole = userRole;
        next();
      } else {
        res.status(401).json('Please log in');
      }
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }
};

export { authentication };
