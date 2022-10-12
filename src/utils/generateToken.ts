import jwt from "jsonwebtoken";
import { IUser } from "../Schema/userSchema";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "";
export const generateToken = (user: IUser) => {
  const { email, role, userName } = user;
  const token = jwt.sign({ email, role, userName }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return token;
};
