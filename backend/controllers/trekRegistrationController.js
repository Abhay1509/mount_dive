import TrekRegistration from "../models/TrekRegistration.js";

// ✅ Save Trekker Details
export const registerTrekkers = async (req, res) => {
  try {
    console.log("📥 Incoming Body:", req.body);

    const { userId, trekId, trekkers } = req.body;

    if (!userId || !trekId || !trekkers || trekkers.length === 0) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const newRegistration = new TrekRegistration({
      userId,
      trekId,
      trekkers,
    });

    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: "Trekkers registered successfully",
      data: newRegistration,
    });
  } catch (error) {
    console.error("❌ Error saving trek registration:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
