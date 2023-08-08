const PORT = process.env.PORT || 3001;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();

app.listen(PORT, () => console.log('Server has updated and is running on Port ' + PORT));

// OpenAI API
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_CHATGPT_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/images', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.createImage({
      prompt: message,
      n: 1,
      size: '512x512',
    });

    console.log("backend data" + response.data[0]);
    res.send(response.data);
  } catch (error) {
    console.error('An error has occurred while obtaining AI data');
    console.log("Error");
  }
});