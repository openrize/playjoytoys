import type { CSSProperties } from "react";
import Link from "next/link";

export const metadata = {
  title: "Categories & Ages",
  description:
    "Browse PlayJoy Toys by category and age. Portfolio catalog with contact-only pricing.",
};

const CARDS: {
  href: string;
  title: string;
  desc: string;
  icon: string;
  style: CSSProperties;
}[] = [
  {
    href: "/products?category=educational",
    title: "Educational Toys",
    desc: "STEM kits & learning games",
    icon: "&#128300;",
    style: {
      "--cat-color": "#FF6B35",
      "--cat-bg": "rgba(255,107,53,0.12)",
    } as CSSProperties,
  },
  {
    href: "/products?category=outdoor",
    title: "Outdoor Play",
    desc: "Sports, ride-ons & active toys",
    icon: "&#9917;",
    style: {
      "--cat-color": "#00B0FF",
      "--cat-bg": "rgba(0,176,255,0.12)",
    } as CSSProperties,
  },
  {
    href: "/products?category=plush",
    title: "Plush & Soft Toys",
    desc: "Cuddly companions",
    icon: "&#129528;",
    style: {
      "--cat-color": "#FF4081",
      "--cat-bg": "rgba(255,64,129,0.12)",
    } as CSSProperties,
  },
  {
    href: "/products?category=creative",
    title: "Creative Toys",
    desc: "Arts, crafts & DIY kits",
    icon: "&#127912;",
    style: {
      "--cat-color": "#FFD600",
      "--cat-bg": "rgba(255,214,0,0.12)",
    } as CSSProperties,
  },
  {
    href: "/products?category=board",
    title: "Board Games",
    desc: "Fun for kids & families",
    icon: "&#127922;",
    style: {
      "--cat-color": "#7C4DFF",
      "--cat-bg": "rgba(124,77,255,0.12)",
    } as CSSProperties,
  },
];

export default function CategoriesPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo; <span>Categories</span>
          </div>
          <div className="badge">All Collections</div>
          <h1>
            Categories & <span className="gradient-text">Ages</span>
          </h1>
          <p>
            Jump into the portfolio grid with a category or age preset.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="categories-grid">
            {CARDS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="category-card"
                style={c.style}
              >
                <div
                  className="cat-icon"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: c.icon }}
                />
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </Link>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: 48 }}>
            <div className="badge">By age</div>
            <h2>Age shortcuts</h2>
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
              <div className="cat-icon">&#127868;</div>
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
              <div className="cat-icon">&#128396;</div>
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
              <div className="cat-icon">&#128300;</div>
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
              <div className="cat-icon">&#129513;</div>
              <h3>9-12 Years</h3>
              <p>Complex Puzzles</p>
            </Link>
          </div>

          <div className="categories-cta">
            <Link href="/products" className="btn btn-primary btn-lg">
              View full catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
