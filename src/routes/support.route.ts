import express from "express";
import type { Request, Response } from "express";
import MessageModel from "../models/message.schema";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const message = req.body;
  try {
    await MessageModel.create(message);
    res.json({ message: " Your messgae was sent you hear from us shortly" });
  } catch (err: any) {
    res.json({ message: err.message });
  }
});

export default router;
