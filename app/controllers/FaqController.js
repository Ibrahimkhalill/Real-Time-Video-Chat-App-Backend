const { Live } = require("../models/index");

// Function to upload a video and get the video ID

// Function to upload a single video
async function CreateRoom(req, res) {
  try {
    const roomData = req.body;
    const { live_link, live_name } = roomData;

    // Delete all existing rooms in the Live table
    await Live.deleteMany({});
    console.log("All previous rooms deleted");

    // Create the new room
    const roomSaveData = await Live.create({
      live_link,
      live_name,
    });

    console.log("New room created successfully:", roomSaveData);
    res.status(200).json(roomSaveData);
  } catch (error) {
    console.error("Error handling room creation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Call the function to upload a single video

module.exports = {
  CreateRoom,
};
