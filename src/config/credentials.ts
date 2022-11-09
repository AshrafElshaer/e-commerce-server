import { Request, Response, NextFunction } from "express";
import { allowedOrigins } from "./allowedOrgins";

export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};


