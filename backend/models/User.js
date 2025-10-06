import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    // Either email OR phone can exist
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },

    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, // Admin flag
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
