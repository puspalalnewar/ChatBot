const express = require("express");
const router = express.Router();
const needle = require("needle");

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_VALUE = process.env.API_KEY_VALUE; // Just the value

router.post("/", async (req, res) => {
  try {
    // Add API key as query param
    const url = `${API_BASE_URL}?key=${API_KEY_VALUE}`;
    // Only send the fields Gemini expects
    const { contents } = req.body;
    const apiRes = await needle(
      "post",
      url,
      { contents },
      {
        headers: {
          "Content-Type": "application/json",
        },
        json: true,
      }
    );
    res.status(200).json(apiRes.body);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
