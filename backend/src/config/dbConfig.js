import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";
dotenv.config();

// Database connection
const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB Connected!! DB Host: ${connectionString.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
