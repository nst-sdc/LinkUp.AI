const functions = require("firebase-functions")
const axios = require("axios");
const cors = require("cors")({ origin: true })

const NEWS_API_KEY = "030ce6b075a24a1facde747760bc98e3"

exports.getTechNews = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const query = req.query.q || "technology"

    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`
      );
      res.status(200).json(response.data)
    } catch (error) {
      console.error("Error fetching news:", error.message);
      res.status(500).json({ error: "Failed to fetch news" })
    }
  })
})