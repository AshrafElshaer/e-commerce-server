import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  JWT.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) return res.status(403).json({ err });
      /* @ts-ignore */
      if (decoded) req.email = decoded.email;

      next();
    }
  );
};

export default verifyJWT;
