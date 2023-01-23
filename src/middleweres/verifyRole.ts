import { NextFunction, Request, Response } from "express";

export const verifyRole = (accessRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (role?.toLowerCase() !== accessRole.toLowerCase()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
};
