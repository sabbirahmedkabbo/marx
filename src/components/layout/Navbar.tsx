"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { VatikaWordmark } from "../brand/VatikaLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/challenge", label: "Challenge" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/rewards", label: "Rewards" },
  { href: "/stores", label: "Stores" },
  { href: "/loyalty", label: "Loyalty" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-green-900/5 border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="relative z-10" aria-label="Home">
            <VatikaWordmark />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-[#1B4332]/70 transition-colors hover:text-[#2F7D32] rounded-full hover:bg-[#C8E6B9]/30"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/challenge"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2F7D32] to-[#5AAE4A] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:shadow-xl hover:shadow-green-500/40 hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              Join Now
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-10 rounded-xl p-2 text-[#1B4332] transition-colors hover:bg-[#C8E6B9]/30 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-40 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-white/20 lg:hidden"
            >
              <div className="flex flex-col gap-2 px-6 pt-24 pb-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-4 py-3 text-lg font-medium text-[#1B4332] transition-colors hover:bg-[#C8E6B9]/30"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4"
                >
                  <Link
                    href="/challenge"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2F7D32] to-[#5AAE4A] px-8 py-3 text-base font-semibold text-white shadow-lg"
                  >
                    <Sparkles className="h-5 w-5" />
                    Join the Challenge
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
