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
  .get("/", verifyRole("admin"), getAllusers)
  .get("/:id", verifyRole("admin"), getuser)
  .put("/:id", verifyRole("admin"), updateUser)
  .delete("/:id", verifyRole("admin"), deleteuser);

export default router;
