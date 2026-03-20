const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');
const path = require('path');

const ORDERS_FILE = path.join(__dirname, '..', 'db', 'orders.json');

function readOrders() {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
}

function saveOrder(order) {
  const orders = readOrders();
  orders.push(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

// POST /webhook — Stripe sends order-confirmed events here
// Note: This route uses express.raw() (set in index.js) for signature verification
router.post('/', (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  // ── Verify the webhook signature ─────────────────────────────────────────
  // This prevents anyone from spoofing a fake "payment succeeded" event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ── Handle the event ──────────────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Build order record
    const order = {
      orderId: session.id,
      orderNumber: `PJ-${Date.now()}`,
      status: 'paid',
      paidAt: new Date().toISOString(),
      amountTotal: (session.amount_total / 100).toFixed(2),
      currency: session.currency.toUpperCase(),
      customerEmail: session.customer_details?.email || 'N/A',
      customerName: session.customer_details?.name || 'N/A',
      shippingAddress: session.shipping_details?.address || {},
      paymentStatus: session.payment_status
    };

    saveOrder(order);

    console.log(`\n✅ Order ${order.orderNumber} placed!`);
    console.log(`   Customer: ${order.customerName} (${order.customerEmail})`);
    console.log(`   Total: $${order.amountTotal}\n`);
  }

  // Acknowledge receipt
  res.json({ received: true });
});

// GET /webhook/orders — Simple admin endpoint to view all orders
router.get('/orders', (req, res) => {
  // Basic protection: require a hardcoded admin key in production
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'playjoyadmin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const orders = readOrders();
  res.json({ success: true, total: orders.length, orders });
});

module.exports = router;
