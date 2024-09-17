const { Live } = require("../models/index");



// Function to upload a video and get the video ID

// Function to upload a single video
async function CreateRoom(req, res) {
  try {
    const roomData = req.body;

    const roomSaveData = await Live.create({
      live_link: roomData.live_link,
      live_name: roomData.live_name,
    });

    console.log("Data inserted successfully:", roomSaveData);
    res.status(200).json(roomSaveData);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Call the function to upload a single video

module.exports = {
  CreateRoom,
};
