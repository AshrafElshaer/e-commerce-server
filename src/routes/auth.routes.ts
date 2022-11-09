import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", loginUser).post("/register", registerUser);

export default router;
