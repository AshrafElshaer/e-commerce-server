import express from "express";
import {
  getAllusers,
  getuser,
  updateUser,
  deleteuser,
} from "../controllers/users.controller";
import verifyJWT from "../middleweres/verifyJWT";
import { verifyRole } from "../middleweres/verifyRole";

const router = express.Router();

router
  .get("/", verifyJWT, verifyRole("admin"), getAllusers)
  .get("/:id", verifyJWT, verifyRole("admin"), getuser)
  .put("/:id", verifyJWT, verifyRole("admin"), updateUser)
  .delete("/:id", verifyJWT, verifyRole("admin"), deleteuser);

export default router;
