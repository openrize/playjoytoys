/* ===== PLAYJOY TOYS - PORTFOLIO CONTACT MODULE ===== */

const Cart = {
  init() { console.log("Portfolio contact mode loaded"); },
  // Keep API compatibility with existing pages.
  get() { return []; },
  save() {},
  add(product) {
    const name = product?.name ? `"${product.name}"` : "this product";
    Cart.showToast(`Contact ${name}<br>Email: openrize@gmail.com<br>Phone: +1 (224) 377 9043`);
    return [];
  },
  remove() {},
  updateQty() {},
  clear() {},
  count() { return 0; },
  subtotal() { return 0; },
  updateBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = '0';
      el.style.display = 'none';
    });
  },
  showToast(msg) {
    document.querySelectorAll('.pj-toast').forEach(t => t.remove());
    const toast = document.createElement('div');
    toast.className = 'pj-toast';
    toast.innerHTML = msg;
    toast.style.cssText = `
      position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(20px);
      background:linear-gradient(135deg,#FF6B35,#c84b1a);
      color:white; padding:14px 20px; border-radius:12px; text-align:center;
      font-family:'Nunito',sans-serif; font-weight:800; font-size:0.92rem; line-height:1.4;
      box-shadow:0 8px 30px rgba(255,107,53,0.5);
      z-index:9999; opacity:0; transition:all 0.3s ease;
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
    }, 2800);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  Cart.updateBadge();
  document.querySelectorAll('.nav-cart').forEach(el => {
    el.style.cursor = 'pointer';
    el.title = 'Contact us for pricing';
    el.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });
  });
});
