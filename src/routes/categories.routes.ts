import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller";

const router = express.Router();

router
  .get("/", getAllCategories)
  .post("/", createCategory)
  // .get("/:categoryName")
  .put("/:categoryName", updateCategory)
  .delete("/:categoryName", deleteCategory);

export default router;
