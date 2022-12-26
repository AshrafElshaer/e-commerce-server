import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import UserModel from "../models/users.schema";
import { type } from "os";
dotenv.config();

export type TNewUser = {
  email: string;
  password: string;
  role: string;
  refreshToken: string;
};
// POST /loging

export const loginUser = (req: Request, res: Response) => {
  res.send("login user");
};

// POST /register
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser)
      return res.status(409).json({
        message: `Email address : ${foundUser.email} already has an active account try to login`,
      });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser: TNewUser = {
      email,
      password: hashPassword,
      role: req.body.role ? req.body.role : "User",
      refreshToken: "",
    };
    const accessToken = JWT.sign(
      {
        email,
        role: newUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      // process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = JWT.sign(
      {
        email,
        role: newUser.role,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );
    newUser.refreshToken = refreshToken;

    const result = await UserModel.create(newUser);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      ...result.toObject(),
      accessToken,
      refreshToken: undefined,
      password: undefined,
    });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};
