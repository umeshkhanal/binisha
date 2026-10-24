/* ================================================================== */
/* Binisha Miscellany — product data                                   */
/* ================================================================== */
/*
 * Edit this file to manage products. The CollectionPage and CollectionSection
 * both import PRODUCTS from here, so a change applies everywhere.
 *
 * Image URLs are placeholders (Unsplash) so the page works immediately.
 * Replace with imported real photos:
 *
 *   import nd1 from "../assets/products/nightdress-1.jpg";
 *   images: [nd1, nd2]
 *
 * Product structure:
 *   id: string
 *   name: string
 *   category: "nightwear" | "traditional" | "winter" | "maternity" | "handmade"
 *   price: number | null
 *   currency: "NPR"
 *   description: string
 *   details: string[]
 *   images: string[]
 *   video: string | null
 *   sizes: string[]
 *   inStock: boolean
 */

/* Placeholder imagery — replace with real product photos when ready. */
const IMG = {
  ndFront:
    "https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=900&q=80&auto=format&fit=crop",
  ndBack:
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=900&q=80&auto=format&fit=crop",
  ndDetail:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&auto=format&fit=crop",
  winter:
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=900&q=80&auto=format&fit=crop",
  winter2:
    "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=900&q=80&auto=format&fit=crop",
  maternity:
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&q=80&auto=format&fit=crop",
  maternity2:
    "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=900&q=80&auto=format&fit=crop",
  traditional:
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop",
  traditional2:
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=900&q=80&auto=format&fit=crop",
  handmade:
    "https://images.unsplash.com/photo-1616627451515-4216f0e9f6a0?w=900&q=80&auto=format&fit=crop",
  handmade2:
    "https://images.unsplash.com/photo-1595347097560-69238724e7bd?w=900&q=80&auto=format&fit=crop",
};

export const CATEGORY_ORDER = [
  "nightwear",
  "traditional",
  "winter",
  "maternity",
  "handmade",
];

export const CATEGORY_LABELS = {
  nightwear: "Nightwear",
  traditional: "Traditional Nepali",
  winter: "Winter",
  maternity: "Maternity",
  handmade: "Handmade",
};

export const PRODUCTS = [
  {
    id: "nightwear-01",
    name: "Soft Cotton Nightdress",
    category: "nightwear",
    price: 2400,
    currency: "NPR",
    description:
      "Light, breathable Nepali-style cotton nightdress selected for all-night comfort. Relaxed fit that moves with you.",
    details: [
      "100% cotton",
      "Machine washable",
      "Relaxed everyday fit",
      "Small floral print",
    ],
    images: [IMG.ndFront, IMG.ndBack, IMG.ndDetail],
    video: null,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "nightwear-02",
    name: "Floral Short Nightwear Set",
    category: "nightwear",
    price: 2850,
    currency: "NPR",
    description:
      "A two-piece nightwear set with a soft short-sleeve top and matching shorts. Selected for warmer evenings.",
    details: ["Two-piece set", "Soft cotton blend", "Elasticated waist"],
    images: [IMG.ndBack, IMG.ndFront],
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
      "Warm, layered loungewear that keeps you comfortable through the colder months without feeling heavy.",
    details: ["Warm fleece lining", "Full-length sleeves", "Easy machine wash"],
    images: [IMG.winter, IMG.winter2],
    video: null,
    sizes: ["M", "L", "XL"],
    inStock: true,
  },
  {
    id: "winter-02",
    name: "Winter Comfort Set",
    category: "winter",
    price: 3650,
    currency: "NPR",
    description:
      "A full winter comfort set — cosy, warm, and easy to wear at home through the day.",
    details: ["Two-piece set", "Thick knit finish", "Soft inner lining"],
    images: [IMG.winter2, IMG.winter],
    video: null,
    sizes: ["S", "M", "L"],
    inStock: true,
  },
  {
    id: "maternity-01",
    name: "Everyday Maternity Wear",
    category: "maternity",
    price: 2950,
    currency: "NPR",
    description:
      "Pregnancy-friendly clothing chosen for different needs and situations — comfortable, easy to wear, and gentle on the skin.",
    details: [
      "Stretch cotton blend",
      "Adjustable waist",
      "Comfortable all-day fit",
    ],
    images: [IMG.maternity, IMG.maternity2],
    video: null,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "maternity-02",
    name: "Maternity Nightwear",
    category: "maternity",
    price: 2650,
    currency: "NPR",
    description:
      "Soft nightwear selected to feel comfortable throughout pregnancy and after.",
    details: ["Breathable cotton", "Easy front access", "Relaxed fit"],
    images: [IMG.maternity2, IMG.maternity],
    video: null,
    sizes: ["S", "M", "L"],
    inStock: false,
  },
  {
    id: "traditional-01",
    name: "Traditional Nepali-Style Piece",
    category: "traditional",
    price: 3450,
    currency: "NPR",
    description:
      "A traditional Nepali-style clothing piece for everyday wear — selected with care and made from comfortable everyday fabrics.",
    details: ["Traditional cut", "Everyday comfort", "Easy care"],
    images: [IMG.traditional, IMG.traditional2],
    video: null,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "handmade-01",
    name: "Handmade Hanging Piece",
    category: "handmade",
    price: 1450,
    currency: "NPR",
    description:
      "Small handmade hanging pieces to organise belongings and add warmth to a space. Each piece is made by hand.",
    details: ["Handmade", "For organising and decorating", "Compact size"],
    images: [IMG.handmade, IMG.handmade2],
    video: null,
    sizes: [],
    inStock: true,
  },
];

/* Category counts (used by the filter bar) */
export function getAvailableCategories(products = PRODUCTS) {
  const set = new Set(products.map((p) => p.category));
  return CATEGORY_ORDER.filter((c) => set.has(c));
}