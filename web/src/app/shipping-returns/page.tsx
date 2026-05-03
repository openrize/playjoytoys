import Link from "next/link";

export const metadata = { title: "Shipping & Returns" };

export default function ShippingPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo; <span>Shipping</span>
          </div>
          <h1>Shipping & Returns</h1>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <p style={{ color: "var(--text-secondary)" }}>
            Portfolio mode: fulfillment and return rules are agreed offline after
            you contact{" "}
            <a href="mailto:openrize@gmail.com">openrize@gmail.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
