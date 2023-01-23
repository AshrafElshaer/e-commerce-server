import express from "express";
import {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.controller";
import verifyJWT from "../middleweres/verifyJWT";
import { verifyRole } from "../middleweres/verifyRole";

const router = express.Router();

router
  .get("/", verifyJWT, getAllOrders)
  .post("/", verifyJWT, createOrder)
  .get("/:id", verifyJWT, getOrder)
  .put("/:id", verifyJWT, updateOrder)
  .delete("/:id", verifyJWT, verifyRole("admin"), deleteOrder);

export default router;
