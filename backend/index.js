const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.BDCONECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.model("Url", urlSchema);

app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const { nanoid } = await import("nanoid");
  const shortId = nanoid(10);
  const shortUrl = `http://localhost:5000/${shortId}`;

  const newUrl = new Url({ originalUrl, shortUrl });
  await newUrl.save();

  res.json({ originalUrl, shortUrl });
});
app.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find({});
    res.json(urls);
  } catch (error) {
    console.error("Error retrieving URLs:", error);
    res.status(500).json({ error: "Error retrieving URLs" });
  }
});

app.delete("/urls/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const url = await Url.findByIdAndDelete(id);
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({ error: "Error deleting URL" });
  }
});

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({
    shortUrl: `http://localhost:5000/${shortId}`,
  });

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).json("URL not found");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
