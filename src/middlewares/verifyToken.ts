import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";
type MyToken = {
  email: string;
  role: string;
  userName: string;
  iat: number;
  exp: number;
};
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    // console.log(`token: ${token}`);
    // console.log(`JWT_SECRET: ${JWT_SECRET}`);

    if (!token) {
      return res.status(401).send({
        message: "Access Denied",
        status: 401,
      });
    }
    // verify token
    // const decoded = jwt_decode(token);
    const decoded = jwt.verify(token, JWT_SECRET) as MyToken;
    req.body.user = decoded;
    // console.log(`decoded :`, decoded);

    next();
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
      status: 401,
    });
  }
};

export { verifyToken };
