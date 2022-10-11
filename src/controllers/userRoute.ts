import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import { User } from "../models/userModel";

// post data
const createUser = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  generate a random confirmationToken
    const confirmationToken = crypto.randomBytes(20).toString("hex");
    const date = new Date();
    const confirmationTokenExpires = date.setDate(date.getDate() + 1);

    const userData = {
      ...req.body,
      password: hashedPassword,
      confirmationToken,
      confirmationTokenExpires,
    };
    // console.log(userData);
    
    const user = await User.create(userData);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const userRouter = { createUser };
