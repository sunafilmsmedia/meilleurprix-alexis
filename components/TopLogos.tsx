"use client";

import { motion } from "framer-motion";
import { BRAND } from "@/lib/brand";

export default function TopLogos() {
  const { name, tagline } = BRAND.wordmark;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-4 sm:top-6 sm:left-6 z-30 pointer-events-none leading-tight"
    >
      <p className="font-serif italic text-lg sm:text-xl text-[var(--color-brand-100)]">{name}</p>
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold)]">
        {tagline}
      </p>
    </motion.div>
  );
}
