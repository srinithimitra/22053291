// average-calculator/server.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;
const windowSize = 10;
const window = [];

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  let apiUrl;

  switch (numberid) {
    case 'p':
      apiUrl = 'http://20.244.56.144/evaluation-service/primes';
      break;
    case 'f':
      apiUrl = 'http://20.244.56.144/evaluation-service/fibo';
      break;
    case 'e':
      apiUrl = 'http://20.244.56.144/evaluation-service/even';
      break;
    case 'r':
      apiUrl = 'http://20.244.56.144/evaluation-service/rand';
      break;
    default:
      return res.status(400).send({ error: 'Invalid numberid' });
  }

  const windowPrevState = [...window];
  let numbers = [];

  try {
    const response = await axios.get(apiUrl, { timeout: 500 }); // Set timeout
    numbers = response.data.numbers;

    numbers.forEach((num) => {
      if (!window.includes(num)) {
        if (window.length < windowSize) {
          window.push(num);
        } else {
          window.shift(); // Remove oldest
          window.push(num);
        }
      }
    });

    const avg = window.reduce((sum, num) => sum + num, 0) / window.length;

    res.send({
      windowPrevState: windowPrevState,
      windowCurrState: [...window],
      numbers: numbers,
      avg: avg.toFixed(2),
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).send({ error: 'API request failed' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
