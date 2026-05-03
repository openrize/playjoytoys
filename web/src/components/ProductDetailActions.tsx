"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { ContactButton } from "./ContactButton";

export function ProductDetailActions({ product }: { product: Product }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <ContactButton product={product} />
      <Link href="/contact" className="btn btn-outline">
        Contact page
      </Link>
      <a href="mailto:openrize@gmail.com" className="btn btn-secondary">
        Email openrize@gmail.com
      </a>
      <a href="tel:+12243779043" className="btn btn-secondary">
        Call +1 (224) 377-9043
      </a>
    </div>
  );
}
