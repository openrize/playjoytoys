"use client";

export function contactToast(productName?: string): void {
  const name = productName ? `"${productName}"` : "this product";
  const msg = `Contact ${name}<br>Email: openrize@gmail.com<br>Phone: +1 (224) 377 9043`;

  document.querySelectorAll(".pj-toast").forEach((t) => t.remove());
  const toast = document.createElement("div");
  toast.className = "pj-toast";
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
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
