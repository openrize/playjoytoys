"use client";

import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const ITEMS_PER_PAGE = 12;

const ALLOWED_CAT = [
  "educational",
  "outdoor",
  "plush",
  "creative",
  "board",
] as const;
const ALLOWED_AGE = ["0-2", "3-5", "6-8", "9-12"] as const;

function normalizeCategory(c: string | null | undefined): string {
  if (!c) return "all";
  return ALLOWED_CAT.includes(c as (typeof ALLOWED_CAT)[number]) ? c : "all";
}

function normalizeAge(a: string | null | undefined): string {
  if (!a) return "all";
  return ALLOWED_AGE.includes(a as (typeof ALLOWED_AGE)[number]) ? a : "all";
}

type Props = {
  initialCategory?: string | null;
  initialAge?: string | null;
};

export function ProductsExplorer({
  initialCategory = null,
  initialAge = null,
}: Props) {
  const [currentAge, setCurrentAge] = useState(normalizeAge(initialAge));
  const [currentCat, setCurrentCat] = useState(
    normalizeCategory(initialCategory),
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Best Selling");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCurrentCat(normalizeCategory(initialCategory));
    setCurrentAge(normalizeAge(initialAge));
    setPage(1);
  }, [initialCategory, initialAge]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchCat = currentCat === "all" || p.category === currentCat;
      const matchAge = currentAge === "all" || p.ageRange === currentAge;
      const safeName = p.name ? p.name.toLowerCase() : "";
      const safeFull = p.fullName ? p.fullName.toLowerCase() : "";
      const matchSearch =
        !q || safeName.includes(q) || safeFull.includes(q);
      return matchCat && matchAge && matchSearch;
    });

    const copy = [...list];
    if (sort === "Name: A-Z") {
      copy.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sort === "Name: Z-A") {
      copy.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    } else if (sort === "Best Rated") {
      copy.sort(
        (a, b) => parseFloat(String(b.rating)) - parseFloat(String(a.rating)),
      );
    } else if (sort === "Newest First") {
      copy.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      copy.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    return copy;
  }, [currentAge, currentCat, query, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const pageItems = filteredProducts.slice(start, start + ITEMS_PER_PAGE);

  function setCat(cat: string) {
    setCurrentCat(cat);
    setPage(1);
  }

  function setAge(age: string) {
    setCurrentAge(age);
    setPage(1);
  }

  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, minWidth: 260, position: "relative" }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search toys..."
              style={{ paddingLeft: 20 }}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="form-select"
            style={{ width: 180 }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="Best Selling">Sort: Best Selling</option>
            <option value="Name: A-Z">Name: A-Z</option>
            <option value="Name: Z-A">Name: Z-A</option>
            <option value="Best Rated">Best Rated</option>
            <option value="Newest First">Newest First</option>
          </select>
        </div>

        <div className="filter-bar" style={{ marginBottom: 12 }}>
          {(
            [
              ["all", "All Ages"],
              ["0-2", "0-2 Years"],
              ["3-5", "3-5 Years"],
              ["6-8", "6-8 Years"],
              ["9-12", "9-12 Years"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              className={`filter-btn ${currentAge === val ? "active" : ""}`}
              onClick={() => setAge(val)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="filter-bar" style={{ marginBottom: 20 }}>
          {(
            [
              ["all", "All Types"],
              ["educational", "Educational"],
              ["outdoor", "Outdoor"],
              ["plush", "Plush"],
              ["creative", "Creative"],
              ["board", "Board Games"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              className={`filter-btn ${currentCat === val ? "active" : ""}`}
              onClick={() => setCat(val)}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          style={{
            marginBottom: 20,
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
          }}
        >
          Showing{" "}
          <strong id="productCount" style={{ color: "white" }}>
            {filteredProducts.length}
          </strong>{" "}
          products
        </div>

        <div className="products-grid">
          {pageItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {totalPages > 1 && (
          <div
            className="pagination"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              className={`btn ${safePage === 1 ? "btn-disabled" : "btn-outline"}`}
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            {(() => {
              const maxVisible = 5;
              let startPage = Math.max(
                1,
                safePage - Math.floor(maxVisible / 2),
              );
              const endPage = Math.min(totalPages, startPage + maxVisible - 1);
              if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
              }
              const nums: number[] = [];
              for (let i = startPage; i <= endPage; i++) nums.push(i);
              return nums.map((i) => (
                <button
                  key={i}
                  type="button"
                  className={`btn ${i === safePage ? "btn-primary" : "btn-outline"}`}
                  style={{ minWidth: 45 }}
                  onClick={() => setPage(i)}
                >
                  {i}
                </button>
              ));
            })()}
            <button
              type="button"
              className={`btn ${safePage === totalPages ? "btn-disabled" : "btn-outline"}`}
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
