require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
