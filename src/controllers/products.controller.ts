import { Request, Response } from "express";

// GET /Products
export const getAllProducts = (req: Request, res: Response) => {
  res.send("GET all products");
};

// POST /Products
export const createProduct = (req: Request, res: Response) => {
  res.send("POST create new product");
};

// GET /Products/:id
export const getProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(`get product by id : ${id}`);
};

// PUT /Products/:id
export const updateProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`update product ${id}`);
};

// DELETE /Products/:id
export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`delete product ${id}`);
};
