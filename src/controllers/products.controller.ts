import { Request, Response } from "express";
import CategoriesModel, { TCategory } from "../models/categories.schema";
import { TProduct } from "../models/products.schema";

// GET /Products
export const getAllProducts = async (req: Request, res: Response) => {
  const allProducts: TProduct[] = [];
  try {
    const allCategoreis: TCategory[] = await CategoriesModel.find().lean();
    allCategoreis.map((category) =>
      category.products.map((product) => {
        allProducts.push(product);
      })
    );
    res.json(allProducts);
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// POST /Products
export const createProduct = async (req: Request, res: Response) => {
  const { category, product } = req.body;

  try {
    const foundCategory = await CategoriesModel.findOne({
      category,
    }).exec();
    if (!foundCategory)
      return res
        .status(404)
        .json({ message: `Category ${category} not found` });
    foundCategory.products.push(product);
    const result = await foundCategory.save();
    res.json(result);
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// GET /Products/:id
export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const allProducts: TProduct[] = [];
  try {
    const allCategoreis: TCategory[] = await CategoriesModel.find().lean();
    allCategoreis.map((category) =>
      category.products.map((product) => {
        allProducts.push(product);
      })
    );
    const product = allProducts.find(item => item._id.toString() === id)
    res.json(product);
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

// PUT /Products/:id
export const updateProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`update product ${id}`);
};

// DELETE /Products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  try {
    const foundCategory = await CategoriesModel.findOne({
      category: categoryName,
    }).exec();

    foundCategory?.products.filter((product) => product._id?.toHexString() !== id);

    await foundCategory?.save();
    res.json({ message: `Product ${id} has been deleted` });
  } catch (error: any) {
    res.json({ messgae: error.message });
  }
};
