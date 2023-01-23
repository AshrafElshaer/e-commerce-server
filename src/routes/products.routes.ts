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
  .get("/", verifyJWT, verifyRole("admin"), getAllProducts)
  .post("/", verifyJWT, verifyRole("admin"), createProduct)
  .get("/:id", getProduct)
  .put("/:id", verifyJWT, verifyRole("admin"), updateProduct)
  .delete("/:id", verifyJWT, verifyRole("admin"), deleteProduct);

export default router;
