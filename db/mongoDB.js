import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database Connected Successfully!");
  } catch (err) {
    console.log("Database Error!");
    console.log("Error : ", err);
  }
};

export default connectMongoDB;
