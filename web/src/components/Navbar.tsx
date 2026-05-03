"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories & Ages" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <div className="logo-icon" aria-hidden="true">
              &#129528;
            </div>
            Play<span>Joy</span> Toys
          </Link>
          <ul className="nav-links">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={pathname === href ? "active" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <div
              className="nav-cart"
              title="Contact us for pricing"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/contact")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") router.push("/contact");
              }}
            >
              <span aria-hidden="true">&#9742;</span>
              <div className="cart-count" style={{ display: "none" }}>
                0
              </div>
            </div>
            <Link
              href="/products"
              className="btn btn-primary"
              style={{ padding: "10px 22px", fontSize: "0.9rem" }}
            >
              View Portfolio
            </Link>
            <button
              type="button"
              className="hamburger"
              id="hamburger"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        id="mobileMenu"
      >
        <button
          type="button"
          className="mobile-close"
          id="mobileClose"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          &times;
        </button>
        {NAV.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
