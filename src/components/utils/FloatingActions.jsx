// components/FloatingActions.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "9779819123106";
const WHATSAPP_MESSAGE =
  "Hi Binisha Miscellany! I'd like to ask about a piece from your collection.";

export default function FloatingActions() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6"
    >
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Chat with Binisha Miscellany on WhatsApp"
        className="
          group relative inline-flex items-center justify-center gap-2
          h-12 px-4 sm:h-auto sm:px-4 sm:py-2.5
          rounded-full
          bg-[#FF4FA3] text-white
          transition-all duration-300
          hover:bg-[#E63E90]
        "
        style={{
          boxShadow:
            "0 14px 30px -12px rgba(255,79,163,0.6), 0 4px 10px -6px rgba(255,79,163,0.45)",
          letterSpacing: "0.16em",
        }}
      >
        <FaWhatsapp size={16} className="sm:w-3.5 sm:h-3.5" />
        <span className="hidden sm:inline text-[10px] font-bold uppercase">
          WhatsApp
        </span>
      </motion.a>
    </motion.div>
  );
}