const cron = require('node-cron');
const { Op } = require('sequelize');
const {Live} = require('../models/index'); // Adjust the path based on your project structure

// This job will run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    // Calculate the time 24 hours ago
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getMinutes() - 10);

    // Delete records older than 24 hours
    await Live.destroy({
      where: {
        createdAt: {
          [Op.lt]: oneDayAgo, // Records older than 24 hours
        },
      },
    });

    console.log("Old live rooms deleted successfully every 5 minutes");
  } catch (error) {
    console.error("Error deleting old live rooms:", error);
  }
});
