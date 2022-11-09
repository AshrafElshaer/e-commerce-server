import { Request, Response } from "express";

// GET /users
export const getAllusers = (req: Request, res: Response) => {
  res.send("GET all users");
};


// GET /users/:id
export const getuser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(`get user by id : ${id}`);
};

// PUT /users/:id
export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`update user ${id}`);
};

// DELETE /users/:id
export const deleteuser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`delete user ${id}`);
};
