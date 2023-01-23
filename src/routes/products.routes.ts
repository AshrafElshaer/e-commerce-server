import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller";
import verifyJWT from "../middleweres/verifyJWT";
import { verifyRole } from "../middleweres/verifyRole";
const router = express.Router();

router
  .get("/", verifyRole("admin"), getAllProducts)
  .post("/", verifyRole("admin"), createProduct)
  .get("/:id", getProduct)
  .put("/:id", verifyRole("admin"), updateProduct)
  .delete("/:id", verifyRole("admin"), deleteProduct);

export default router;
