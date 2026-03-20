const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const fs = require('fs');

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');

function getProducts() {
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
}

// POST /api/checkout — Create a Stripe Checkout Session
router.post('/', async (req, res) => {
  try {
    const { items } = req.body; // items: [{ id, qty }]

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart is empty.' });
    }

    const catalog = getProducts();

    // ── Server-side price verification (CRITICAL for security) ──────────────
    // We NEVER trust the price sent from the browser.
    // We look up every item in our catalog and use our price, not theirs.
    const lineItems = [];
    for (const cartItem of items) {
      const product = catalog.find(p => p.id === cartItem.id);
      if (!product) {
        return res.status(400).json({
          success: false,
          error: `Product "${cartItem.id}" not found.`
        });
      }

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.fullName || product.name,
            images: product.image ? [product.image] : [],
            metadata: { product_id: product.id }
          },
          // Stripe uses cents (multiply dollars × 100)
          unit_amount: Math.round(product.price * 100)
        },
        quantity: cartItem.qty || 1
      });
    }

    // ── Create the Stripe Checkout Session ──────────────────────────────────
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU']
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Standard Shipping (5-7 days)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 }
            }
          }
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 999, currency: 'usd' },
            display_name: 'Express Shipping (2-3 days)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 3 }
            }
          }
        }
      ],
      success_url: `${process.env.FRONTEND_URL}/order-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart.html`,
      metadata: {
        source: 'playjoytoys_website'
      }
    });

    res.json({ success: true, url: session.url });

  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
