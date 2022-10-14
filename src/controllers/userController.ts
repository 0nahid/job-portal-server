import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { availableJobs } from "../models/avaiableJobsModel";
import { User } from "../models/userModel";
import sendMailWIthGmail from "../utils/email";
import { generateToken } from "../utils/generateToken";

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

    const savedUser = await newUser.save();

    // send email
    const mailData = {
      to: savedUser.email,
      subject: "Confirm your email",
      html: `Hi  ${savedUser.firstName}  ,
      <p>Thanks for signing up with us. </p>
      <p> Your confirmation code is <strong>${confirmationToken}</strong> </p>      
      <p>Type the confirmation code on verification page or click on the link below</p>
      <a href="${req.protocol}://${req.get(
        "host"
      )}/api/v1/user/confirm?token=${confirmationToken}&email=${
        savedUser.email
      }">Confirm Email</a>

      <p>${req.protocol}://${req.get(
        "host"
      )}/api/v1/user/confirm?token=${confirmationToken}&email=${
        savedUser.email
      }</p> Or copy the link and paste it in your browser
      

      <p>Thanks</p>


      <p>If you didn't sign up with us, please ignore this email</p>
      `,
    };

    // send mail
    await sendMailWIthGmail(mailData);

    res.status(201).json({
      message: "User created successfully",
      status: 201,
      data: savedUser,
      mailData: mailData,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// login an user
const login = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;
    const user = await User.findOne({
      $or: [{ email }, { userName }],
    });
    // log.info(user);

    if (!user) {
      return res.status(404).send({
        message: "User not found with this email, please signup first",
        status: 404,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // log.info(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.status === "inactive") {
      return res.status(401).send({
        message: "Your account is inactive",
        status: 401,
      });
    }

    const token = generateToken(user);
    const { password: pass, ...data } = user._doc;
    res.status(200).json({
      message: "User logged in successfully",
      status: 200,
      data: data,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// confirm user
const confirmUser = async (req: Request, res: Response) => {
  try {
    const { token, email } = req.query;

    // log.info(`token: ${token}, email: ${email}`);
    if (!token || !email) {
      return res.status(400).send({
        message: "Token and email required",
        status: 400,
      });
    }

    //   find user by email and token
    const user = await User.findOne({
      email,
      confirmationToken: token,
      confirmationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).send({
        message: "Token is invalid or expired, please signup again",
        status: 404,
      });
    }
    user.status = "active";
    // empty confirmation token & confirmation expires
    user.confirmationToken = "";
    user.confirmationTokenExpires = "";
    await user.save();
    res.render("confirmation", { user });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "All users",
      status: 200,
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// get me
const getMe = async (req: Request, res: Response) => {
  const email = req.body?.user?.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found with this email, please signup first",
        status: 404,
      });
    }
    const { password, ...data } = user._doc;
    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// get the hr lists
const getHrList = async (req: Request, res: Response) => {
  try {
    const hrList = await User.find({ role: "hr" });
    res.status(200).json({
      message: "All hr list",
      status: 200,
      data: hrList,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// make user as hr
const makeUserAsHr = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found with this id",
        status: 404,
      });
    }
    user.role = "hr";
    await user.save();
    res.status(200).json({
      message: "User is now hr",
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// get user by id
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found with this id",
        status: 404,
      });
    }
    res.status(200).json({
      message: "User by id",
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// update user by id but email and userName can't be updated by user
const updateUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email, userName, role, ...data } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found with this id",
        status: 404,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    res.status(200).json({
      message: "User updated successfully",
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// upload profile image
const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Image uploaded",
      data: req.file,
      imageUrl: `${req.protocol}://${req.get("host")}/${req.file?.path}`,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// upload resume file
const uploadResumeFile = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Resume uploaded",
      data: req.file,
      resumeUrl: `${req.protocol}://${req.get("host")}/${req.file?.path}`,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// get all the jobs posted by a specific hr mail
const getJobsByHrId = async (req: Request, res: Response) => {
  const email = req.body?.user?.email;
  console.log(email);
  
  try {
    const jobs = await availableJobs.find({ postedBy: email });
    res.status(200).json({
      message: "All jobs by hr id",
      status: 200,
      data: jobs,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

export const userRouter = {
  signUp,
  login,
  confirmUser,
  getAllUsers,
  getMe,
  getHrList,
  makeUserAsHr,
  getUserById,
  updateUserById,
  uploadProfileImage,
  uploadResumeFile,
  getJobsByHrId,
};
