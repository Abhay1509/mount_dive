import Booking from "../models/Booking.js";

export const saveBooking = async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, user: req.user._id });
    await booking.save();
    res.json({ success: true, message: "Booking saved!", booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate("user", "name email");
  res.json(bookings);
};
