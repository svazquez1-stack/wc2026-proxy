const express = require('express');
const fetch   = require('node-fetch');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/*', async (req, res) => {
  const apiUrl = 'https://api.football-data.org/v4/' + req.params[0] + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
  try {
    const response = await fetch(apiUrl, {
      headers: { 'X-Auth-Token': process.env.API_TOKEN || '' }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log('Proxy corriendo en puerto ' + PORT));
