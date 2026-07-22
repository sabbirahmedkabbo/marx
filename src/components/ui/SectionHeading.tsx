"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-4 inline-block rounded-full bg-[#C8E6B9]/60 px-4 py-1.5 text-sm font-semibold text-[#1B4332] backdrop-blur-sm"
        >
          {badge}
        </motion.span>
      )}
      <h2 className="text-3xl font-bold text-[#1B4332] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1B4332]/60">{subtitle}</p>
      )}
    </motion.div>
  );
}
