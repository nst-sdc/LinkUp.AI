const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Change to your frontend URL
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Store active users
const users = {};

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle new user joining
  socket.on('join', (username) => {
    users[socket.id] = username;
    io.emit('userList', Object.values(users));
    io.emit('message', {
      user: 'System',
      text: `${username} has joined the chat`,
      time: new Date().toLocaleTimeString()
    });
  });

  // Handle incoming messages
  socket.on('sendMessage', (message) => {
    io.emit('message', {
      user: users[socket.id],
      text: message,
      time: new Date().toLocaleTimeString()
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id];
      io.emit('userList', Object.values(users));
      io.emit('message', {
        user: 'System',
        text: `${username} has left the chat`,
        time: new Date().toLocaleTimeString()
      });
    }
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});