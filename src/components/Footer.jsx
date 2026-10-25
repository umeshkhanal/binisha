// Footer.jsx — Binisha Miscellany
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowUp,
  MessageCircle,
  Instagram,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { assets } from "../assets/assets";

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */
const PINK = "#FF4FA3";
const BLACK = "#111111";
const WHITE = "#FFFFFF";
const BLUSH = "#FFF0F7";

/* ------------------------------------------------------------------ */
/* CONFIG                                                              */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = "9779819123106";
const SOCIAL = {
  instagram: "https://www.instagram.com/binisha_miscellany",
  tiktok: "https://www.tiktok.com/@binisaadhikari",
};

/* ------------------------------------------------------------------ */
/* Sections on the home page                                           */
/* ------------------------------------------------------------------ */
const SECTIONS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Collection", id: "collection" },
  { label: "Contact", id: "contact" },
];

/* What the shop sells */
const CATEGORIES = [
  "Nightwear",
  "Winter Comfort",
  "Maternity",
  "Traditional Nepali",
  "Handmade for Home",
];

/* ------------------------------------------------------------------ */
/* TikTok icon (not in lucide-react)                                   */
/* ------------------------------------------------------------------ */
function TikTokIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1.84-.04z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === "/";

  /* Scroll to a section on the home page (navigate first if needed) */
  const scrollToSection = (id) => {
    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = window.innerWidth < 1024 ? 112 : 72;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (!onHome) {
      navigate("/");
      const wait = () => {
        const el = document.getElementById(id);
        if (el) doScroll();
        else requestAnimationFrame(wait);
      };
      requestAnimationFrame(wait);
    } else {
      doScroll();
    }
  };

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative border-t"
      style={{
        backgroundColor: BLUSH,
        borderColor: "rgba(17,17,17,0.08)",
        color: BLACK,
      }}
    >
      {/* Soft pink bloom behind the brand mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[240px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,79,163,0.08) 0%, rgba(255,79,163,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= TOP BRAND ROW ================= */}
        <div
          className="flex flex-col items-start justify-between gap-8 border-b py-10 sm:py-12 md:flex-row md:items-center"
          style={{ borderColor: "rgba(17,17,17,0.08)" }}
        >
          {/* Brand mark */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 items-center justify-center sm:h-12">
              {assets.logo ? (
                <img
                  src={assets.logo}
                  alt="Binisha Miscellany"
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: PINK, color: WHITE }}
                >
                  BM
                </span>
              )}
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-base font-extrabold uppercase sm:text-lg"
                style={{ letterSpacing: "0.04em", color: BLACK }}
              >
                Binisha Miscellany
              </span>
              <span
                className="mt-1 text-[8px] font-semibold uppercase sm:text-[9px]"
                style={{ letterSpacing: "0.3em", color: PINK }}
              >
                Women's Clothing
              </span>
            </div>
          </div>

          {/* Short tagline */}
          <p
            className="max-w-md text-sm leading-relaxed"
            style={{ opacity: 0.65 }}
          >
            A personal clothing business built around comfort, care, and
            everyday wear — chosen with intention, one piece at a time.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:gap-10">
          {/* ABOUT */}
          <div className="space-y-4">
            <span
              className="text-[10px] font-bold uppercase sm:text-xs"
              style={{ letterSpacing: "0.28em", color: PINK }}
            >
              About
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ opacity: 0.6 }}
            >
              A home-based business founded by Binisha Adhikari, offering
              comfortable everyday clothing and small handmade pieces for the
              home.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="space-y-4">
            <span
              className="text-[10px] font-bold uppercase sm:text-xs"
              style={{ letterSpacing: "0.28em", color: PINK }}
            >
              Navigate
            </span>
            <div className="space-y-2.5 text-sm">
              {SECTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-left transition hover:opacity-100"
                  style={{ opacity: 0.6, color: BLACK }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = PINK)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = BLACK)}
                >
                  {item.label}
                </button>
              ))}
              <Link
                to="/collection"
                className="block transition"
                style={{ opacity: 0.6, color: BLACK }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PINK)}
                onMouseLeave={(e) => (e.currentTarget.style.color = BLACK)}
              >
                Full Collection
              </Link>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="space-y-4">
            <span
              className="text-[10px] font-bold uppercase sm:text-xs"
              style={{ letterSpacing: "0.28em", color: PINK }}
            >
              Categories
            </span>
            <div
              className="space-y-2.5 text-sm"
              style={{ opacity: 0.6, color: BLACK }}
            >
              {CATEGORIES.map((c) => (
                <p key={c}>{c}</p>
              ))}
            </div>
          </div>

          {/* CONTACT + SOCIAL */}
          <div className="space-y-4">
            <span
              className="text-[10px] font-bold uppercase sm:text-xs"
              style={{ letterSpacing: "0.28em", color: PINK }}
            >
              Get in Touch
            </span>

            <div className="space-y-3 text-sm">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition"
                style={{ opacity: 0.75, color: BLACK }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PINK)}
                onMouseLeave={(e) => (e.currentTarget.style.color = BLACK)}
              >
                <MessageCircle
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: PINK }}
                />
                <span>Message on WhatsApp</span>
              </a>

              {/* Instagram */}
              {SOCIAL.instagram && (
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition"
                  style={{ opacity: 0.75, color: BLACK }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = PINK)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = BLACK)}
                >
                  <Instagram
                    size={14}
                    className="mt-0.5 shrink-0"
                    style={{ color: PINK }}
                  />
                  <span>Instagram</span>
                </a>
              )}

              {/* TikTok */}
              {SOCIAL.tiktok && (
                <a
                  href={SOCIAL.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition"
                  style={{ opacity: 0.75, color: BLACK }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = PINK)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = BLACK)}
                >
                  <span
                    className="mt-0.5 shrink-0"
                    style={{ color: PINK, lineHeight: 0 }}
                  >
                    <TikTokIcon size={14} />
                  </span>
                  <span>TikTok</span>
                </a>
              )}

              {/* Shop shortcut */}
              <Link
                to="/collection"
                className="flex items-start gap-2 transition"
                style={{ opacity: 0.75, color: BLACK }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PINK)}
                onMouseLeave={(e) => (e.currentTarget.style.color = BLACK)}
              >
                <ShoppingBag
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: PINK }}
                />
                <span>Shop the Collection</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div
          className="flex flex-col items-center justify-between gap-3 border-t py-6 text-xs sm:flex-row"
          style={{ borderColor: "rgba(17,17,17,0.08)", opacity: 0.6 }}
        >
          <p>
            © {new Date().getFullYear()} Binisha Miscellany. All rights reserved.
          </p>

         
        </div>

        {/* ================= SIGN-OFF ================= */}
        <div className="pb-8 text-center">
          <p
            className="inline-flex items-center gap-1.5 text-[10px] uppercase"
            style={{ letterSpacing: "0.28em", opacity: 0.4 }}
          >
            Made with
            <Heart
              size={10}
              fill={PINK}
              style={{ color: PINK }}
              strokeWidth={0}
            />
            for everyday comfort
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
