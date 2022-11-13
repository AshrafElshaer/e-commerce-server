import { Request, Response } from "express";
import UserModel from "../models/users.schema";
import bcrypt from "bcrypt";
// GET /users
export const getAllusers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select("-password");
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
  const { name, email, password, phone, address } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const foundUser = await UserModel.findById(id).exec();
    if (!foundUser)
      return res
        .status(404)
        .json({ message: `User with ID : ${id} not found` });

    foundUser.name = name;
    foundUser.email = email;
    foundUser.password = hashPassword;
    foundUser.phone = phone;
    foundUser.address = address;

    await foundUser.save();
    res
      .status(201)
      .json({ message: `User ${name} information has been updated` });
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
