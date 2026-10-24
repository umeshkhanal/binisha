import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  X,
  Minus,
  Plus,
  ShoppingBag,
  MessageCircle,
  Home as HomeIcon,
} from "lucide-react";
import { PRODUCTS, CATEGORY_LABELS } from "./product";

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */
const PINK = "#FF4FA3";
const BLACK = "#111111";
const WHITE = "#FFFFFF";
const BLUSH = "#FFF0F7";
const EASE = [0.22, 1, 0.36, 1];
const HEAD_FONT = '"Helvetica Neue", "Arial Black", system-ui, sans-serif';

const WHATSAPP_NUMBER = "9771553531996";
const CURRENCY = "NPR";
const CART_KEY = "bm_cart_v2";

const photoFilter = { filter: "saturate(1.02) contrast(1.02)" };

const money = (n) =>
  n == null
    ? null
    : `${CURRENCY} ${new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
      }).format(n)}`;

/* ------------------------------------------------------------------ */
/* Image with skeleton                                                 */
/* ------------------------------------------------------------------ */
function Img({ src, alt, className = "", eager = false }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center ${className}`}
        style={{ backgroundColor: "rgba(255,79,163,0.08)" }}
      >
        <span
          className="text-[9px] font-bold uppercase"
          style={{ letterSpacing: "0.28em", color: BLACK, opacity: 0.4 }}
        >
          No image
        </span>
      </div>
    );
  }
  return (
    <>
      {!loaded && (
        <div
          className={`absolute inset-0 animate-pulse ${className}`}
          style={{ backgroundColor: "rgba(17,17,17,0.06)" }}
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`h-full w-full object-cover ${className}`}
        style={photoFilter}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Compact tile for the catalogue                                      */
/* ------------------------------------------------------------------ */
function ProductTile({ product, onClick, d = 0 }) {
  const unavailable = product.inStock === false;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE, delay: d }}
      className="group flex flex-col rounded-lg border bg-white text-left transition hover:shadow-md"
      style={{ borderColor: "rgba(17,17,17,0.08)" }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-neutral-100">
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
          <Img src={product.images?.[0]} alt={product.name} />
        </div>
        {unavailable && (
          <span
            className="absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[8px] font-bold uppercase"
            style={{
              letterSpacing: "0.18em",
              backgroundColor: "rgba(17,17,17,0.85)",
              color: WHITE,
            }}
          >
            Unavailable
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 py-2.5">
        <p
          className="text-[8px] font-bold uppercase"
          style={{ letterSpacing: "0.26em", color: PINK }}
        >
          {CATEGORY_LABELS[product.category] || product.category}
        </p>
        <h3 className="mt-0.5 line-clamp-2 text-xs font-semibold leading-snug sm:text-sm">
          {product.name}
        </h3>
        {money(product.price) && (
          <p className="mt-1 text-sm font-bold">{money(product.price)}</p>
        )}
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* In-page detail view (replaces the grid when a product is selected)  */
/* ------------------------------------------------------------------ */
function ProductDetail({ product, onBack, onAdd, onBuyNow }) {
  const [activeMedia, setActiveMedia] = useState(0);
  const [qty, setQty] = useState(1);
  const unavailable = product.inStock === false;

  useEffect(() => {
    setActiveMedia(0);
    setQty(1);
  }, [product.id]);

  const media = useMemo(
    () => [
      ...(product.images || []).map((src) => ({ type: "image", src })),
      ...(product.video ? [{ type: "video", src: product.video }] : []),
    ],
    [product],
  );

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-70 sm:text-[11px]"
      >
        <ArrowLeft size={13} />
        Back to collection
      </button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
        {/* Gallery */}
        <div>
          <div
            className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100"
            style={{ boxShadow: "0 24px 48px -24px rgba(17,17,17,0.25)" }}
          >
            {media.length > 0 ? (
              media[activeMedia].type === "video" ? (
                <video
                  src={media[activeMedia].src}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Img src={media[activeMedia].src} alt={product.name} eager />
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span
                  className="text-[10px] font-bold uppercase"
                  style={{ letterSpacing: "0.3em", opacity: 0.4 }}
                >
                  Photo coming soon
                </span>
              </div>
            )}
            {unavailable && (
              <span
                className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase"
                style={{
                  letterSpacing: "0.2em",
                  backgroundColor: "rgba(17,17,17,0.85)",
                  color: WHITE,
                }}
              >
                Currently unavailable
              </span>
            )}
          </div>

          {media.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMedia(i)}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100"
                  style={{
                    border:
                      i === activeMedia
                        ? `2px solid ${PINK}`
                        : "1px solid rgba(17,17,17,0.1)",
                    opacity: i === activeMedia ? 1 : 0.65,
                  }}
                  aria-label={`Media ${i + 1}`}
                >
                  {m.type === "video" ? (
                    <div
                      className="flex h-full w-full items-center justify-center text-[8px] font-bold"
                      style={{ backgroundColor: "#111", color: "#fff" }}
                    >
                      VIDEO
                    </div>
                  ) : (
                    <Img src={m.src} alt="" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p
            className="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[9px] font-bold uppercase"
            style={{
              letterSpacing: "0.28em",
              backgroundColor: "rgba(255,79,163,0.1)",
              color: PINK,
            }}
          >
            {CATEGORY_LABELS[product.category] || product.category}
          </p>

          <h1
            className="mt-3 text-2xl font-extrabold uppercase sm:text-3xl"
            style={{
              fontFamily: HEAD_FONT,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {product.name}
          </h1>

          {money(product.price) && (
            <p
              className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: HEAD_FONT }}
            >
              {money(product.price)}
            </p>
          )}

          {product.description && (
            <p
              className="mt-5 text-sm leading-relaxed sm:text-base"
              style={{ opacity: 0.75 }}
            >
              {product.description}
            </p>
          )}

          {product.details?.length > 0 && (
            <ul className="mt-5 space-y-2 text-sm" style={{ opacity: 0.75 }}>
              {product.details.map((d, i) => (
                <li key={i} className="flex gap-2">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: PINK }}
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}

          {!unavailable && (
            <div className="mt-6">
              <p
                className="mb-2 text-[10px] font-bold uppercase"
                style={{ letterSpacing: "0.3em", opacity: 0.6 }}
              >
                Quantity
              </p>
              <div
                className="inline-flex items-center gap-3 rounded-full border px-2 py-1.5"
                style={{ borderColor: "rgba(17,17,17,0.15)" }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="min-w-6 text-center text-sm font-bold">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <button
              disabled={unavailable}
              onClick={() => onAdd(product, qty)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                backgroundColor: PINK,
                color: WHITE,
                boxShadow: "0 14px 30px -12px rgba(255,79,163,0.55)",
              }}
            >
              <ShoppingBag size={16} strokeWidth={2.5} />
              Add to order
            </button>
            <button
              disabled={unavailable}
              onClick={() => onBuyNow(product, qty)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                borderColor: PINK,
                color: PINK,
                backgroundColor: "rgba(255,79,163,0.04)",
              }}
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              Order on WhatsApp
            </button>
          </div>

          <p
            className="mt-4 text-[11px] leading-relaxed"
            style={{ opacity: 0.55 }}
          >
            Orders and payment are arranged directly with Binisha Miscellany on
            WhatsApp. Delivery details are confirmed in the chat.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Cart drawer                                                         */
/* ------------------------------------------------------------------ */
function CartDrawer({ open, items, onClose, onQty, onRemove, onCheckout }) {
  const subtotal = items.reduce(
    (s, it) => s + (it.price == null ? 0 : it.price * it.qty),
    0,
  );
  const anyPrice = items.some((it) => it.price != null);
  const count = items.reduce((s, it) => s + it.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(17,17,17,0.45)" }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3
                className="text-sm font-bold uppercase"
                style={{ letterSpacing: "0.28em" }}
              >
                Your Order
                {count > 0 && (
                  <span className="ml-2 text-[11px] opacity-50">({count})</span>
                )}
              </h3>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="mt-20 text-center">
                  <div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: BLUSH }}
                  >
                    <ShoppingBag size={26} style={{ color: PINK }} />
                  </div>
                  <p
                    className="mt-4 text-base font-bold uppercase"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    Your order is empty
                  </p>
                  <p className="mt-1 text-sm" style={{ opacity: 0.55 }}>
                    Add a piece from the collection to start your order.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase"
                    style={{
                      letterSpacing: "0.2em",
                      borderColor: "rgba(17,17,17,0.15)",
                    }}
                  >
                    Continue browsing
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((it) => (
                    <li key={it.key} className="flex gap-3">
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                        <Img src={it.images?.[0]} alt={it.name} />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="truncate text-sm font-semibold">
                          {it.name}
                        </p>
                        {it.price != null && (
                          <p className="mt-0.5 text-xs font-semibold">
                            {money(it.price)}
                          </p>
                        )}
                        <div className="mt-auto flex items-center gap-2 pt-2">
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-full border hover:bg-neutral-50"
                            onClick={() => onQty(it.key, -1)}
                            aria-label="Decrease"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="min-w-5 text-center text-xs font-bold">
                            {it.qty}
                          </span>
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-full border hover:bg-neutral-50"
                            onClick={() => onQty(it.key, +1)}
                            aria-label="Increase"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            className="ml-auto text-[11px] underline"
                            style={{ opacity: 0.55 }}
                            onClick={() => onRemove(it.key)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t px-5 py-4">
              {anyPrice ? (
                <div className="flex items-center justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">{money(subtotal)}</span>
                </div>
              ) : (
                <p className="text-xs" style={{ opacity: 0.6 }}>
                  Prices will appear once added to product data.
                </p>
              )}

              <button
                disabled={items.length === 0}
                onClick={onCheckout}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor: PINK,
                  color: WHITE,
                  boxShadow: "0 14px 30px -12px rgba(255,79,163,0.55)",
                }}
              >
                <MessageCircle size={16} strokeWidth={2.5} />
                Send order via WhatsApp
              </button>
              <p
                className="mt-3 text-center text-[11px] leading-relaxed"
                style={{ opacity: 0.55 }}
              >
                You'll be redirected to WhatsApp with your order ready to send.
                Payment and delivery will be arranged in the chat.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function CollectionPage() {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  const selected = selectedId
    ? PRODUCTS.find((p) => p.id === selectedId)
    : null;

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  const cartTotal = cart.reduce(
    (s, x) => s + (x.price == null ? 0 : x.price * x.qty),
    0,
  );

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const key = product.id;
      const existing = prev.find((x) => x.key === key);
      if (existing) {
        return prev.map((x) =>
          x.key === key ? { ...x, qty: x.qty + qty } : x,
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          currency: CURRENCY,
          images: product.images,
          qty,
        },
      ];
    });
    setCartOpen(true);
  };

  const changeQty = (key, delta) =>
    setCart((prev) =>
      prev
        .map((x) =>
          x.key === key ? { ...x, qty: Math.max(1, x.qty + delta) } : x,
        )
        .filter((x) => x.qty > 0),
    );

  const removeItem = (key) =>
    setCart((prev) => prev.filter((x) => x.key !== key));

  const sendSingleToWhatsApp = (product, qty) => {
    const line = `• ${product.name} × ${qty} — ${money(
      (product.price || 0) * qty,
    )}`;
    const message =
      `Hi Binisha Miscellany! I'd like to order:\n\n` +
      line +
      (product.price ? `\n\nTotal: ${money(product.price * qty)}` : "") +
      `\n\nMy name: \nMy delivery address: `;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const checkoutCart = () => {
    if (cart.length === 0) return;
    const lines = cart.map(
      (it) => `• ${it.name} × ${it.qty} — ${money(it.price * it.qty)}`,
    );
    const totalLine = cartTotal > 0 ? `\n\nTotal: ${money(cartTotal)}` : "";
    const message =
      `Hi Binisha Miscellany! I'd like to place an order:\n\n` +
      lines.join("\n") +
      totalLine +
      `\n\nMy name: \nMy delivery address: `;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const view = reduceMotion
    ? { initial: false, animate: "visible" }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
      };

  return (
    <main
      className="relative min-h-screen overflow-x-clip"
      style={{ backgroundColor: BLUSH, color: BLACK }}
    >
      {/* Soft pink bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,79,163,0.1) 0%, rgba(255,79,163,0) 70%)",
        }}
      />

      {/* Floating cart — fixed at top-20, always visible on scroll */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed right-4 md:top-24 top-32 z-40 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:-translate-y-0.5 sm:right-6 sm:px-4 sm:py-2.5 sm:text-[11px] lg:right-8"
        style={{
          boxShadow:
            "0 14px 30px -12px rgba(17,17,17,0.35), 0 0 0 1px rgba(17,17,17,0.06)",
        }}
        aria-label="Open order"
      >
        <ShoppingBag size={14} />
        <span className="hidden sm:inline">Order</span>
        {cartCount > 0 && (
          <span
            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold"
            style={{ backgroundColor: PINK, color: WHITE }}
          >
            {cartCount}
          </span>
        )}
      </button>

      {/* Header + grid OR detail */}
      <div className="relative mx-auto w-full max-w-7xl px-4 md:pt-24 pt-32 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="catalogue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {/* Catalogue header */}
              <header className="pb-5 sm:pb-6">
                <nav
                  className="mb-3 flex items-center gap-1.5 text-[9px] font-semibold uppercase"
                  style={{ letterSpacing: "0.22em", opacity: 0.55 }}
                >
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 hover:opacity-100"
                  >
                    <HomeIcon size={10} /> Home
                  </Link>
                  <span>/</span>
                  <span style={{ color: BLACK, opacity: 1 }}>Collection</span>
                </nav>

                <h1
                  className="font-extrabold uppercase"
                  style={{
                    fontFamily: HEAD_FONT,
                    fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  Comfort for everyday.{" "}
                  <span style={{ color: PINK }}>Curated with care.</span>
                </h1>

                <p
                  className="mt-3 max-w-xl text-xs leading-relaxed sm:text-sm"
                  style={{ opacity: 0.7 }}
                >
                  Tap any piece to see its details. Add to your order and send
                  it to Binisha Miscellany on WhatsApp — payment and delivery
                  are arranged in the chat.
                </p>
              </header>

              {/* Compact grid */}
              <section className="pb-32">
                <motion.div
                  {...view}
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4"
                >
                  {PRODUCTS.map((p, i) => (
                    <ProductTile
                      key={p.id}
                      product={p}
                      onClick={() => setSelectedId(p.id)}
                      d={i * 0.04}
                    />
                  ))}
                </motion.div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key={`detail-${selected.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="pb-24"
            >
              <ProductDetail
                product={selected}
                onBack={() => setSelectedId(null)}
                onAdd={addToCart}
                onBuyNow={sendSingleToWhatsApp}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating view-order button on mobile */}
      {cartCount > 0 && (
        <motion.button
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-bold uppercase shadow-2xl md:hidden"
          style={{
            letterSpacing: "0.18em",
            backgroundColor: PINK,
            color: WHITE,
            boxShadow: "0 20px 40px -18px rgba(255,79,163,0.7)",
          }}
        >
          <ShoppingBag size={13} />
          View order · {cartCount} · {money(cartTotal)}
        </motion.button>
      )}

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onRemove={removeItem}
        onCheckout={checkoutCart}
      />
    </main>
  );
}
