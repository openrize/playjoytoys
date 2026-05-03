import Link from "next/link";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo; <span>Terms</span>
          </div>
          <h1>Terms of Service</h1>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <p style={{ color: "var(--text-secondary)" }}>
            Portfolio demonstration site. No contractual sale is formed through
            browsing these pages. Merge your historical terms document here when
            ready.
          </p>
        </div>
      </section>
    </>
  );
}
