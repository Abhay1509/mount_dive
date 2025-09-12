import mongoose from "mongoose";

const trekSchema = new mongoose.Schema(
  {
    name: String,
    difficulty: String,
    price: Number,
    description: String,
    duration: String,
    location: String,
  },
  { timestamps: true }
);

const Trek = mongoose.model("Trek", trekSchema);
export default Trek;
