require('dotenv').config();
const API_KEY = process.env.API_KEY;
// Import dependencies
const express = require('express');
const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config();

// Set up Express
const app = express();
app.use(express.static('public'));
app.use(express.json());

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

// Serve homepage (this will be an HTML file)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// AI Image Generation Route
app.post('/generate-image', async (req, res) => {
  try {
    const prompt = req.body.prompt; // The description for the image generation
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });
    const imageUrl = response.data[0].url; // Get the generated image URL
    res.json({ imageUrl }); // Return the image URL as a response
  } catch (error) {
    res.status(500).json({ error: 'Error generating image' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
