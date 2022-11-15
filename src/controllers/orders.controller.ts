import { Request, Response } from "express";
import OrdersModel from "../models/orders.schema";
import UserModel from "../models/users.schema";

// /orders GET all
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrdersModel.find();
    res.json(orders);
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// /order POST add new order
export const createOrder = async (req: Request, res: Response) => {
  const newOrder = req.body;
  try {
    const user = await UserModel.findById(newOrder.customerId);
    const result = await OrdersModel.create(newOrder);
    user?.orders.push(result._id.toString());
    user?.save();
    res.status(201).json(result);
  } catch (error: any) {
    res.json({ messgae: error.message });
  }
};

// /order/:id GET order by id
export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const foundOrder = await OrdersModel.findById(id);
    if (!foundOrder)
      return res
        .status(404)
        .json({ message: `Order was not found  id : ${id}` });
    res.json(foundOrder);
  } catch (error: any) {
    res.json({ messgae: error.message });
  }
};

// /order/:id PUT order by id
export const updateOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`PUT update order id ${id}`);
};

// /order/:id DELETE order by id
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { customerId } = req.body;

  try {
    const foundOrder = await OrdersModel.findById(id).exec();
    if (!foundOrder)
      return res.status(404).json({ message: ` Order ${id} not found` });
    if (foundOrder.status === "Copmleted")
      return res.status(400).json({
        message: `Orders has status of Copmpleted Can't be deleted`,
      });
    const foundUser = await UserModel.findById(customerId).exec();
    if (!foundUser)
      return res.json({ message: `User associates with order not found` });
    const orderIdx: number = foundUser.orders.indexOf(id);
    foundUser.orders.splice(orderIdx, 1);
    foundUser.save();
    await foundOrder.delete();
    res.json({ message: `Order ${id} has been deleted` });
  } catch (error: any) {
    res.json({ messgae: error.message });
  }
};
