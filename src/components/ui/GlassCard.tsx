"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  glow?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
  glow = false,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={
        hover
          ? {
              y: -8,
              boxShadow: glow
                ? "0 20px 60px rgba(47,125,50,0.3), 0 0 40px rgba(90,174,74,0.15)"
                : "0 20px 60px rgba(0,0,0,0.12)",
            }
          : undefined
      }
      className={`
        relative overflow-hidden rounded-2xl border border-white/20
        bg-white/70 backdrop-blur-xl shadow-lg
        transition-all duration-500
        ${className}
      `}
    >
      {/* Glass shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
