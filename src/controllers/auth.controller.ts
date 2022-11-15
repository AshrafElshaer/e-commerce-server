import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/users.schema";

// POST /loging

export const loginUser = (req: Request, res: Response) => {
  res.send("login user");
};

// POST /register
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, address } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    password: hashPassword,
    phone,
    address: {
      street: address.street,
      suite: address.suite,
      city: address.city,
      zipcode: address.zipcode,
    },
  };
  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser)
      return res.status(409).json({
        message: `Email address : ${foundUser.email} already has an active account please log in`,
      });

    const resault = await UserModel.create(newUser);
    res.status(201).json(resault);
  } catch (error: any) {
    res.json({ message: error.message });
  }
};
