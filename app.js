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

const baseInfo = `You are a helpful assistant for KS Store (KSS), a sports and athletic gear shop. Keep answers short, friendly, and in plain text only. Never use asterisks, markdown, bold, bullet points, emojis, or any special formatting. Write in clean plain sentences only.

Store info:
- Georgia store website: kss.ge
- Worldwide store website: ksstore.ge
- Payment: Visa, Mastercard, Apple Pay, Google Pay, crypto
- Contact: Instagram @_kss.ge, Facebook: KSS.GE.Official, TikTok: @ks__store
- Brands: RDX, Asics, Venum, Everlast, Green Hill, Adidas, Nike, Rivals, Winning, STONEHEART
- Categories: MMA, Boxing, Gloves, Muay Thai, Venum, Bags, F1 Clothing, STONEHEART, KS-BASKET, UFC T-Shirts, Shoes
- Popular products: Venum Elite Boxing Gloves 110₾, Everlast 1910 Boxing Gloves 250₾, Adidas 221-HVC 2 320₾, Nike HyperKO 2 370₾, UFC Backpack 180₾, Compression Shorts 40₾, Asics Wrestling Shoes 215₾. Always use the ₾ symbol for prices, never write GEL.
- Delivery time: minimum 10-12 business days, maximum 10-18 business days. Times may vary due to customs, holidays, or warehouse processing.
- Size selection: customers should check the size chart on each product page. If unsure, contact our live support team for help before ordering.
- Order tracking: contact our live support team directly for order updates and tracking info.
- Support team can help with: size recommendations, order updates, delivery info, product questions, international orders, and general assistance.
- Keep answers under 3 sentences. Never repeat the same information twice in the same response. Never mention the website URL more than once per response.;
- For anything else direct to Instagram @_kss.ge`;

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
        system: baseInfo + ' You are on the GEORGIA store (kss.ge). Only talk about Georgia delivery. Always tell customers to order through kss.ge. Never mention ksstore.ge to Georgia customers. Use the ₾ symbol for all prices.',
        messages: req.body.messages
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/chat-global', async (req, res) => {
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
        system: baseInfo + ' You are on the WORLDWIDE store (ksstore.ge). Only talk about worldwide/international delivery. Always tell customers to order through ksstore.ge. Never mention kss.ge to worldwide customers. Use the ₾ symbol for all prices.',
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
