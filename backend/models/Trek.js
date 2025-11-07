import mongoose from "mongoose";

const trekSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Trek = mongoose.model("Trek", trekSchema);
export default Trek;
