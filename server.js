// server.js
import express from 'express';
import fetch from 'node-fetch'; // Make sure to use an appropriate version or method for ESM
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

const API_KEY = '840cf5e060864315956a46fc8c886a7f'; // Use your actual API key
const BASE_URL = 'https://holidays.abstractapi.com/v1/';

app.post('/getHolidays', async (req, res) => {
  const { year, month, day, country } = req.body;
  const apiUrl = `${BASE_URL}?api_key=${API_KEY}&country=${country}&year=${year}&month=${month}&day=${day}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch holidays' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error when fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
