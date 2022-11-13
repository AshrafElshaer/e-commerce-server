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
  const newOrder = {
    orderType: req.body.orderType,
    customerId: req.body.customerId,
    total: req.body.total,
  };

  try {
    const user = await UserModel.findById(req.body.customerId);
    const result = await OrdersModel.create(newOrder);
    user?.orders.push(result._id.toString());
    user?.save();
    res.status(201).json(result);
  } catch (error: any) {
    console.error(error.message);
  }
};

// /order/:id GET order by id
export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const foundOrder = await OrdersModel.findById(id);
    res.json(foundOrder);
    if (!foundOrder)
      return res
        .status(404)
        .json({ message: `Order was not found  id : ${id}` });
  } catch (error) {
    console.log(error);
  }
  // res.send(`GET order id ${id}`);
};

// /order/:id PUT order by id
export const updateOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`PUT update order id ${id}`);
};

// /order/:id DELETE order by id
export const deleteOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`DELETE order id ${id}`);
};
