import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {});
  } catch (error) {
    console.error(error);
  }
};

export default connectDatabase;
