"use client";

import { useState } from "react";
import { contactToast } from "@/lib/contactToast";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  className?: string;
};

export function ContactButton({ product, className = "btn-add-cart" }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  function handleClick() {
    contactToast(product.name);
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 1500);
  }

  return (
    <button
      type="button"
      className={className}
      title="Contact us"
      onClick={handleClick}
      style={
        confirmed
          ? { background: "var(--accent-green)", color: "white" }
          : undefined
      }
    >
      {confirmed ? "\u2713" : "\u260E"}
    </button>
  );
}
