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
  origin: ["http://localhost:3001", "http://localhost:3000"], // Change this to your frontend's URL
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
    console.log("Room Created:", roomData);
    io.emit("newRoomNotification", roomData);
  });

  // Emit room details when the user connects
  // Assuming you're inside an async function or a socket event handler

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
  socket.on("join room", ({ userName, roomId }) => {
    console.log("Join room:", userName, roomId);

    // Ensure the room exists

    const existingParticipant = participants.find(
      (p) => p.userName === userName
    );

    if (!existingParticipant) {
      participants.push({ userName: userName, userId: socket.id });
    }

    socket.join(roomId);
    io.to(roomId).emit("participant joined", participants);
  });

  // Handle chat messages
  socket.on("chat message", ({ userName, message, roomId }) => {
    io.to(roomId).emit("chat message", { userName, message });
  });

  socket.on("adminLeft", (roomId) => {
    // Emit to all users in the room
    io.to(roomId).emit("adminLeft", roomId);
    console.log("Admin left", roomId);
  });
  console.log("participants", participants);
  // Handle participant leave
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    console.log("participants", participants);

    // Remove participant from all rooms

    participants = participants.filter((p) => p.userId !== socket.id);
    io.emit("participant left", participants);
  });
});

app.use("/", uploadRoute);

server.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
