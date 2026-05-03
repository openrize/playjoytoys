import Link from "next/link";
import { ProductsExplorer } from "@/components/ProductsExplorer";

type Props = {
  searchParams: Promise<{ category?: string; age?: string }>;
};

export async function generateMetadata() {
  return {
    title: "All Products",
    description:
      "Browse the full PlayJoy Toys portfolio grid. Contact openrize@gmail.com or +1 (224) 377 9043 for pricing.",
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const initialCategory = sp.category ?? null;
  const initialAge = sp.age ?? null;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> &rsaquo;{" "}
            <span>All Products</span>
          </div>
          <div className="badge">Browse Everything</div>
          <h1>
            All <span className="gradient-text">Products</span>
          </h1>
          <p>
            Full portfolio catalog with filters, sorting, and detail pages for
            every item.
          </p>
        </div>
      </div>
      <ProductsExplorer
        initialCategory={initialCategory}
        initialAge={initialAge}
      />
    </>
  );
}
