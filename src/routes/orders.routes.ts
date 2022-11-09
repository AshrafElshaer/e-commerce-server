import express from "express";
import {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.controller";

const router = express.Router();

router
  .get("/", getAllOrders)
  .post("/", createOrder)
  .get("/:id", getOrder)
  .put("/:id", updateOrder)
  .delete("/:id", deleteOrder);

export default router;
