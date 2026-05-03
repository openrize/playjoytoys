"use client";

import { useState } from "react";

export function ProductWishlist() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      className="product-wishlist"
      aria-label={saved ? "Remove from saved" : "Save item"}
      onClick={(e) => {
        e.stopPropagation();
        setSaved((v) => !v);
      }}
    >
      {saved ? "\u2764" : "\u2661"}
    </button>
  );
}
