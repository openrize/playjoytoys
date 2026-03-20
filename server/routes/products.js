const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');

// Load products from JSON file
function getProducts() {
  const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  return JSON.parse(raw);
}

// GET /api/products — list all products (with optional filters)
router.get('/', (req, res) => {
  try {
    let products = getProducts();

    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      products = products.filter(p => p.category === req.query.category);
    }

    // Filter by age range
    if (req.query.age && req.query.age !== 'all') {
      products = products.filter(p => p.ageRange === req.query.age);
    }

    // Filter by search query
    if (req.query.q) {
      const q = req.query.q.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.fullName && p.fullName.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (req.query.sort) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'bestselling':
      default:
        products.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    res.json({
      success: true,
      total: products.length,
      products
    });
  } catch (err) {
    console.error('Error loading products:', err);
    res.status(500).json({ success: false, error: 'Failed to load products' });
  }
});

// GET /api/products/:id — single product
router.get('/:id', (req, res) => {
  try {
    const products = getProducts();
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to load product' });
  }
});

module.exports = router;
