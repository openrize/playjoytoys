import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "PlayJoy Toys portfolio &mdash; mission, safety focus, and contact paths.",
};

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo; <span>About</span>
          </div>
          <div className="badge">Our Story</div>
          <h1>
            About <span className="gradient-text">PlayJoy Toys</span>
          </h1>
          <p>
            A portfolio-forward showcase of toy concepts for families and buyers.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
            PlayJoy Toys highlights safe, engaging products across educational,
            outdoor, plush, creative, and board-game categories. This site is a{" "}
            <strong>portfolio demo</strong>: there is no checkout here.
            For pricing and availability, email{" "}
            <a href="mailto:openrize@gmail.com">openrize@gmail.com</a> or call{" "}
            <a href="tel:+12243779043">+1 (224) 377-9043</a>.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link href="/products" className="btn btn-primary">
              Browse catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
