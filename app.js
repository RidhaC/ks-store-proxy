const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 500,
        system: `You are a helpful assistant for KS Store (KSS), a sports and athletic gear shop in Georgia (the country). Keep answers short and friendly. Website: kss.ge. Delivery: Georgia only, takes a few weeks, no international shipping. Payment: Visa, Mastercard, Apple Pay, Google Pay, crypto. Contact: Instagram @_kss.ge, Facebook: KSS.GE.Official, TikTok: @ks__store. Brands: RDX, Asics, Venum, Everlast, Green Hill, Adidas, Nike, Rivals, Winning, STONEHEART. Categories: MMA, Boxing, Gloves, Muay Thai, Venum, Bags, F1 Clothing, STONEHEART, KS-BASKET, UFC T-Shirts, Shoes. Popular products: Venum Elite Boxing Gloves 110₾, Everlast 1910 Boxing Gloves 250₾, Adidas 221-HVC 2 320₾, Nike HyperKO 2 370₾, UFC Backpack 180₾, Compression Shorts 40₾, Asics Wrestling Shoes 215₾. Sales page: kss.ge/sales. For anything else direct to Instagram @_kss.ge.`,
        messages: req.body.messages
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);