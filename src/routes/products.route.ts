import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller";
const router = express.Router();

router
  .get("/", getAllProducts)
  .post("/", createProduct)
  .get("/:id", getProduct)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);

export default router;
