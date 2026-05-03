import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailActions } from "@/components/ProductDetailActions";
import {
  PRODUCTS,
  getProductById,
  getRelatedProducts,
} from "@/lib/products";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product" };
  const short =
    product.name.replace(/\.\.\.$/, "").trim() || product.fullName.slice(0, 80);
  return {
    title: short,
    description: product.fullName.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const catLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo;{" "}
            <Link href="/products">Products</Link> &rsaquo;{" "}
            <span>Details</span>
          </div>
          <div className="badge">Portfolio item</div>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)" }}>
            {product.fullName}
          </h1>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="product-detail-grid">
            <div className="product-gallery">
              <div
                className="product-main-img"
                style={{ position: "relative" }}
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                ) : (
                  <span style={{ fontSize: "6rem" }}>{product.emoji}</span>
                )}
              </div>
            </div>

            <div className="product-detail-info">
              <div className="product-category-tag">
                {catLabel} &middot; Ages {product.ageRange}
              </div>
              <h2 className="product-detail-name">{product.name}</h2>
              <div className="product-detail-rating">
                <span className="stars">
                  {"\u2605\u2605\u2605\u2605\u2605"}
                </span>
                <span className="rating-value">{product.rating} / 5</span>
                <span className="verified-reviews">
                  {product.reviews} reviews
                </span>
              </div>

              <div className="product-detail-price">
                <span className="price-big">Contact for pricing</span>
              </div>

              <p className="product-detail-desc">{product.fullName}</p>

              <ul className="features-list">
                <li>
                  <span className="feature-check">&#10003;</span>
                  Portfolio showcase &mdash; no checkout on this site
                </li>
                <li>
                  <span className="feature-check">&#10003;</span>
                  Email openrize@gmail.com for quotes
                </li>
                <li>
                  <span className="feature-check">&#10003;</span>
                  Phone +1 (224) 377-9043
                </li>
              </ul>

              <ProductDetailActions product={product} />

              <div style={{ marginTop: 28 }}>
                <Link href="/products" className="btn btn-outline">
                  &larr; Back to all products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" style={{ background: "var(--bg-card2)" }}>
          <div className="container">
            <div className="section-header">
              <h2>
                More in{" "}
                <span className="gradient-text">{catLabel}</span>
              </h2>
              <p>Related items from the same category.</p>
            </div>
            <div className="products-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
