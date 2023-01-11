import { Request, Response, NextFunction } from "express";

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
{/* @ts-ignore*/}
  res.header("Access-Control-Allow-Credentials", true);

  next();
};
