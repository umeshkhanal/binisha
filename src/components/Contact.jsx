import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Instagram,
  Send,
  MessageCircle,
  ShoppingBag,
  User,
  Phone,
  Sparkles,
} from "lucide-react";

/* ================================================================== */
/* CONFIG — EDIT THESE VALUES                                          */
/* ================================================================== */
/*
 * WhatsApp number (country code + number, no +, no spaces).
 * Nepal example: 9779819123106 → keep this format.
 */
const WHATSAPP_NUMBER = "9779819123106";

/*
 * Instagram and TikTok profile URLs.
 * Paste the real URLs when ready. Leave as-is to hide the icons
 * (empty string hides the card entirely).
 */
const SOCIAL = {
  instagram: "https://www.instagram.com/binisha_miscellany",
  tiktok: "https://www.tiktok.com/@binisha_miscellany",
};

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */
const PINK = "#FF4FA3";
const BLACK = "#111111";
const WHITE = "#FFFFFF";
const BLUSH = "#FFF0F7";
const EASE = [0.22, 1, 0.36, 1];
const HEAD_FONT = '"Helvetica Neue", "Arial Black", system-ui, sans-serif';

/* ------------------------------------------------------------------ */
/* TikTok icon (lucide-react doesn't ship one)                          */
/* ------------------------------------------------------------------ */
function TikTokIcon({ size = 20, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1.84-.04z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    product: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((x) => ({ ...x, [field]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!form.contact.trim())
      e.contact = "Please add a phone number, WhatsApp, or email.";
    if (!form.message.trim()) e.message = "Please add a short message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const lines = [
      `Hi Binisha Miscellany! I have an inquiry.`,
      ``,
      `• Name: ${form.name.trim()}`,
      `• Contact: ${form.contact.trim()}`,
    ];
    if (form.product.trim()) {
      lines.push(`• Product of interest: ${form.product.trim()}`);
    }
    lines.push(``, `Message:`, form.message.trim());

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    /* Form is NOT cleared — the customer may want to send another inquiry. */
  };

  const view = reduceMotion
    ? { initial: false, animate: "visible" }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
      };

  return (
    <section
      id="contact"
      className="relative overflow-x-clip"
      style={{ backgroundColor: WHITE, color: BLACK }}
    >
      {/* Soft blush bloom behind the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,79,163,0.1) 0%, rgba(255,79,163,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,79,163,0.08) 0%, rgba(255,79,163,0) 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* Header */}
        <motion.div {...view} className="max-w-2xl">
          <p
            className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase sm:text-xs"
            style={{ letterSpacing: "0.32em", color: BLACK }}
          >
            <span
              aria-hidden
              className="inline-block h-px w-6"
              style={{ backgroundColor: PINK }}
            />
            Get in Touch
          </p>

          <h2
            className="font-extrabold uppercase"
            style={{
              fontFamily: HEAD_FONT,
              fontSize: "clamp(1.9rem, 5vw, 3.4rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Have Something in Mind?
            <br />
            <span style={{ color: PINK }}>We'd Love to Hear From You.</span>
          </h2>

          <p
            className="mt-5 max-w-lg text-sm leading-relaxed sm:text-base"
            style={{ opacity: 0.72 }}
          >
            Found something you love? Have a question about our collection?
            Get in touch to ask about products, sizes, availability, or
            placing an order.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-14 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — socials / come see more */}
          <motion.div {...view} className="lg:col-span-5">
            <div
              className="rounded-2xl border p-6 sm:p-7"
              style={{
                borderColor: "rgba(17,17,17,0.08)",
                backgroundColor: BLUSH,
              }}
            >
              <p
                className="text-[10px] font-bold uppercase"
                style={{ letterSpacing: "0.3em", color: PINK }}
              >
                Come See More
              </p>
              <h3
                className="mt-2 text-2xl font-extrabold uppercase sm:text-3xl"
                style={{ fontFamily: HEAD_FONT, letterSpacing: "-0.02em" }}
              >
                Follow the Journey
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ opacity: 0.7 }}
              >
                Discover more of our collection, see our latest arrivals, and
                follow our journey.
              </p>

              <div className="mt-6 space-y-3">
                {SOCIAL.instagram && (
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl bg-white p-4 transition hover:-translate-y-0.5"
                    style={{
                      border: "1px solid rgba(17,17,17,0.06)",
                      boxShadow: "0 8px 20px -12px rgba(17,17,17,0.15)",
                    }}
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: BLUSH, color: PINK }}
                    >
                      <Instagram size={20} strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold">
                        Instagram
                      </span>
                      <span
                        className="block truncate text-xs"
                        style={{ opacity: 0.6 }}
                      >
                        Photos, new arrivals, and behind the scenes
                      </span>
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase transition group-hover:translate-x-0.5"
                      style={{ letterSpacing: "0.2em", color: PINK }}
                    >
                      Visit
                    </span>
                  </a>
                )}

                {SOCIAL.tiktok && (
                  <a
                    href={SOCIAL.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl bg-white p-4 transition hover:-translate-y-0.5"
                    style={{
                      border: "1px solid rgba(17,17,17,0.06)",
                      boxShadow: "0 8px 20px -12px rgba(17,17,17,0.15)",
                    }}
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: BLUSH, color: BLACK }}
                    >
                      <TikTokIcon size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold">TikTok</span>
                      <span
                        className="block truncate text-xs"
                        style={{ opacity: 0.6 }}
                      >
                        Short videos and styling ideas
                      </span>
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase transition group-hover:translate-x-0.5"
                      style={{ letterSpacing: "0.2em", color: PINK }}
                    >
                      Visit
                    </span>
                  </a>
                )}
              </div>

              {/* Direct WhatsApp quick link */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase transition hover:opacity-80"
                style={{ letterSpacing: "0.2em", color: PINK }}
              >
                <MessageCircle size={14} />
                Message us on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* RIGHT — inquiry form */}
          <motion.div {...view} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-white p-6 sm:p-8"
              style={{
                border: "1px solid rgba(17,17,17,0.08)",
                boxShadow: "0 24px 48px -24px rgba(17,17,17,0.15)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: BLUSH, color: PINK }}
                >
                  <Sparkles size={18} />
                </span>
                <div>
                  <p
                    className="text-[10px] font-bold uppercase"
                    style={{ letterSpacing: "0.3em", color: PINK }}
                  >
                    Send an Inquiry
                  </p>
                  <p className="text-xs" style={{ opacity: 0.65 }}>
                    We reply personally — usually same day.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <label className="block sm:col-span-1">
                  <span
                    className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase"
                    style={{ letterSpacing: "0.24em", opacity: 0.7 }}
                  >
                    <User size={11} /> Name
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    className="w-full rounded-lg border bg-white px-3.5 py-3 text-sm outline-none transition"
                    style={{
                      borderColor: errors.name
                        ? "#e11d48"
                        : "rgba(17,17,17,0.12)",
                      backgroundColor: "rgba(255,240,247,0.25)",
                    }}
                  />
                  {errors.name && (
                    <span className="mt-1 block text-[11px] text-rose-600">
                      {errors.name}
                    </span>
                  )}
                </label>

                {/* Contact */}
                <label className="block sm:col-span-1">
                  <span
                    className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase"
                    style={{ letterSpacing: "0.24em", opacity: 0.7 }}
                  >
                    <Phone size={11} /> Contact
                  </span>
                  <input
                    type="text"
                    value={form.contact}
                    onChange={update("contact")}
                    placeholder="Phone, WhatsApp, or email"
                    className="w-full rounded-lg border bg-white px-3.5 py-3 text-sm outline-none transition"
                    style={{
                      borderColor: errors.contact
                        ? "#e11d48"
                        : "rgba(17,17,17,0.12)",
                      backgroundColor: "rgba(255,240,247,0.25)",
                    }}
                  />
                  {errors.contact && (
                    <span className="mt-1 block text-[11px] text-rose-600">
                      {errors.contact}
                    </span>
                  )}
                </label>

                {/* Product of interest */}
                <label className="block sm:col-span-2">
                  <span
                    className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase"
                    style={{ letterSpacing: "0.24em", opacity: 0.7 }}
                  >
                    <ShoppingBag size={11} /> Product of Interest{" "}
                    <span
                      className="font-normal normal-case"
                      style={{ opacity: 0.5 }}
                    >
                      (optional)
                    </span>
                  </span>
                  <input
                    type="text"
                    value={form.product}
                    onChange={update("product")}
                    placeholder="e.g. Soft Cotton Nightdress"
                    className="w-full rounded-lg border bg-white px-3.5 py-3 text-sm outline-none transition"
                    style={{
                      borderColor: "rgba(17,17,17,0.12)",
                      backgroundColor: "rgba(255,240,247,0.25)",
                    }}
                  />
                </label>

                {/* Message */}
                <label className="block sm:col-span-2">
                  <span
                    className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase"
                    style={{ letterSpacing: "0.24em", opacity: 0.7 }}
                  >
                    <MessageCircle size={11} /> Message
                  </span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us which product you're interested in or what you'd like to know…"
                    className="w-full resize-none rounded-lg border bg-white px-3.5 py-3 text-sm outline-none transition"
                    style={{
                      borderColor: errors.message
                        ? "#e11d48"
                        : "rgba(17,17,17,0.12)",
                      backgroundColor: "rgba(255,240,247,0.25)",
                    }}
                  />
                  {errors.message && (
                    <span className="mt-1 block text-[11px] text-rose-600">
                      {errors.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{
                    backgroundColor: PINK,
                    color: WHITE,
                    boxShadow: "0 14px 30px -12px rgba(255,79,163,0.55)",
                  }}
                >
                  <Send size={15} strokeWidth={2.5} />
                  Send Inquiry
                </button>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ opacity: 0.55, maxWidth: "22rem" }}
                >
                  Your inquiry will open in WhatsApp so you can review and
                  send it yourself — nothing is sent automatically.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}