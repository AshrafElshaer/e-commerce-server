import { Request, Response } from "express";
import CategoriesModel from "../models/categories.schema";

// GET /categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoriesModel.find();
    res.json(categories);
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// GET /categories/:categoryName

export const getCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.params;

  try {
    const foundCategory = await CategoriesModel.findOne({
      category: categoryName,
    })
      .lean()
      .exec();

    if (!foundCategory)
      return res
        .status(404)
        .json({ message: `Category ${categoryName} is not found` });

    res.json(foundCategory);
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// POST /categories
export const createCategory = async (req: Request, res: Response) => {
  const category = req.body;
  if (!category.category || !category.categoryImage)
    return res.status(404).json({ messgae: "All fields are required" });
  try {
    const result = await CategoriesModel.create(category);
    res.status(201).json(result);
  } catch (error: any) {
    res.json({ message: error.message });
  }
};
// PUT /categories/:categoryName
export const updateCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.params;
  const { category, categoryImage } = req.body;
  try {
    const foundCategory = await CategoriesModel.findOne({
      category: categoryName,
    }).exec();
    if (!foundCategory)
      return res
        .status(404)
        .json({ message: `Category : ${category} not found` });
    foundCategory.category = category;
    foundCategory.categoryImage = categoryImage;

    await foundCategory.save();
    res.json({ message: `Category ${category} has been updated` });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// DELETE /categories/:categoryName
export const deleteCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.params;

  try {
    const foundCategory = await CategoriesModel.findOne({
      category: categoryName,
    }).exec();
    if (!foundCategory)
      return res
        .status(404)
        .json({ message: `Category : ${categoryName} not found` });

    const result = await foundCategory.delete();
    res.json({ message: `Category ${categoryName} has been deleted` });
  } catch (error: any) {
    res.json({ message: error.message });
  }
};
