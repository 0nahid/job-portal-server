import { NextFunction, Request, Response } from "express";
import log from "../utils/logger";
const authorization = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.body?.user?.role;
    if (!roles.includes(role)) {
      return res.status(401).send({
        message: "Unauthorized",
        status: 401,
      });
    }
   log.info(`role: ${role}`);
    next();
  };
};

export { authorization };