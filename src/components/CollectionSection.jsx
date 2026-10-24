import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS, CATEGORY_LABELS } from "./product";

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */
const PINK = "#FF4FA3";
const BLACK = "#111111";
const WHITE = "#FFFFFF";
const EASE = [0.22, 1, 0.36, 1];
const HEAD_FONT = '"Helvetica Neue", "Arial Black", system-ui, sans-serif';
const FEATURE_CYCLE_MS = 5500;

const cardStyle = {
  boxShadow: "0 24px 48px -24px rgba(17,17,17,0.3)",
  outline: "1px solid rgba(17,17,17,0.06)",
};
const photoFilter = { filter: "saturate(1.02) contrast(1.02)" };

const money = (n, currency = "NPR") =>
  n == null
    ? null
    : `${currency} ${new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
      }).format(n)}`;

/* ------------------------------------------------------------------ */
/* Background flourish — curved ribbon + ambient dots                 */
/* ------------------------------------------------------------------ */
function RibbonBackdrop({ reduceMotion }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute right-[-20%] top-[10%] h-[70%] w-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,79,163,0.12) 0%, rgba(255,79,163,0.03) 45%, rgba(255,79,163,0) 75%)",
        }}
      />

      <motion.svg
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-[6%] h-[85%] w-full"
        initial={
          reduceMotion ? { opacity: 0.5 } : { pathLength: 0, opacity: 0.6 }
        }
        whileInView={
          reduceMotion
            ? { opacity: 0.5 }
            : { pathLength: 1, opacity: 0.55 }
        }
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: EASE }}
        style={{ opacity: 0.5 }}
      >
        <motion.path
          d="M 40 380 Q 240 40 420 240 T 780 120"
          fill="none"
          stroke={PINK}
          strokeWidth="1"
          strokeLinecap="round"
          style={{
            pathLength: 1,
            filter: "drop-shadow(0 0 6px rgba(255,79,163,0.35))",
          }}
        />
      </motion.svg>

      {!reduceMotion &&
        [
          { x: "12%", y: "22%", s: 5, d: 9, delay: 0 },
          { x: "78%", y: "14%", s: 3, d: 11, delay: 1.5 },
          { x: "62%", y: "78%", s: 4, d: 10, delay: 0.8 },
          { x: "24%", y: "82%", s: 3, d: 12, delay: 2.4 },
          { x: "88%", y: "58%", s: 4, d: 8, delay: 3.1 },
        ].map((dot, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.s,
              height: dot.s,
              backgroundColor: PINK,
              opacity: 0.4,
            }}
            animate={{ y: [0, -14, 0], opacity: [0.25, 0.55, 0.25] }}
            transition={{
              duration: dot.d,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.delay,
            }}
          />
        ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature product                                                     */
/* ------------------------------------------------------------------ */
function FeatureProduct({ product, keyIndex }) {
  const image = product.images?.[0] || null;
  return (
    <div className="relative">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-neutral-100 sm:aspect-[3/4] lg:aspect-[4/5]"
        style={cardStyle}
      >
        <AnimatePresence mode="wait">
          {image ? (
            <motion.img
              key={`img-${keyIndex}`}
              src={image}
              alt={product.name}
              loading="eager"
              decoding="async"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
              style={photoFilter}
            />
          ) : (
            <motion.div
              key={`ph-${keyIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: "rgba(255,79,163,0.08)" }}
            >
              <span
                className="text-[10px] font-bold uppercase"
                style={{ letterSpacing: "0.3em", color: BLACK, opacity: 0.5 }}
              >
                Photo coming soon
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={`cat-${keyIndex}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase"
              style={{
                letterSpacing: "0.28em",
                backgroundColor: "rgba(17,17,17,0.85)",
                color: WHITE,
                backdropFilter: "blur(6px)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: PINK }}
              />
              {CATEGORY_LABELS[product.category] || product.category}
            </motion.span>
          </AnimatePresence>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "linear-gradient(to top, rgba(17,17,17,0.75), rgba(17,17,17,0))",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`cap-${keyIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            >
              <p
                className="text-[10px] font-bold uppercase"
                style={{ letterSpacing: "0.3em", color: PINK }}
              >
                Featured · {CATEGORY_LABELS[product.category] || product.category}
              </p>
              <h3
                className="mt-1 text-xl font-bold text-white sm:text-2xl"
                style={{ fontFamily: HEAD_FONT }}
              >
                {product.name}
              </h3>
              {money(product.price, product.currency) && (
                <p className="mt-1 text-sm font-semibold text-white/85">
                  {money(product.price, product.currency)}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-black/10">
        <motion.div
          key={`prog-${keyIndex}`}
          className="h-full origin-left rounded-full"
          style={{ backgroundColor: PINK }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: FEATURE_CYCLE_MS / 1000, ease: "linear" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Index card                                                          */
/* ------------------------------------------------------------------ */
function IndexCard({ product, active, onClick, d = 0 }) {
  const image = product.images?.[0];
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: d }}
      className="group relative flex w-full items-center gap-3 overflow-hidden rounded-md border p-3 text-left transition-all duration-300"
      style={{
        borderColor: active ? PINK : "rgba(17,17,17,0.08)",
        backgroundColor: active ? "rgba(255,79,163,0.06)" : "transparent",
      }}
    >
      <div className="h-14 w-12 shrink-0 overflow-hidden rounded bg-neutral-100">
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={photoFilter}
            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: "rgba(255,79,163,0.08)" }}
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="text-[9px] font-bold uppercase"
          style={{
            letterSpacing: "0.28em",
            color: active ? PINK : BLACK,
            opacity: active ? 1 : 0.55,
          }}
        >
          {CATEGORY_LABELS[product.category] || product.category}
        </p>
        <p
          className="mt-0.5 truncate text-sm font-semibold"
          style={{ color: BLACK, opacity: active ? 1 : 0.75 }}
        >
          {product.name}
        </p>
      </div>

      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] origin-bottom transition-transform duration-500"
        style={{
          backgroundColor: PINK,
          transform: active ? "scaleY(1)" : "scaleY(0)",
        }}
      />
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* Ticker — FIXED COPY                                                 */
/* ------------------------------------------------------------------ */
function Ticker() {
  /* CHANGED: no longer claims "MADE FROM HOME" — products are imported */
  const text = "CURATED WITH CARE · BINISHA MISCELLANY · ";
  return (
    <div
      className="relative mt-14 overflow-hidden border-y py-4 sm:mt-16"
      style={{ borderColor: "rgba(17,17,17,0.08)" }}
      aria-hidden
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 pr-6 text-[11px] font-bold uppercase sm:text-xs"
            style={{ letterSpacing: "0.42em", color: BLACK, opacity: 0.55 }}
          >
            {Array.from({ length: 6 }).map((_, k) => (
              <React.Fragment key={k}>
                <span>{text.trim()}</span>
                <span
                  className="inline-block h-1 w-1 rounded-full"
                  style={{ backgroundColor: PINK }}
                />
              </React.Fragment>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function CollectionSection({ products = PRODUCTS }) {
  const reduceMotion = useReducedMotion();
  const preview = useMemo(() => products.slice(0, 4), [products]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || preview.length < 2) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % preview.length);
    }, FEATURE_CYCLE_MS);
    return () => clearInterval(t);
  }, [reduceMotion, preview.length]);

  const active = preview[activeIndex] || preview[0];

  if (!active) return null;

  return (
    <section
      id="collection"
      className="relative overflow-hidden"
      style={{ backgroundColor: WHITE, color: BLACK }}
    >
      <RibbonBackdrop reduceMotion={reduceMotion} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 py-16 sm:py-20 md:py-24">
        {/* ---------- Header ---------- */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl"
        >
          <p
            className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase sm:text-xs"
            style={{ letterSpacing: "0.32em", color: BLACK }}
          >
            <span
              aria-hidden
              className="inline-block h-px w-6"
              style={{ backgroundColor: PINK }}
            />
            The Collection · Preview
          </p>

          {/* CHANGED: "Made from home" → "Curated with care" */}
          <h2
            className="font-extrabold uppercase"
            style={{
              fontFamily: HEAD_FONT,
              fontSize: "clamp(2rem, 6vw, 4rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: BLACK,
              margin: 0,
            }}
          >
            Comfort for everyday.
            <br />
            <span style={{ color: PINK }}>Curated with care.</span>
          </h2>

          <p
            className="mt-5 max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ opacity: 0.7 }}
          >
            A living preview of Binisha Miscellany — nightwear, winter comfort,
            maternity wear, traditional Nepali-style pieces, and handmade items
            for the home. Let the collection cycle, or tap a piece to bring it
            to the front.
          </p>
        </motion.div>

        {/* ---------- Split: Feature + Index ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <FeatureProduct product={active} keyIndex={activeIndex} />
            </motion.div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="flex flex-col gap-2">
              <p
                className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase"
                style={{ letterSpacing: "0.28em", color: BLACK, opacity: 0.55 }}
              >
                <span>In this preview</span>
                <span>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(preview.length).padStart(2, "0")}
                </span>
              </p>

              {preview.map((p, i) => (
                <IndexCard
                  key={p.id}
                  product={p}
                  active={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                  d={i * 0.06}
                />
              ))}

              <div
                className="mt-3 rounded-md border p-4"
                style={{ borderColor: "rgba(17,17,17,0.08)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`desc-${activeIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <p
                      className="text-[9px] font-bold uppercase"
                      style={{ letterSpacing: "0.3em", color: PINK }}
                    >
                      About this piece
                    </p>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ opacity: 0.75 }}
                    >
                      {active.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- CTA ---------- */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
          <Link
            to="/collection"
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:text-xs sm:tracking-[0.22em]"
            style={{
              backgroundColor: PINK,
              color: WHITE,
              boxShadow: "0 14px 30px -12px rgba(255,79,163,0.55)",
            }}
          >
            Explore the Full Collection
            <ArrowUpRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <p
            className="text-[10px] uppercase"
            style={{ letterSpacing: "0.28em", opacity: 0.5 }}
          >
            {preview.length} featured pieces · More inside
          </p>
        </div>

        {/* ---------- Ticker ---------- */}
        {!reduceMotion && <Ticker />}
      </div>
    </section>
  );
}