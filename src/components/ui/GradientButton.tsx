"use client";

import { motion } from "framer-motion";
import { ReactNode, useCallback, useRef } from "react";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function GradientButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  href,
  disabled = false,
  type = "button",
}: GradientButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleRipple = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      onClick?.();
    },
    [onClick]
  );

  const baseClasses =
    "relative overflow-hidden font-semibold rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer";

  const sizeClasses = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#2F7D32] to-[#5AAE4A] text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40",
    accent:
      "bg-gradient-to-r from-[#FFD54F] to-[#FFC107] text-[#1B4332] shadow-lg shadow-amber-400/25 hover:shadow-xl hover:shadow-amber-400/40",
    outline:
      "border-2 border-[#2F7D32] text-[#2F7D32] hover:bg-[#2F7D32] hover:text-white bg-transparent",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
      {href ? (
        <a href={href} className={classes}>
          {children}
        </a>
      ) : (
        <button
          ref={btnRef}
          type={type}
          disabled={disabled}
          onClick={handleRipple}
          className={classes}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
