import mongoose from "mongoose";
import { format } from "date-fns";
import { productsSchema } from "./products.schema";

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  customer: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipcode: {
        type: Number,
        required: true,
      },
    },
  },
  items: {
    type: [
      {
        _id: {
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
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },

  total: { type: Number, required: true },
  VAT: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
});

const OrdersModel = mongoose.model("orders", ordersSchema);

export default OrdersModel;
