const request = require("request");
const fs = require("fs");
const path = require("path");
const videoFilePath = path.join(__dirname, "../../Video/AI Animation Generator _ Create YOUR OWN 3D Movie With AI.mp4");

// Function to upload a video and get the video ID
const uploadVideo = (videoFilePath) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      url: "https://dev.vdocipher.com/api/videos",
      headers: {
        Authorization: "Apisecret TAX8PidRLkTeWCCpQDlfyY7o4XDMZQovgkM35N4R04zfRzh5ZAcLeWpsLUep0jfC",
      },
      formData: {
        file: {
          value: fs.createReadStream(videoFilePath),
          options: {
            filename: path.basename(videoFilePath),
            contentType: null,
          },
        },
      },
    };

    request(options, (error, response, body) => {
      if (error) return reject(error);
      
      if (response.statusCode !== 200) {
        return reject(`Failed to upload video. Status code: ${response.statusCode}`);
      }

      try {
        const videoData = JSON.parse(body);
        resolve(videoData.videoId);
      } catch (parseError) {
        reject(`Error parsing response: ${parseError}`);
      }
    });
  });
};

// Function to upload a single video
const uploadSingleVideo = async () => {
  try {
    const videoId = await uploadVideo(videoFilePath);
    console.log(`Uploaded video ID: ${videoId}`);
    return videoId;
  } catch (error) {
    console.error("Error uploading video:", error);
  }
};

// Call the function to upload a single video


module.exports = {
  uploadVideo,
  uploadSingleVideo
};
