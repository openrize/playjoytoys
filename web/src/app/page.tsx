import type { CSSProperties } from "react";
import Link from "next/link";
import { HeroParticles } from "@/components/HeroParticles";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <HeroParticles />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                &#127775; Portfolio showcase &mdash; Openrize
              </div>
              <h1>
                Fun & Educational <span className="gradient-text">Toys</span>{" "}
                &mdash; Curated for Families
              </h1>
              <p className="hero-sub">
                Browse a wide showcase of safe, durable concepts across ages
                0&ndash;12. Pricing is contact-only; reach out anytime for
                details.
              </p>
              <div className="hero-actions">
                <Link href="/products" className="btn btn-primary btn-lg">
                  View featured work
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Toy Varieties</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Happy Kids</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    4.9<span aria-hidden="true">&#9733;</span>
                  </div>
                  <div className="stat-label">Showcase rating</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-float-card card-1">
                <div
                  className="float-icon"
                  style={{ background: "rgba(255,214,0,0.15)" }}
                  aria-hidden="true"
                >
                  &#127942;
                </div>
                <div className="float-text">
                  <strong>Award Winning</strong>
                  <span>Certified Safe Toys</span>
                </div>
              </div>
              <div className="hero-emoji-bg">
                <div className="hero-emoji-grid" aria-hidden="true">
                  <div className="hero-toy-item">&#129514;</div>
                  <div className="hero-toy-item">&#129513;</div>
                  <div className="hero-toy-item">&#128663;</div>
                  <div className="hero-toy-item">&#127912;</div>
                  <div className="hero-toy-item">&#127936;</div>
                  <div className="hero-toy-item">&#129528;</div>
                  <div className="hero-toy-item">&#127919;</div>
                  <div className="hero-toy-item">&#127922;</div>
                </div>
              </div>
              <div className="hero-float-card card-2">
                <div
                  className="float-icon"
                  style={{ background: "rgba(0,200,83,0.15)" }}
                  aria-hidden="true"
                >
                  &#128666;
                </div>
                <div className="float-text">
                  <strong>Direct contact</strong>
                  <span>Email or call for a quote</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">&#127919; Browse by category</div>
            <h2>
              Find the <span className="gradient-text">Perfect Toy</span>
            </h2>
            <p>
              Browse our hand-picked categories designed to match every
              child&apos;s passion and developmental stage.
            </p>
          </div>
          <div className="categories-grid">
            <Link
              href="/products?category=educational"
              className="category-card"
              style={
                {
                  "--cat-color": "#FF6B35",
                  "--cat-bg": "rgba(255,107,53,0.12)",
                } as CSSProperties
              }
            >
              <div className="cat-icon" aria-hidden="true">
                &#128300;
              </div>
              <h3>Educational Toys</h3>
              <p>STEM kits & learning games</p>
            </Link>
            <Link
              href="/products?category=outdoor"
              className="category-card"
              style={
                {
                  "--cat-color": "#00B0FF",
                  "--cat-bg": "rgba(0,176,255,0.12)",
                } as CSSProperties
              }
            >
              <div className="cat-icon">&#9917;</div>
              <h3>Outdoor Play</h3>
              <p>Sports, ride-ons & active toys</p>
            </Link>
            <Link
              href="/products?category=plush"
              className="category-card"
              style={
                {
                  "--cat-color": "#FF4081",
                  "--cat-bg": "rgba(255,64,129,0.12)",
                } as CSSProperties
              }
            >
              <div className="cat-icon" aria-hidden="true">
                &#129528;
              </div>
              <h3>Plush & Soft Toys</h3>
              <p>Cuddly companions</p>
            </Link>
            <Link
              href="/products?category=creative"
              className="category-card"
              style={
                {
                  "--cat-color": "#FFD600",
                  "--cat-bg": "rgba(255,214,0,0.12)",
                } as CSSProperties
              }
            >
              <div className="cat-icon" aria-hidden="true">
                &#127912;
              </div>
              <h3>Creative Toys</h3>
              <p>Arts, crafts & DIY kits</p>
            </Link>
            <Link
              href="/products?category=board"
              className="category-card"
              style={
                {
                  "--cat-color": "#7C4DFF",
                  "--cat-bg": "rgba(124,77,255,0.12)",
                } as CSSProperties
              }
            >
              <div className="cat-icon" aria-hidden="true">
                &#127922;
              </div>
              <h3>Board Games</h3>
              <p>Fun for kids & families</p>
            </Link>
          </div>

          <div className="section-header" style={{ marginTop: 40 }}>
            <div className="badge">&#128118; Browse by age</div>
            <h2>
              Find the <span className="gradient-text">Perfect Fit</span>
            </h2>
            <p>Toys tailored for your child&apos;s developmental stage.</p>
          </div>
          <div className="categories-grid">
            <Link
              href="/products?age=0-2"
              className="category-card"
              style={
                {
                  "--cat-color": "#FF6B35",
                  "--cat-bg": "rgba(255,107,53,0.12)",
                } as CSSProperties
              }
            >
              <div className="cat-icon" aria-hidden="true">
                &#127868;
              </div>
              <h3>0-2 Years</h3>
              <p>Sensory & Teething</p>
            </Link>
            <Link
              href="/products?age=3-5"
              className="category-card"
              style={
                {
                  "--cat-color": "#00C853",
                  "--cat-bg": "rgba(0,200,83,0.12)",
                } as CSSProperties
              }
            >
              <div className="cat-icon" aria-hidden="true">
                &#128396;
              </div>
              <h3>3-5 Years</h3>
              <p>Creative & Preschool</p>
            </Link>
            <Link
              href="/products?age=6-8"
              className="category-card"
              style={
                {
                  "--cat-color": "#00B0FF",
                  "--cat-bg": "rgba(0,176,255,0.12)",
                } as CSSProperties
              }
            >
              <div className="cat-icon" aria-hidden="true">
                &#128300;
              </div>
              <h3>6-8 Years</h3>
              <p>STEM & Learning</p>
            </Link>
            <Link
              href="/products?age=9-12"
              className="category-card"
              style={
                {
                  "--cat-color": "#7C4DFF",
                  "--cat-bg": "rgba(124,77,255,0.12)",
                } as CSSProperties
              }
            >
              <div className="cat-icon" aria-hidden="true">
                &#129513;
              </div>
              <h3>9-12 Years</h3>
              <p>Complex Puzzles</p>
            </Link>
          </div>
          <div className="categories-cta">
            <Link href="/categories" className="btn btn-secondary btn-lg">
              Explore all collections
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">&#128293; Featured on this portfolio</div>
            <h2>
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p>
              A sample of the catalog &mdash; open any card for full details or
              contact.
            </p>
          </div>
          <div className="products-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="products-cta">
            <Link href="/products" className="btn btn-primary btn-lg">
              View all products &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-inner">
            <div className="badge" style={{ margin: "0 auto 16px" }}>
              &#128231; Stay in touch
            </div>
            <h2>
              Get <span className="gradient-text">updates</span>
            </h2>
            <p>
              Leave your email for occasional portfolio updates &mdash; or
              email us directly at openrize@gmail.com.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="bottom-cta">
            <h2>Ready to explore the catalog?</h2>
            <p>
              Open the full product grid &mdash; contact info is on every item.
            </p>
            <Link href="/products" className="btn btn-white btn-lg">
              View portfolio products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
