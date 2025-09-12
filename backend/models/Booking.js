import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    trekId: String,
    trekName: String,
    date: String,
    groupSize: Number,
    addons: Object,
    totalPrice: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link booking to user
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
