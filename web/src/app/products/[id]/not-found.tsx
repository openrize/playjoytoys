import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="page-header">
      <div className="container" style={{ textAlign: "center", padding: "48px 0" }}>
        <h1>Product not found</h1>
        <p style={{ marginTop: 16, color: "var(--text-muted)" }}>
          That catalog ID is missing or outdated.
        </p>
        <Link href="/products" className="btn btn-primary" style={{ marginTop: 24 }}>
          Browse all products
        </Link>
      </div>
    </div>
  );
}
