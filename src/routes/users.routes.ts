import express from "express";
import {
  getAllusers,
  getuser,
  updateUser,
  deleteuser,
} from "../controllers/users.controller";

const router = express.Router();

router
  .get("/", getAllusers)
  .get("/:id", getuser)
  .put("/:id", updateUser)
  .delete("/:id", deleteuser);

export default router;
