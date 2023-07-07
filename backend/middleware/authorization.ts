import { Request, Response, NextFunction } from 'express';

const authorization = (role_array: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userrole = req.body.userRole;
    if (role_array.includes(userrole)) {
      next();
    } else {
      res.status(401).json('You are not authorized');
    }
  };
};

export { authorization };
