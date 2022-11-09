import { Request, Response } from "express";

// /orders GET all
export const getAllOrders = (req: Request, res: Response) => {
  res.send("GET all orders");
};

// /order POST add new order
export const createOrder = (req: Request, res: Response) => {
  res.send("POST create order");
};

// /order/:id GET order by id
export const getOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`GET order id ${id}`);
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





