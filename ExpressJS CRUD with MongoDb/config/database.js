
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
export function call(){
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ Database connected"))
.catch((err) => console.log("❌ Databasee connection error:", err));
}
