// NavBar.jsx — Binisha Miscellany
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { assets } from "../assets/assets";

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */
const PINK = "#FF4FA3";
const BLACK = "#111111";
const WHITE = "#FFFFFF";

/* ------------------------------------------------------------------ */
/* Nav sections — all scroll targets on the home page                  */
/* ------------------------------------------------------------------ */
const SECTIONS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Collection", id: "collection" },
  { label: "Contact", id: "contact" },
];

export default function NavBar() {
  const [active, setActive] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  const onHome = location.pathname === "/";

  /* ---------------- Scroll to section ---------------- */
  const scrollToSection = (id) => {
    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = window.innerWidth < 1024 ? 80 : 40;
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

  /* ---------------- Active section tracking ---------------- */
  useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }

    setActive("home");

    const ids = SECTIONS.map((s) => s.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Keep Contact active through the footer
      if (scrollPosition >= pageHeight - 10) {
        setActive("contact");
        return;
      }

      const mid = window.innerHeight / 2.5;
      let current = "home";

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const r = el.getBoundingClientRect();

        if (r.top <= mid && r.bottom >= mid) {
          current = id;
        }
      });

      // Keep Contact active when scrolling through the footer
      const footer = document.querySelector("footer");

      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;

        if (footerTop <= window.innerHeight) {
          current = "contact";
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname, onHome]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: "rgba(255,255,255,0.94)",
        borderColor: "rgba(17,17,17,0.08)",
      }}
    >
      {/* ================= ROW 1 — LOGO + CTA ================= */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => {
            if (onHome) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/");
            }
          }}
          className="flex min-w-0 items-center gap-2 sm:gap-2.5"
          aria-label="Binisha Miscellany — home"
        >
          {assets.logo ? (
            <img
              src={assets.logo}
              alt="Binisha Miscellany"
              className="h-8 w-auto shrink-0 object-contain sm:h-9"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
              style={{ backgroundColor: PINK, color: WHITE }}
            >
              BM
            </span>
          )}
          <span className="flex min-w-0 flex-col leading-none">
            <span
              className="truncate text-sm font-extrabold uppercase sm:text-base"
              style={{ letterSpacing: "0.04em", color: BLACK }}
            >
              Binisha Miscellany
            </span>
            <span
              className="mt-0.5 truncate text-[8px] font-semibold uppercase sm:text-[9px]"
              style={{ letterSpacing: "0.3em", color: PINK }}
            >
              Women's Clothing
            </span>
          </span>
        </button>

        {/* Desktop nav — inline links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((item) => {
            const isActive = onHome && active === item.id;
            return (
              <li key={item.label}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative rounded-full px-3.5 py-2 text-[12px] font-semibold uppercase transition ${
                    isActive ? "" : "hover:opacity-70"
                  }`}
                  style={{
                    letterSpacing: "0.14em",
                    color: isActive ? BLACK : "rgba(17,17,17,0.7)",
                  }}
                >
                  <span className="relative inline-block">
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full"
                        style={{ backgroundColor: PINK }}
                      />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <Link
          to="/collection"
          className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[9px] font-bold uppercase transition hover:-translate-y-0.5 sm:gap-2 sm:px-4 sm:py-2 sm:text-[11px]"
          style={{
            letterSpacing: "0.12em",
            backgroundColor: PINK,
            color: WHITE,
            boxShadow: "0 10px 24px -12px rgba(255,79,163,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          {" "}
          <ShoppingBag size={13} strokeWidth={2.5} />{" "}
          <span>Shop Collection</span>{" "}
        </Link>
      </div>

      {/* ================= ROW 2 — MOBILE PILLS ================= */}
      <div
        className="border-t lg:hidden"
        style={{ borderColor: "rgba(17,17,17,0.08)" }}
      >
        <div className="no-scrollbar mx-auto justify-center flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
          {SECTIONS.map((item) => {
            const isActive = onHome && active === item.id;
            return (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="shrink-0 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold uppercase transition"
                style={{
                  letterSpacing: "0.14em",
                  backgroundColor: isActive ? PINK : WHITE,
                  color: isActive ? WHITE : "rgba(17,17,17,0.75)",
                  borderColor: isActive ? PINK : "rgba(17,17,17,0.14)",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
