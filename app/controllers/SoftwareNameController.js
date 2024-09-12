const { SoftwareName } = require("../models/index");

async function getSoftwareName(req, res) {
  try {
    // Your code here
    const data = await SoftwareName.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Export each function individually
module.exports = {
    getSoftwareName,
};
