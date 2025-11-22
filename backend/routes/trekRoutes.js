import express from "express";
import Trek from "../models/Trek.js";

const router = express.Router();

/* ============================================================
   GET ALL TREKS
   @route   GET /api/treks
============================================================ */
router.get("/", async (req, res) => {
  try {
    const treks = await Trek.find().sort({ createdAt: -1 });
    res.status(200).json(treks);
  } catch (error) {
    console.error("❌ Error fetching treks:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ============================================================
   GET SINGLE TREK
   @route   GET /api/treks/:id
============================================================ */
router.get("/:id", async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id);

    if (!trek) {
      return res.status(404).json({ message: "Trek not found" });
    }

    res.status(200).json(trek);
  } catch (error) {
    console.error("❌ Error fetching trek:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ============================================================
   ADD TREK
   @route   POST /api/treks
============================================================ */
router.post("/", async (req, res) => {
  try {
  //  console.log("📥 Incoming Trek Data:", req.body);  // Debug log

    const trek = new Trek(req.body);   // Let mongoose handle validation
    const saved = await trek.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Validation Error:", error); // Full error log

    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors,
    });
  }
});


/* ============================================================
   UPDATE TREK
   @route   PUT /api/treks/:id
============================================================ */
router.put("/:id", async (req, res) => {
  try {
    const updatedTrek = await Trek.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
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
   DELETE TREK
   @route   DELETE /api/treks/:id
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
