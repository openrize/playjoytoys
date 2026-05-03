import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="nav-logo" style={{ marginBottom: 0 }}>
              <div className="logo-icon" aria-hidden="true">
                &#129528;
              </div>
              Play<span>Joy</span> Toys
            </Link>
            <p>
              Portfolio site showcasing toy concepts for families and buyers.
              Contact for pricing.
            </p>
            <div className="social-links" aria-label="Social placeholders">
              <span className="social-link">FB</span>
              <span className="social-link">IG</span>
              <span className="social-link">X</span>
              <span className="social-link">YT</span>
              <span className="social-link">Pin</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Browse</h4>
            <ul className="footer-links">
              <li>
                <Link href="/products?category=educational">Educational Toys</Link>
              </li>
              <li>
                <Link href="/products?category=outdoor">Outdoor Play</Link>
              </li>
              <li>
                <Link href="/products?category=plush">Plush Toys</Link>
              </li>
              <li>
                <Link href="/products?category=creative">Creative Toys</Link>
              </li>
              <li>
                <Link href="/products?category=board">Board Games</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <ul className="footer-links">
              <li>
                <Link href="/faq">FAQs</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/shipping-returns">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:openrize@gmail.com">Email: openrize@gmail.com</a>
              </li>
              <li>
                <a href="tel:+12243779043">Phone: +1 (224) 377-9043</a>
              </li>
              <li>
                <Link href="/contact">Based in the US</Link>
              </li>
              <li>
                <Link href="/contact">Typical reply within 24 hours</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2026 PlayJoy Toys. All rights reserved. Powered by{" "}
            <a
              href="https://www.openrize.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--primary)", textDecoration: "none" }}
            >
              Openrize
            </a>
            .
          </p>
          <div className="footer-badges">
            <div className="footer-badge">Portfolio site</div>
            <div className="footer-badge">Contact for pricing</div>
            <div className="footer-badge">&#10003; Safe & Certified</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
