import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type TProduct = {
  _id: mongoose.Types.ObjectId;
  slug: string;
  name: string;
  image: string;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: [
    {
      quantity: number;
      item: string;
    }
  ];
  gallery: string[];
  count: number;
  sold: number;
};

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

// const ProductsModel = mongoose.model("products", productsSchema);

// export default ProductsModel;
