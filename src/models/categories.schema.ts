import mongoose from "mongoose";
import { productsSchema, TProduct } from "./products.schema";

const Schema = mongoose.Schema;
export type TCategory = {
  category: string;
  categoryImage: string;
  products: TProduct[];
};

const categoriesSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
    required: true,
  },
  products: {
    type: [productsSchema],
    default: [],
  },
});

const CategoriesModel = mongoose.model("categories", categoriesSchema);

export default CategoriesModel;
