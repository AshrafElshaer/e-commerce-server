import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categories.controller";
import verifyJWT from "../middleweres/verifyJWT";
import { verifyRole } from "../middleweres/verifyRole";

const router = express.Router();

router
  .get("/", getAllCategories)
  .post("/", verifyJWT, verifyRole("admin"), createCategory)
  .get("/:categoryName", getCategory)
  .put("/:categoryName", verifyJWT, verifyRole("admin"), updateCategory)
  .delete("/:categoryName", verifyJWT, verifyRole("admin"), deleteCategory);

export default router;
