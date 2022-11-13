import mongoose from "mongoose";
import { format } from "date-fns";
import { productsSchema } from "./products.schema";

const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: format(new Date(), "dd-MM-yyyy\tHH:mm:ss"),
    },
    orderType: {
      type: String,
      required: true,
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
  }
);

const OrdersModel = mongoose.model("orders", ordersSchema);

export default OrdersModel;
