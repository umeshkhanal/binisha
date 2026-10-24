// SEOHandler.jsx — Binisha Miscellany
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/* ------------------------------------------------------------------ */
/* CONFIG — update these to your real domain + links                   */
/* ------------------------------------------------------------------ */
const BASE_URL = "https://binisha.vercel.app"; // ← replace with your live domain
const PREVIEW_IMAGE = `${BASE_URL}/preview.png`; // ← replace with your real og:image URL
const WHATSAPP_NUMBER = "9771553531996";
const INSTAGRAM = "https://www.instagram.com/binisha_miscellany";
const TIKTOK = "https://www.tiktok.com/@binisha_miscellany";

/* ------------------------------------------------------------------ */
/* Route-based SEO map                                                 */
/* ------------------------------------------------------------------ */
const SEO_MAP = {
  "/": {
    title:
      "Binisha Miscellany | Women's Everyday Clothing — Nightwear, Maternity & Winter",
    description:
      "Binisha Miscellany is a small, personal clothing business by Binisha Adhikari — comfortable everyday clothing for women: nightwear, winter comfort, maternity wear, traditional Nepali-style pieces, and handmade items for the home.",
    keywords:
      "Binisha Miscellany, women's clothing Nepal, nightwear, nightdress, winter clothing, maternity wear, pregnancy clothing, traditional Nepali clothing, handmade home items, comfortable everyday clothing",
  },
  "/collection": {
    title:
      "Shop the Collection | Binisha Miscellany — Nightwear, Maternity & Winter",
    description:
      "Browse the full Binisha Miscellany collection — soft cotton nightdresses, cosy winter loungewear, maternity-friendly clothing, traditional Nepali-style pieces, and handmade hanging items. Order via WhatsApp.",
    keywords:
      "Binisha Miscellany collection, women's nightwear, maternity nightwear, winter loungewear, Nepali clothing, handmade hanging pieces, WhatsApp order",
  },
};

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */
export default function SEOHandler() {
  const location = useLocation();
  const path = location.pathname;

  /* Match by exact path; fall back to "/" for anything else */
  const seo = SEO_MAP[path] || SEO_MAP["/"];

  const url = `${BASE_URL}${path}`;
  const { title, description, keywords } = seo;

  /* ---------------- STRUCTURED DATA ---------------- */
  /* A single @graph so search engines see the brand, the shop, and
     the founder as related entities. */

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      /* 1. Brand / Organization */
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Binisha Miscellany",
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        description:
          "A small, personal clothing business offering comfortable everyday clothing for women — nightwear, winter comfort, maternity wear, and traditional Nepali-style pieces, plus handmade items for the home.",
        founder: {
          "@type": "Person",
          "@id": `${BASE_URL}/#founder`,
        },
        sameAs: [INSTAGRAM, TIKTOK],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${WHATSAPP_NUMBER}`,
          contactType: "customer service",
          availableLanguage: ["English", "Nepali"],
        },
      },

      /* 2. Founder */
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#founder`,
        name: "Binisha Adhikari",
        jobTitle: "Founder",
        description:
          "Founder of Binisha Miscellany, a home-based clothing business focused on everyday comfort for women.",
        worksFor: {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "NP",
        },
        sameAs: [INSTAGRAM, TIKTOK],
      },

      /* 3. Website (helps search engines understand the site) */
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Binisha Miscellany",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: "en",
      },

      /* 4. Optional: mark the collection page as a store */
      path === "/collection"
        ? {
            "@type": "Store",
            "@id": `${url}#store`,
            url,
            name: "Binisha Miscellany — Shop",
            description,
            image: PREVIEW_IMAGE,
            address: {
              "@type": "PostalAddress",
              addressCountry: "NP",
            },
            telephone: `+${WHATSAPP_NUMBER}`,
            priceRange: "$$",
            currenciesAccepted: "NPR",
            sameAs: [INSTAGRAM, TIKTOK],
          }
        : null,
    ].filter(Boolean),
  };

  return (
    <Helmet key={path}>
      {/* ================= BASIC SEO ================= */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Umesh Khanal" />
      <meta name="generator" content="React | Developed by Umesh Khanal" />

      {/* ================= GEO TARGETING ================= */}
      {/* Nepal-based business. Adjust if the shop moves operations. */}
      <meta name="geo.region" content="NP" />
      <meta name="geo.placename" content="Nepal" />

      {/* ================= OPEN GRAPH ================= */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={PREVIEW_IMAGE} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Binisha Miscellany" />
      <meta property="og:locale" content="en_US" />

      {/* ================= TWITTER ================= */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={PREVIEW_IMAGE} />

      {/* ================= CANONICAL ================= */}
      <link rel="canonical" href={url} />

      {/* ================= STRUCTURED DATA ================= */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>

      {/* ================= ROBOTS ================= */}
      <meta name="robots" content="index, follow" />

      {/* ================= VIEWPORT ================= */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />

      {/* ================= THEME COLOR ================= */}
      {/* Brand pink — matches the site accent */}
      <meta name="theme-color" content="#FF4FA3" />

      {/* ================= LANGUAGE ================= */}
      <meta httpEquiv="Content-Language" content="en" />
    </Helmet>
  );
}