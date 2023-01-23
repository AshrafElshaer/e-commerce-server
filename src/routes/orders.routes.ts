import express from "express";
import {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.controller";
import { verifyRole } from "../middleweres/verifyRole";

const router = express.Router();

router
  .get("/", getAllOrders)
  .post("/", createOrder)
  .get("/:id", getOrder)
  .put("/:id", updateOrder)
  .delete("/:id", verifyRole("admin"), deleteOrder);

export default router;
