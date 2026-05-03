import Link from "next/link";

export const metadata = {
  title: "Contact",
  description:
    "Reach PlayJoy Toys / Openrize for portfolio inquiries and pricing.",
};

export default function ContactPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo; <span>Contact</span>
          </div>
          <div className="badge">We&apos;re Here</div>
          <h1>
            Contact <span className="gradient-text">PlayJoy Toys</span>
          </h1>
          <p>Portfolio mode &mdash; respond within one business day.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="why-big-card" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 12 }}>Direct lines</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
              Email{" "}
              <a href="mailto:openrize@gmail.com">openrize@gmail.com</a>
              <br />
              Phone{" "}
              <a href="tel:+12243779043">+1 (224) 377-9043</a>
            </p>
            <Link href="/products" className="btn btn-primary">
              View catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
