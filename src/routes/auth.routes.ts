import express from "express";
import { handleRefreshToken, loginUser, registerUser } from "../controllers/auth.controller";

const router = express.Router();

router
  .post("/login", loginUser)
  .post("/register", registerUser)
  .post("/refresh", handleRefreshToken);

export default router;
