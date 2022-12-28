import express from "express";
import {
  handleRefreshToken,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";

const router = express.Router();

router
  .post("/login", loginUser)
  .post("/register", registerUser)
  .post("/refresh", handleRefreshToken)
  .post("/logout", logoutUser);

export default router;
