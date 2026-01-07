export const getTreks = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Treks fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
