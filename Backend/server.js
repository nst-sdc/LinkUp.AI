import dotenv from "dotenv";
import axios from "axios";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const users = {};

const getUserList = () => {
  return Object.keys(users).map(id => ({
    id,
    username: users[id],
  }));
};

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("join", (username) => {
    users[socket.id] = username;
    console.log(`User ${username} joined with socket ID: ${socket.id}`);
    
    io.emit("userList", getUserList());
    io.emit("message", {
      user: "System",
      text: `${username} has joined the chat`,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("sendMessage", (message) => {
    io.emit("message", {
      user: users[socket.id],
      text: message,
      time: new Date().toLocaleTimeString()
    });
  });

  socket.on("private message", ({ recipientId, message }) => {
    const sender = users[socket.id];
    
    if (users[recipientId]) {
      io.to(recipientId).emit("private message", {
        sender,
        senderId: socket.id,
        message,
        time: new Date().toLocaleTimeString(),
        isSelf: false
      });

      socket.emit("private message", {
        sender,
        senderId: socket.id,
        recipientId,
        message,
        time: new Date().toLocaleTimeString(),
        isSelf: true,
      });
    } else {
      socket.emit("error", "User not found or offline");
    }
  });

  socket.on("request users", () => {
    socket.emit("userList", getUserList());
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id];
      console.log(`User ${username} disconnected`);
      
      io.emit("userList", getUserList());
      io.emit("message", {
        user: "System",
        text: `${username} has left the chat`,
        time: new Date().toLocaleTimeString(),
      });
    }
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Initialize Google Generative AI
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/tech-news", async (req, res) => {
  const query = req.query.q || "technology";
  
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

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });
  
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    if (!text) {
      return res.status(500).json({ error: "Gemini returned no response" });
    }
    
    res.json({ response: text });
  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    res.status(500).json({ error: "Gemini API error" });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;