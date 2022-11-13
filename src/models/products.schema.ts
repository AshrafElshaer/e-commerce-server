import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const productsSchema = new Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new: {
    type: Boolean,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  includes: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      item: {
        type: String,
        required: true,
      },
    },
  ],
  gallery: [String],
  count: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
});

const ProductsModel = mongoose.model("products", productsSchema);

export default ProductsModel;
