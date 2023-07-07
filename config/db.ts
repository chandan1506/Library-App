import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
if (!process.env.mongoURL) {
    throw new Error("MongoDB connection URL is not set");
}
const connection = mongoose.connect(process.env.mongoURL);
export { connection };
