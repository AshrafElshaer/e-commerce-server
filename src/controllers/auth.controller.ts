import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import UserModel from "../models/users.schema";
dotenv.config();

export type TNewUser = {
  email: string;
  password: string;
  role: string;
  refreshToken: string;
};

export const logoutUser = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await UserModel.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.sendStatus(204);
    }
    foundUser.refreshToken = "";
    await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(204);
  } catch (err: any) {
    res.json({ message: err.message });
  }
};
// POST /loging

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const foundUser = await UserModel.findOne({ email }).exec();
    if (!foundUser)
      return res.status(400).json({
        message: `Email provided doesn't exist please sign up`,
      });

    const matchPassword = await bcrypt.compare(password, foundUser.password);

    if (!matchPassword)
      return res.status(400).json({
        message: `Password Provided is Incorrect `,
      });

    const accessToken = JWT.sign(
      {
        email: foundUser.email,
        role: foundUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );

    const refreshToken = JWT.sign(
      {
        email: foundUser.email,
        role: foundUser.role,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure : true ,
      // sameSite: "none",
    });

    res.json({
      userInfo: {
        ...foundUser.toObject(),
        refreshToken: undefined,
        password: undefined,
        __v: undefined,
        createdAt: undefined,
      },
      token: accessToken,
    });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// POST /register
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const foundUser = await UserModel.findOne({ email }).exec();
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
      // secure : true ,
      sameSite: "none",
    });

    res.status(201).json({
      userInfo: {
        ...result.toObject(),
        refreshToken: undefined,
        password: undefined,
        __v: undefined,
        createdAt: undefined,
      },
      token: accessToken,
    });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// POST /refresh

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await UserModel.findOne({ refreshToken });
    console.log("user", foundUser?.refreshToken);
    if (!foundUser) return res.sendStatus(403);
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      /* @ts-ignore */
      (err, decoded) => {
        if (err || foundUser.email !== decoded.email) {
          console.log("error", err);
          return res.sendStatus(403);
        }
        const accessToken = JWT.sign(
          {
            email: foundUser.email,
            role: foundUser.role,
          },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "15m" }
        );
        res.json({ accessToken });
      }
    );
  } catch (err: any) {
    res.json({ message: err.message });
  }
};
