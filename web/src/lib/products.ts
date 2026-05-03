import productsJson from "@/data/products.json";
import type { Product } from "./types";

export const PRODUCTS: Product[] = productsJson as Product[];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, limit);
}
