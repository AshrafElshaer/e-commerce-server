import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categories.controller";
import verifyJWT from "../middleweres/verifyJWT";

const router = express.Router();

router
  .get("/", getAllCategories)
  .post("/", verifyJWT, createCategory)
  .get("/:categoryName", getCategory)
  .put("/:categoryName", verifyJWT, verifyJWT, updateCategory)
  .delete("/:categoryName", verifyJWT, deleteCategory);

export default router;
