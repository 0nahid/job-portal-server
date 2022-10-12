import { NextFunction, Request, Response } from "express";
const authorization = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.body?.user?.role;
    if (!roles.includes(role)) {
      return res.status(401).send({
        message: "Unauthorized",
        status: 401,
      });
    }
    console.log(`role: ${role}`);
    next();
  };
};

export { authorization };