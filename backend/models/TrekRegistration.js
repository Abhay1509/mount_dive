import mongoose from "mongoose";

const trekkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  height: Number,
  weight: Number,
  medical: { type: String, default: "No" },
  file: { type: String }, 
});

const trekRegistrationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trekId: { type: String, required: true },
    trekkers: [trekkerSchema],
  },
  { timestamps: true }
);

export default mongoose.model("TrekRegistration", trekRegistrationSchema);
