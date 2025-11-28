// src/db/index.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;   // 👈 must be MONGODB_URI
    if (!uri) {
      console.error("❌ MONGODB_URI is missing");
      process.exit(1);
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MONGODB connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
