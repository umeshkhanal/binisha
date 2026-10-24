// components/FloatingActions.jsx
import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "971542855881"; 
const WHATSAPP_MESSAGE = "Hi KP! I'd like to talk about a project.";
const CV_URL = "/files/CV.pdf";
const CV_FILENAME = "KP-Dilshan-CV.pdf";

export default function FloatingActions() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3"
    >
      {/* CV Button */}
      <motion.a
        href={CV_URL}
        download={CV_FILENAME}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Download CV"
        className="
          group relative flex items-center justify-center sm:justify-start gap-2.5
          w-12 h-12 sm:w-auto sm:h-auto sm:pl-3.5 sm:pr-4 sm:py-2.5
          rounded-full
          bg-slate-900/40 backdrop-blur-md
          border border-amber-400/30
          text-white
          shadow-[0_0_20px_-4px_rgba(251,191,36,0.35)]
          hover:bg-slate-900/60
          hover:border-amber-400/60
          hover:shadow-[0_0_28px_-2px_rgba(251,191,36,0.6)]
          transition-all duration-300
        "
      >
        <FileText size={18} className="text-amber-400 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline text-xs font-medium whitespace-nowrap">
          Download CV
        </span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
        className="
          group relative flex items-center justify-center sm:justify-start gap-2.5
          w-12 h-12 sm:w-auto sm:h-auto sm:pl-3.5 sm:pr-4 sm:py-2.5
          rounded-full
          bg-[#25D366]/25 backdrop-blur-md
          border border-[#25D366]/40
          text-[#25D366]
          shadow-[0_0_20px_-4px_rgba(37,211,102,0.5)]
          hover:bg-[#25D366]/35
          hover:border-[#25D366]/70
          hover:text-[#25D366]
          hover:shadow-[0_0_28px_-2px_rgba(37,211,102,0.75)]
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