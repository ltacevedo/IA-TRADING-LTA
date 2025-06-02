const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/recomendaciones', async (req, res) => {
  try {
    // Simulación de obtención de datos de API real (puede ser Binance, Yahoo, AlphaVantage, etc.)
    const btcPrice = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const btc = btcPrice.data.bpi.USD.rate_float;

    const data = [
      {
        activo: "BTC/USDT",
        motivo: "Rompimiento de resistencia + volumen alto",
        precio_actual: btc,
        objetivo: btc * 1.04,
        stop_loss: btc * 0.97
      },
      {
        activo: "AAPL",
        motivo: "MACD cruzando al alza + soporte respetado",
        precio_actual: 192.2,
        objetivo: 205,
        stop_loss: 185
      },
      {
        activo: "YPF",
        motivo: "Patrón doble suelo + RSI bajo",
        precio_actual: 21,
        objetivo: 25,
        stop_loss: 19
      }
    ];
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener datos en tiempo real.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});