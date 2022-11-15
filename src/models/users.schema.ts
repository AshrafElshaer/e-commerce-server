import mongoose from "mongoose";
import { format } from "date-fns";

const Schema = mongoose.Schema;

export type TUser = {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  orders: string[];
};
export const userSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
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
    default: [],
  },
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
