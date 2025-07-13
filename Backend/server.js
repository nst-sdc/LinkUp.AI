import dotenv from "dotenv";
import axios from "axios";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "https://link-up-ai-pearl.vercel.app",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());


const users = {};


io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);


  socket.on("private-messaging",(dd)=>{
    
  })


  socket.on('join', (username) => {
    users[socket.id] = username;
    io.emit('userList', Object.values(users));
    io.emit('message', {
      user: 'System',
      text: `${username} has joined the chat`,
      time: new Date().toLocaleTimeString()
    });
  });

  
  socket.on('sendMessage', (message) => {
    io.emit('message', {
      user: users[socket.id],
      text: message,
      time: new Date().toLocaleTimeString()
    });
  });

  
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



socket.on('private message', ({ recipientId, message }) => {
  const sender = users[socket.id];
  
  if (users[recipientId]) {
    
    io.to(recipientId).emit('private message', {
      sender: sender,
      senderId: socket.id,
      message: message,
      time: new Date().toLocaleTimeString()
    });
    
    
    socket.emit('private message', {
      sender: sender,
      senderId: socket.id,
      recipientId: recipientId,
      message: message,
      time: new Date().toLocaleTimeString(),
      isSelf: true
    });
  } else {
    socket.emit('error', 'User not found or offline');
  }
});


socket.on('request users', () => {
  const userList = Object.keys(users).map(id => ({
    id: id,
    username: users[id]
  }));
  socket.emit('user list', userList);
});
});
const PORT = process.env.PORT || 4000;
app.get("/",(req,res)=>{
  res.send("Server is running")

});
app.get("/tech-news", async (req, res) => {
  const query = req.query.q || "technology";
  res.send("tech-news")





  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${process.env.NEWS_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching tech news:", err.message);
    res.status(500).json({ error: "Failed to fetch tech news" });
  }
});


export default app;

server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)})
