import Link from "next/link";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo; <span>Privacy</span>
          </div>
          <h1>Privacy Policy</h1>
        </div>
      </div>
      <section className="section">
        <div className="container prose" style={{ maxWidth: 720 }}>
          <p style={{ color: "var(--text-secondary)" }}>
            Placeholder privacy copy from the legacy site should be pasted here
            or replaced with counsel-approved text. This portfolio deployment
            minimizes data collection; newsletter alerts are demo-only.
          </p>
        </div>
      </section>
    </>
  );
}
