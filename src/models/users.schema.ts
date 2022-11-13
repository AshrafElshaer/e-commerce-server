import mongoose from "mongoose";
import { format } from "date-fns";

const Schema = mongoose.Schema;
export const userSchema = new Schema({
  createdAt: {
    type: Date,
    default: format(new Date(), "dd-MM-yyyy\tHH:mm:ss"),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
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
      type: String,
      required: true,
    },
  },
  orders: {
    type: [String],
    default:[],
  },
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
