require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// ── General middleware ────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Serve the static frontend files ──────────────────
app.use(
  express.static(path.join(__dirname, '..'), {
    setHeaders(res, filePath) {
      const lower = filePath.toLowerCase();
      if (lower.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      } else if (lower.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (lower.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (lower.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
    },
  })
);

// ── API Routes ────────────────────────────────────────
app.use('/api/products', require('./routes/products'));

// Portfolio mode: ecommerce endpoints disabled
const portfolioMsg =
  'Portfolio mode — contact openrize@gmail.com or +1 (224) 377 9043 for pricing.';
app.post('/api/checkout', (req, res) => {
  res.status(410).json({ success: false, error: portfolioMsg });
});
app.get('/api/checkout/session/:id', (req, res) => {
  res.status(410).json({ success: false, error: portfolioMsg });
});
app.all('/webhook', (req, res) => {
  res.status(410).send('Not available');
});

// ── Health check ──────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PlayJoy Toys server is running 🧸' });
});

// ── Fallback: send index.html for all other routes ────
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── Start server ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🧸 PlayJoy Toys server running at http://localhost:${PORT}`);
  console.log(`   - Frontend:   http://localhost:${PORT}`);
  console.log(`   - Products:   http://localhost:${PORT}/api/products`);
  console.log(`\n   Mode: portfolio (checkout disabled)\n`);
});
