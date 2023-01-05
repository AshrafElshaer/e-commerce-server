import { Request, Response } from "express";
import UserModel from "../models/users.schema";
import bcrypt from "bcrypt";

// GET /users
export const getAllusers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select("-password").exec();
    res.json(users);
  } catch (error: any) {
    res.json({ messgae: error.message });
  }
};

// GET /users/:id
export const getuser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id).select("-password").lean().exec();
    if (!user)
      return res
        .status(404)
        .json({ message: `User with ID : ${id} not found` });

    res.status(200).json(user);
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// PUT /users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    email,
    password,
    phoneNumber,
    address,
    newPassword,
    overWritePassword,
  } = req.body;

  try {
    const foundUser = await UserModel.findById(id).exec();
    if (!foundUser)
      return res
        .status(404)
        .json({ message: `User with ID : ${id} not found` });

    if (!overWritePassword) {
      const matchPassword = await bcrypt.compare(password, foundUser.password);
      if (!matchPassword)
        return res
          .status(400)
          .json({ message: "Password is incorrect please try again" });
    }
    if (
      overWritePassword &&
      overWritePassword !== process.env.OVERWRITE_PASSWORD
    ) {
      return res.sendStatus(403);
    }

    if (name) foundUser.name = name;
    if (email) foundUser.email = email;
    if (newPassword) foundUser.password = await bcrypt.hash(newPassword, 10);
    if (phoneNumber) foundUser.phone = phoneNumber;
    if (address) foundUser.address = address;

    await foundUser.save();
    res.status(201).json({
      userInfo: {
        ...foundUser.toObject(),
        refreshToken: undefined,
        password: undefined,
        __v: undefined,
        createdAt: undefined,
      },
    });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// DELETE /users/:id
export const deleteuser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foundUser = await UserModel.findById(id).exec();
    if (!foundUser)
      return res
        .status(404)
        .json({ message: `User with ID : ${id} not found` });

    const result = await foundUser.delete();
    res.json({ message: `User ID : ${id} has been deleted` });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};
