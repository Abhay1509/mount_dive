import express from "express";
import Trek from "../models/Trek.js";

const router = express.Router();

/* ============================================================
   @desc    Get all treks
   @route   GET /api/treks
   @access  Public
============================================================ */
router.get("/", async (req, res) => {
  try {
    const treks = await Trek.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(treks);
  } catch (error) {
    console.error("❌ Error fetching treks:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ============================================================
   @desc    Add a new trek
   @route   POST /api/treks
   @access  Admin (for now, open)
============================================================ */
router.post("/", async (req, res) => {
  try {
    const { title, image, description } = req.body;

    if (!title || !image) {
      return res.status(400).json({ message: "Title and image are required" });
    }

    const newTrek = new Trek({ title, image, description });
    const savedTrek = await newTrek.save();

    res.status(201).json(savedTrek);
  } catch (error) {
    console.error("❌ Error creating trek:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ============================================================
   @desc    Update a trek
   @route   PUT /api/treks/:id
   @access  Admin
============================================================ */
router.put("/:id", async (req, res) => {
  try {
    const { title, image, description } = req.body;
    const updatedTrek = await Trek.findByIdAndUpdate(
      req.params.id,
      { title, image, description },
      { new: true, runValidators: true }
    );

    if (!updatedTrek) {
      return res.status(404).json({ message: "Trek not found" });
    }

    res.status(200).json(updatedTrek);
  } catch (error) {
    console.error("❌ Error updating trek:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ============================================================
   @desc    Delete a trek
   @route   DELETE /api/treks/:id
   @access  Admin
============================================================ */
router.delete("/:id", async (req, res) => {
  try {
    const deletedTrek = await Trek.findByIdAndDelete(req.params.id);

    if (!deletedTrek) {
      return res.status(404).json({ message: "Trek not found" });
    }

    res.status(200).json({ message: "Trek deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting trek:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
