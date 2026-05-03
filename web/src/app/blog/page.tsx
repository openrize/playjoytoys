import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Guides and ideas from PlayJoy Toys (portfolio content).",
};

export default function BlogPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo; <span>Blog</span>
          </div>
          <div className="badge">Articles</div>
          <h1>
            PlayJoy <span className="gradient-text">Blog</span>
          </h1>
          <p>Portfolio placeholders &mdash; swap in CMS content when ready.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <p style={{ color: "var(--text-muted)" }}>
            Static export from the legacy HTML blog can be migrated here as
            individual routes under <code>/blog/[slug]</code> when you need it.
          </p>
          <Link href="/products" className="btn btn-outline" style={{ marginTop: 20 }}>
            Explore products
          </Link>
        </div>
      </section>
    </>
  );
}
