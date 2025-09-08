const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

app.get('/api/price/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vs_currency = req.query.vs_currency || 'usd';
    const response = await axios.get(`${COINGECKO_BASE}/simple/price`, {
      params: { ids: id, vs_currencies: vs_currency, include_24hr_change: true }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch price' });
  }
});

app.get('/api/market_chart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vs_currency = req.query.vs_currency || 'usd';
    const days = req.query.days || '30';
    const response = await axios.get(`${COINGECKO_BASE}/coins/${id}/market_chart`, {
      params: { vs_currency, days }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch market chart' });
  }
});

app.get('/api/coins/list', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE}/coins/list`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch coins list' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
