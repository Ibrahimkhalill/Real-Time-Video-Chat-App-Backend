const { Service } = require("../models/index");

async function getServiceData(req, res) {
  try {
    // Your code here
    const data = await Service.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Export each function individually
module.exports = {
    getServiceData,
};
