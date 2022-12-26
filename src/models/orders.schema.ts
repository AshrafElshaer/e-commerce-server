import mongoose from "mongoose";
import { format } from "date-fns";
import { productsSchema, TProduct } from "./products.schema";

const Schema = mongoose.Schema;

// export type TOrder = {
//   _id: mongoose.Types.ObjectId;
//   createdAt: Date;
//   customerId: string;
//   items: TProduct[];
//   status: string;
//   total: number;
// };
// export type TCartItemState = {
//   _id: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// };

const ordersSchema = new Schema({
  createdAt: {
    type: Date,
    default: format(new Date(), "dd-MM-yyyy\tHH:mm:ss"),
  },
  customer: {
    _id: {
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
      suite: {
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
});

const OrdersModel = mongoose.model("orders", ordersSchema);

export default OrdersModel;
