import Trek from "../models/Trek.js";

export const getTreks = async (req, res) => {
  const treks = await Trek.find();
  res.json(treks);
};

export const addTrek = async (req, res) => {
  try {
    const trek = new Trek(req.body);
    await trek.save();
    res.json({ success: true, trek });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateTrek = async (req, res) => {
  try {
    await Trek.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteTrek = async (req, res) => {
  try {
    await Trek.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
