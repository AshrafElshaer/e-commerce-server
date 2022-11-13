import mongoose from "mongoose";
import { productsSchema } from "./products.schema";

const Schema = mongoose.Schema;

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
  },
});

const CategoriesModel = mongoose.model("categories", categoriesSchema);

export default CategoriesModel;
