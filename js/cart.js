/* ===== PLAYJOY TOYS - CART MODULE (cart.js) ===== */

const Cart = {
  init() { console.log("🛒 Cart module loaded"); },
  // ── Storage ──────────────────────────────────────
  get() {
    return JSON.parse(localStorage.getItem('pj_cart') || '[]');
  },
  save(items) {
    localStorage.setItem('pj_cart', JSON.stringify(items));
    Cart.updateBadge();
  },

  // ── CRUD ─────────────────────────────────────────
  add(product) {
    // product: { id, name, price, originalPrice, emoji, category }
    const items = Cart.get();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += (product.qty || 1);
    } else {
      items.push({ ...product, qty: product.qty || 1 });
    }
    Cart.save(items);
    Cart.showToast(`🛒 "${product.name}" added to cart!`);
    return items;
  },

  remove(id) {
    const items = Cart.get().filter(i => i.id !== id);
    Cart.save(items);
  },

  updateQty(id, qty) {
    const items = Cart.get();
    const item = items.find(i => i.id === id);
    if (item) {
      if (qty <= 0) {
        Cart.remove(id);
        return;
      }
      item.qty = qty;
      Cart.save(items);
    }
  },

  clear() {
    localStorage.removeItem('pj_cart');
    Cart.updateBadge();
  },

  // ── Totals ───────────────────────────────────────
  count() {
    return Cart.get().reduce((sum, i) => sum + i.qty, 0);
  },

  subtotal() {
    return Cart.get().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  // ── UI Helpers ───────────────────────────────────
  updateBadge() {
    const count = Cart.count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  showToast(msg) {
    // Remove existing toast
    document.querySelectorAll('.pj-toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'pj-toast';
    toast.innerHTML = msg;
    toast.style.cssText = `
      position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(20px);
      background:linear-gradient(135deg,#FF6B35,#c84b1a);
      color:white; padding:14px 28px; border-radius:50px;
      font-family:'Nunito',sans-serif; font-weight:800; font-size:0.95rem;
      box-shadow:0 8px 30px rgba(255,107,53,0.5);
      z-index:9999; opacity:0; transition:all 0.3s ease; white-space:nowrap;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
};

// ── Auto-init badge on page load ──────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (Cart.init) Cart.init();
  Cart.updateBadge();

  // Make cart icon clickable (go to cart page)
  document.querySelectorAll('.nav-cart').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  });
});
