import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ContactButton } from "./ContactButton";
import { ProductWishlist } from "./ProductWishlist";

export function ProductCard({ product }: { product: Product }) {
  const safeCategory = product.category || "toy";
  const safeName = product.name || "Toy";
  const safeDesc = product.fullName
    ? product.fullName.substring(0, 60)
    : safeName;

  let badgeHtml: ReactNode = null;
  if (product.badge) {
    badgeHtml = (
      <span
        className="product-badge hot"
        style={{
          top: 10,
          right: 10,
          left: "auto",
          background: "var(--primary)",
        }}
      >
        &#9733; {product.badge}
      </span>
    );
  }

  return (
    <div className="product-card" data-cat={safeCategory}>
      {badgeHtml}
      <div className="product-img">
        {product.image ? (
          <Image
            src={product.image}
            alt={safeName}
            width={300}
            height={300}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 15,
            }}
            unoptimized
          />
        ) : (
          <span style={{ fontSize: "3rem" }}>{product.emoji}</span>
        )}
        <ProductWishlist />
      </div>
      <div className="product-info">
        <div className="product-category">
          {safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)} &middot;
          Age: {product.ageRange || "All"}
        </div>
        <div className="product-name">{safeName}</div>
        <div className="product-desc">{safeDesc}...</div>
        <div className="product-rating">
          <span className="stars">
            {"\u2605\u2605\u2605\u2605\u2605"}
          </span>
          <span className="rating-count">({product.reviews || 0})</span>
        </div>
        <div
          className="product-footer"
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            gap: 12,
          }}
        >
          <div
            className="product-price"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            <span className="price-current">Contact</span>
            <span className="price-original" style={{ fontSize: "0.78rem" }}>
              Email: openrize@gmail.com
            </span>
            <span className="price-original" style={{ fontSize: "0.78rem" }}>
              Phone: +1 (224) 377 9043
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link
              href={`/products/${product.id}`}
              className="btn btn-outline"
              style={{
                flex: "1 1 auto",
                textAlign: "center",
                justifyContent: "center",
                textDecoration: "none",
                minWidth: "120px",
              }}
            >
              View details
            </Link>
            <ContactButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
