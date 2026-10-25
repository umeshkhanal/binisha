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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with Binisha Miscellany on WhatsApp"
        className="
          group relative flex items-center justify-center sm:justify-start gap-2.5
          w-12 h-12 sm:w-auto sm:h-auto sm:pl-3.5 sm:pr-4 sm:py-2.5
          rounded-full
          bg-[#25D366]/20 backdrop-blur-md
          border border-[#25D366]/45
          text-[#128C7E]
          shadow-[0_10px_24px_-10px_rgba(37,211,102,0.6),0_0_0_1px_rgba(255,255,255,0.6)_inset]
          hover:bg-[#25D366]/30
          hover:border-[#25D366]/70
          hover:shadow-[0_14px_28px_-10px_rgba(37,211,102,0.8),0_0_0_1px_rgba(255,255,255,0.7)_inset]
          transition-all duration-300
        "
      >
        <FaWhatsapp size={20} className="sm:w-4 sm:h-4" />
        <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">
          WhatsApp
        </span>
      </motion.a>
    </motion.div>
  );
}