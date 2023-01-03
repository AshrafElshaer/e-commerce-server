import mongoose from "mongoose";

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
  role: string;
};
export const userSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
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
  },
  address: {
    street: {
      type: String,
    },

    city: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  orders: {
    type: [String],
    default: [],
  },
  role: { type: String, default: "User" },
  refreshToken: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
