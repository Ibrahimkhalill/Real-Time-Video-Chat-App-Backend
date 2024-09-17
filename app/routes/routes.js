const FaqController = require("../controllers/FaqController"); // Adjust the path as needed

// Adjust the path as needed
const router = require("express").Router();

// Create a new FAQ
router.post("/api/carete/room", FaqController.CreateRoom);


//status route


// Export the router
module.exports = router;
