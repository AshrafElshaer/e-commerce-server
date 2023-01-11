import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* @ts-ignore*/
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://radiant-marigold-3c2557.netlify.app"
  );

  next();
};
