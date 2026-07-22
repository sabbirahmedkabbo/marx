"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Leaf } from "lucide-react";
import { VatikaLogo } from "../brand/VatikaLogo";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden border-t border-[#C8E6B9]/30 bg-[#1B4332] text-white"
    >
      {/* Decorative gradient top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5AAE4A] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <VatikaLogo size={32} />
              <div>
                <span className="text-lg font-bold tracking-wider text-white">VATIKA</span>
                <span className="ml-1 text-xs tracking-wider text-[#5AAE4A]">NATURALS</span>
              </div>
            </div>
            <p className="text-sm text-white/60 max-w-xs">
              Your life never slows down. Neither should your hair. 20 minutes of nourishment, zero pause.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#FFD54F]">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "/challenge", label: "Challenge" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/rewards", label: "Rewards" },
                { href: "/stores", label: "Find Stores" },
                { href: "/loyalty", label: "Loyalty Card" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-[#5AAE4A]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Campaign */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#FFD54F]">
              Campaign
            </h3>
            <p className="text-sm text-white/60 mb-2">
              #GoIn20 — Join thousands of women taking 20 minutes for their hair.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Leaf className="h-4 w-4 text-[#5AAE4A]" />
              <span className="text-xs text-white/40">Powered by nature, designed for you</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © 2026 Vatika Naturals. This is a demonstration prototype.
          </p>
          <p className="flex items-center gap-1 text-xs text-white/40">
            Made with <Heart className="h-3 w-3 text-red-400" /> for GO IN 20
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
