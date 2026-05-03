# PlayJoy Toys — Next.js app

React portfolio built with **Next.js 15** (App Router). Catalog data lives in `src/data/products.json` (copied from `server/data/products.json`).

## Commands

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm start
```

## Features

- Home, categories, products grid with filters, pagination, and sort.
- **View details** on each card links to `/products/[id]` (350 pages generated at build time).
- Contact/portfolio behavior (toast + mailto) consistent with the legacy site.

The original static HTML + Express app remains in the parent folder if you still need it.
