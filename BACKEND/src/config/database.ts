import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl: string = process.env.MONGO_URL;

export async function connectDb() {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}
