import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* @ts-ignore*/

  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");

  next();
};
