const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const session = require("express-session");
const { sequelize } = require("./app/models/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const uploadRoute = require("./app/routes/routes");
const { Live } = require("./app/models/index");
const app = express();
const server = http.createServer(app);

var corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000"], 
};
app.use(cors(corsOptions));

sequelize
  .sync({ force: false }) // Set force to true to drop existing tables
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.use(bodyParser.json());
// Session store setup
const sessionMiddleware = session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set `secure: true` if using HTTPS
});
app.use(sessionMiddleware);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust to match your React app's port
    methods: ["GET", "POST"],
  },
});

// Middleware to access session in Socket.IO
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

let participants = []; // Manage rooms and participants

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle room creation
  socket.on("createRoom", (roomData) => {
  
    io.emit("newRoomNotification", roomData);
  });



  socket.on("requestRoomLink", async () => {
    try {
      // Perform your asynchronous operation here
      const data = await Live.findAll();

      // Emit the event with the result
      socket.emit("roomLink", { data });
    } catch (error) {
      console.error("Error fetching room link:", error);

      // Optionally emit an error event
      socket.emit("error", { message: "Failed to fetch room link." });
    }
  });

  // Handle participant join
  socket.on("join room", ({ userName, roomId, role }) => {
    console.log("Join room:", userName, roomId, role);

    // Ensure the room exists
    const existingParticipant = participants.find(
      (p) => p.userName === userName
    );

    if (!existingParticipant) {
      // Add the new participant
      participants.push({
        userName: userName,
        userId: socket.id,
        roles: role,
        roomId: roomId,
      });
    }

    socket.join(roomId);

    // Find the admin in the room (assuming there's only one admin per room)
    const admin = participants.find(
      (p) => p.roles === "admin" && p.roomId === roomId
    );

    // Emit the participant joined event to everyone in the room
    io.to(roomId).emit("participant joined", participants);
    // If the joining user is NOT an admin, notify the admin only
    if (role !== "admin" && admin) {
      console.log("Notifying admin of new participant:", userName);
      io.to(admin.userId).emit("notify admin", { newParticipant: userName });
    }
  });

  // Handle chat messages
  socket.on("chat message", ({ userName, message, roomId }) => {
    io.to(roomId).emit("chat message", { userName, message });
  });

  socket.on("adminLeft", (roomId) => {
    io.to(roomId).emit("adminLeft", roomId);
  });

  // Handle participant leave
  socket.on("disconnect", () => {
    
    const admin = participants.find(
      (p) => p.roles === "admin" && p.userId === socket.id
    );
    console.log("admin", admin);
    // Remove participant from all rooms
    if (admin) {
      io.to(admin.roomId).emit("adminLeft", admin.roomId);
    }
    participants = participants.filter((p) => p.userId !== socket.id);
    io.emit("participant left", participants);
  });
});

app.use("/", uploadRoute);

server.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
