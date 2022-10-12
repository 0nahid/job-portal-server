import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import log from "../utils/logger";

// post data
const signUp = async (req: Request, res: Response) => {
  try {
    const {
      userName,
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
      address,
    } = req.body;
    if (
      !userName ||
      !email ||
      !password ||
      !role ||
      !firstName ||
      !lastName ||
      !phone ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // create a 6 digit random number for confirmation token
    const confirmationToken = Math.floor(100000 + Math.random() * 900000);
    //  15 minutes from now
    const confirmationTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      role,
      firstName,
      lastName,
      phone,
      address,
      confirmationToken,
      confirmationTokenExpires,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      status: 201,
      data: newUser,
    });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login an user
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password required",
        status: 400,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found with this email, please signup first",
        status: 404,
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    log.info(validPassword);
    if (!validPassword) {
      return res.status(401).send({
        message: "Invalid Password",
        status: 401,
      });
    }
    if (user.status === "inactive") {
      return res.status(401).send({
        message: "Your account is inactive",
        status: 401,
      });
    }

    // generate token
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

export const userRouter = { signUp, login };
