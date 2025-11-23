import mongoose from "mongoose";

// Itinerary for Day-wise Plan
const itinerarySchema = new mongoose.Schema({
  day: { type: String, required: true },          // "Day 1: Manali → Gulaba"
  details: { type: [String], required: true },    // ["Altitude: ...", "Trek Distance: ..."]
});

// Main Trek Schema
const trekSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },          // Trek Name
    type: { type: String, required: true },           // Hiking | Trekking | Camping | Mountaineering
    
    images: { type: [String], required: true },       // Multiple slider images
    location: { type: String, required: true },       // e.g. "Manali, Himachal Pradesh"

    price: { type: Number, required: true },          // e.g. 8999
    duration: { type: String, required: true },       // "4 Days / 3 Nights"
    difficulty: { type: String, required: true },     // "Easy", "Moderate", "Difficult"
    altitude: { type: String, required: true },       // "14,009 ft"
    bestSeason: { type: String, required: true },     // "May - October"

    description: { type: String, required: true },    // Full trek description text

    itinerary: {
      type: [itinerarySchema],                        // Day-wise details
      required: true,
    },
  },
  { timestamps: true }
);

const Trek = mongoose.model("Trek", trekSchema);
export default Trek;
