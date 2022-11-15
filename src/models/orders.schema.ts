import mongoose from "mongoose";
import { format } from "date-fns";
import { productsSchema, TProduct } from "./products.schema";

const Schema = mongoose.Schema;

export type TOrder = {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  customerId: string;
  items: TProduct[];
  status: string;
  total: number;
};

const ordersSchema = new Schema({
  createdAt: {
    type: Date,
    default: format(new Date(), "dd-MM-yyyy\tHH:mm:ss"),
  },
  customerId: {
    type: String,
    required: true,
  },
  items: {
    type: [productsSchema],
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
