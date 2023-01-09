import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const MessageModel = mongoose.model("support", messageSchema);

export default MessageModel;
