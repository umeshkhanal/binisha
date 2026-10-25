/* ================================================================== */
/* Binisha Miscellany — product data                                   */
/* ================================================================== */
/*
 * Product structure:
 *   id: string
 *   name: string
 *   category: "nightwear" | "traditional" | "winter"
 *   price: number | null
 *   currency: "NPR"
 *   description: string
 *   details: string[]
 *   images: string[]
 *   video: string | null
 *   sizes: string[]
 *   inStock: boolean
 *   featured?: boolean
 */

import { assets } from "../assets/assets";

/* ------------------------------------------------------------------ */
/* Real product photos                                                 */
/* ------------------------------------------------------------------ */


const c1 = assets.c1;
const c2 = assets.c2;
const c3 = assets.c3;
const c4 = assets.c4;
const c5 = assets.c5;
const c6 = assets.c6;

export const CATEGORY_ORDER = [
  "nightwear",
  "traditional",
  "winter",
];

export const CATEGORY_LABELS = {
  nightwear: "Nightwear",
  traditional: "Traditional Nepali",
  winter: "Winter",
};

export const PRODUCTS = [
  {
    id: "traditional-01",
    name: "Handwoven Saree",
    category: "traditional",
    price: 3450,
    currency: "NPR",
    description:
      "A traditional Nepali-style saree selected with care — comfortable fabric for everyday and occasion wear.",
    details: ["Traditional drape", "Everyday comfort", "Easy care"],
    images: [c1],
    video: null,
    sizes: [],
    inStock: true,
    featured: true,
  },
  {
    id: "traditional-02",
    name: "Everyday Kurta",
    category: "traditional",
    price: 2200,
    currency: "NPR",
    description:
      "A comfortable everyday kurta in a relaxed cut — easy to wear and easy to care for.",
    details: ["Relaxed fit", "Breathable fabric", "Machine washable"],
    images: [c5],
    video: null,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "nightwear-01",
    name: "Soft Cotton Nightdress — Full Length",
    category: "nightwear",
    price: 2400,
    currency: "NPR",
    description:
      "Light, breathable cotton nightdress with full-length pants for all-night comfort. Relaxed fit that moves with you.",
    details: [
      "100% cotton",
      "Full-length pants",
      "Relaxed everyday fit",
      "Machine washable",
    ],
    images: [c4],
    video: null,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: true,
  },
  {
    id: "nightwear-02",
    name: "Soft Nightwear Set — Shorts",
    category: "nightwear",
    price: 2850,
    currency: "NPR",
    description:
      "A two-piece nightwear set with a soft short-sleeve top and matching shorts. Selected for warmer evenings.",
    details: ["Two-piece set", "Soft cotton blend", "Elasticated waist"],
    images: [c2],
    video: null,
    sizes: ["S", "M", "L"],
    inStock: true,
  },
  {
    id: "winter-01",
    name: "Cosy Winter Loungewear",
    category: "winter",
    price: 3200,
    currency: "NPR",
    description:
      "Warm, layered winter clothing that keeps you comfortable through the colder months without feeling heavy.",
    details: ["Warm fleece lining", "Full-length sleeves", "Easy machine wash"],
    images: [c3],
    video: null,
    sizes: ["M", "L", "XL"],
    inStock: true,
  },
  {
    id: "winter-02",
    name: "Winter Nightdress",
    category: "winter",
    price: 3650,
    currency: "NPR",
    description:
      "A warm winter nightdress — cosy, soft-lined, and easy to wear through cold nights.",
    details: ["Warm lining", "Full-length sleeves", "Soft inner finish"],
    images: [c6],
    video: null,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
];

/* Category counts (used by the filter bar) */
export function getAvailableCategories(products = PRODUCTS) {
  const set = new Set(products.map((p) => p.category));
  return CATEGORY_ORDER.filter((c) => set.has(c));
}