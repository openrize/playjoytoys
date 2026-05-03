import Link from "next/link";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions &mdash; portfolio shipping and checkout disclaimers.",
};

export default function FaqPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo; <span>FAQ</span>
          </div>
          <h1>
            FAQs</h1>
          <p>Portfolio site policies in brief.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <h3 style={{ marginBottom: 12 }}>Checkout</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
            This Next.js site does not process payments. Contact{" "}
            <a href="mailto:openrize@gmail.com">openrize@gmail.com</a> for
            quotes.
          </p>
          <h3 style={{ marginBottom: 12 }}>Shipping</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
            Delivery options are discussed after contact &mdash; not automated
            here.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
