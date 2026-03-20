require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// ── Stripe Webhook must receive raw body ──────────────
app.use('/webhook', express.raw({ type: 'application/json' }));

// ── General middleware ────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Serve the static frontend files ──────────────────
app.use(express.static(path.join(__dirname, '..')));

// ── API Routes ────────────────────────────────────────
app.use('/api/products', require('./routes/products'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/webhook', require('./routes/webhook'));

// ── Health check ──────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PlayJoy Toys server is running 🧸' });
});

// ── Fallback: send index.html for all other routes ────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── Start server ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🧸 PlayJoy Toys server running at http://localhost:${PORT}`);
  console.log(`   - Frontend:   http://localhost:${PORT}`);
  console.log(`   - Products:   http://localhost:${PORT}/api/products`);
  console.log(`   - Checkout:   http://localhost:${PORT}/api/checkout`);
  console.log(`\n   Stripe mode: ${process.env.STRIPE_SECRET_KEY?.startsWith('sk_live') ? '🟢 LIVE' : '🟡 TEST'}\n`);
});
