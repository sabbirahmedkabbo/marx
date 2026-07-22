/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Clock,
  Droplets,
  Zap,
  Heart,
  Play,
  Award,
  Users,
  Video,
  Trophy,
  ChevronRight,
  ArrowRight,
  Star,
  Leaf,
  Timer,
  ShoppingBag,
  Camera,
  Gift,
} from "lucide-react";

// =============== FLOATING LEAVES ===============
function FloatingLeaves() {
  const leaves = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 10,
    size: 14 + Math.random() * 18,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf text-[#5AAE4A]"
          style={{
            left: leaf.left,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            fontSize: `${leaf.size}px`,
            opacity: leaf.opacity,
          }}
        >
          🍃
        </div>
      ))}
    </div>
  );
}

// =============== COUNTDOWN TIMER ===============
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((20 * 60 - timeLeft) / (20 * 60)) * 100;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
      className="relative flex flex-col items-center"
    >
      <div className="relative h-36 w-36 sm:h-44 sm:w-44">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(200,230,185,0.3)" strokeWidth="6" />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#countdownGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.5 }}
          />
          <defs>
            <linearGradient id="countdownGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD54F" />
              <stop offset="100%" stopColor="#5AAE4A" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white tabular-nums sm:text-4xl">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs text-white/60 uppercase tracking-widest">minutes</span>
        </div>
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="mt-3 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-all hover:bg-white/20"
      >
        {isRunning ? "Pause" : "Resume"}
      </button>
    </motion.div>
  );
}

// =============== ANIMATED COUNTER ===============
function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || hasAnimated) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
            let start = 0;
            const duration = 2000;
            const startTime = performance.now();
            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              start = Math.floor(eased * end);
              setCount(start);
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(node);
    },
    [end, hasAnimated]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-[#2F7D32] sm:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-[#1B4332]/60 font-medium">{label}</div>
    </motion.div>
  );
}

// =============== MAIN LANDING PAGE ===============
export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const bottleY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], [-5, 15]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.4]);
  const bottleOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0]);

  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Nourishment in 20 Minutes",
      desc: "Deep conditioning that works with your schedule, not against it. Quick, effective, and powerful.",
    },
    {
      icon: <Droplets className="h-8 w-8" />,
      title: "No Overnight Stickiness",
      desc: "Say goodbye to greasy pillows. Vatika's formula absorbs fast and leaves your hair silky, not sticky.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Made for Busy Women",
      desc: "Whether you're a student, professional, or mom — 20 minutes is all you need for gorgeous hair.",
    },
  ];

  const steps = [
    { icon: <ShoppingBag className="h-6 w-6" />, title: "Buy Vatika", desc: "Get your Vatika Naturals hair oil from any partner store" },
    { icon: <Timer className="h-6 w-6" />, title: "20 Minute Routine", desc: "Apply, massage for 20 minutes, wash — that's it!" },
    { icon: <Camera className="h-6 w-6" />, title: "Post Your Video", desc: "Record your routine and share with #GoIn20" },
    { icon: <Gift className="h-6 w-6" />, title: "Win Rewards", desc: "Earn points, climb the leaderboard, claim prizes" },
  ];
  const recentParticipants = [
    { name: "Ayesha Rahman", city: "Dhaka", likes: 2847, avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ayesha&backgroundColor=c8e6b9", videoTitle: "My 20-Min Morning Routine ✨" },
    { name: "Nusrat Jahan", city: "Chattogram", likes: 2134, avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Nusrat&backgroundColor=c8e6b9", videoTitle: "Vatika Changed My Hair Game 💚" },
    { name: "Maliha Tasnim", city: "Sylhet", likes: 1956, avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maliha&backgroundColor=c8e6b9", videoTitle: "20 Minutes is All You Need 🌿" },
    { name: "Farzana Akter", city: "Rajshahi", likes: 1678, avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Farzana&backgroundColor=c8e6b9", videoTitle: "Busy Mom Hair Hack 💁‍♀️" },
    { name: "Sadia Islam", city: "Dhaka", likes: 1423, avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sadia&backgroundColor=c8e6b9", videoTitle: "No More Overnight Oil! 🎯" },
    { name: "Nabila Hossain", city: "Khulna", likes: 1287, avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Nabila&backgroundColor=c8e6b9", videoTitle: "College Life x Vatika 📚" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Global Dynamic Background Bottle */}
      <motion.div 
        style={{ y: bottleY, rotate: bottleRotate, scale: bottleScale, opacity: bottleOpacity }}
        className="fixed top-0 right-[-15%] w-[120%] sm:w-[80vw] max-w-[900px] pointer-events-none z-50"
      >
        <motion.img 
          src="/bgb.png" 
          alt="" 
          className="w-full h-auto object-contain drop-shadow-2xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ============ HERO SECTION ============ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B4332] via-[#2F7D32] to-[#1B4332]"
      >

        {/* Animated background orbs */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-[#5AAE4A]/20 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[15%] top-[30%] h-96 w-96 rounded-full bg-[#FFD54F]/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] left-[30%] h-80 w-80 rounded-full bg-[#C8E6B9]/15 blur-3xl"
          />
        </div>

        <FloatingLeaves />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
          {/* Campaign Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm border border-white/20"
          >
            <Sparkles className="h-4 w-4 text-[#FFD54F]" />
            <span className="text-sm font-medium text-white/90">GO IN 20 Campaign</span>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              <span className="block">Your life never</span>
              <span className="block">slows down.</span>
              <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD54F] to-[#C8E6B9]">
                Neither should your hair.
              </span>
            </h1>
          </motion.div>

          {/* Sub-tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-lg text-white/70 sm:text-xl"
          >
            20 Minutes. Zero Pause.
          </motion.p>

          {/* Countdown */}
          <div className="mt-10">
            <CountdownTimer />
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-10 flex flex-col items-stretch gap-4 w-full sm:w-auto sm:flex-row sm:justify-center px-2 sm:px-0"
          >
            <Link
              href="/challenge"
              className="group inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-full bg-gradient-to-r from-[#FFD54F] to-[#FFC107] px-8 py-4 text-base font-bold text-[#1B4332] shadow-xl shadow-amber-400/25 transition-all hover:shadow-2xl hover:shadow-amber-400/40 hover:scale-105"
            >
              <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
              Join the Challenge
            </Link>
            <Link
              href="/rewards"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50"
            >
              Explore Rewards
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FFF5] to-transparent" />
      </motion.section>

      {/* ============ WHY GO IN 20 ============ */}
      <section className="relative py-24 px-4 bg-[#F8FFF5]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="mb-4 inline-block rounded-full bg-[#C8E6B9]/60 px-4 py-1.5 text-sm font-semibold text-[#1B4332]">
              Why GO IN 20?
            </span>
            <h2 className="text-3xl font-bold text-[#1B4332] sm:text-4xl lg:text-5xl">
              Three Reasons to Love It
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(47,125,50,0.15)" }}
                className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl p-8 shadow-lg transition-all duration-500"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />
                <div className="relative z-10">
                  <div className="mb-5 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#C8E6B9] to-[#5AAE4A]/20 p-4 text-[#2F7D32] transition-transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#1B4332]">{feature.title}</h3>
                  <p className="text-[#1B4332]/60 leading-relaxed">{feature.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#2F7D32]">
                    <span>✓ Included</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#F8FFF5] to-[#C8E6B9]/20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="mb-4 inline-block rounded-full bg-[#C8E6B9]/60 px-4 py-1.5 text-sm font-semibold text-[#1B4332]">
              Simple Steps
            </span>
            <h2 className="text-3xl font-bold text-[#1B4332] sm:text-4xl lg:text-5xl">
              How It Works
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5AAE4A] via-[#2F7D32] to-[#FFD54F] md:left-1/2 md:-translate-x-px" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative mb-12 flex items-start gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Step circle */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2F7D32] to-[#5AAE4A] text-white shadow-lg shadow-green-500/30"
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`flex-1 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 p-6 shadow-lg ${
                  i % 2 === 0 ? "md:mr-auto md:max-w-[45%]" : "md:ml-auto md:max-w-[45%]"
                }`}>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#5AAE4A]">
                    Step {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#1B4332]">{step.title}</h3>
                  <p className="mt-1 text-sm text-[#1B4332]/60">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LIVE COMMUNITY STATS ============ */}
      <section className="relative py-24 px-4 bg-[#F8FFF5]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="mb-4 inline-block rounded-full bg-[#C8E6B9]/60 px-4 py-1.5 text-sm font-semibold text-[#1B4332]">
              🔴 Live Community
            </span>
            <h2 className="text-3xl font-bold text-[#1B4332] sm:text-4xl lg:text-5xl">
              Growing Every Day
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 p-6 shadow-lg text-center"
            >
              <Users className="mx-auto mb-3 h-8 w-8 text-[#2F7D32]" />
              <Counter end={8423} label="Participants" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 p-6 shadow-lg text-center"
            >
              <Video className="mx-auto mb-3 h-8 w-8 text-[#5AAE4A]" />
              <Counter end={3150} label="Videos" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 p-6 shadow-lg text-center"
            >
              <Star className="mx-auto mb-3 h-8 w-8 text-[#FFD54F]" />
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2F7D32] sm:text-5xl">1.2M</div>
                <div className="mt-2 text-sm text-[#1B4332]/60 font-medium">Reach</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 p-6 shadow-lg text-center"
            >
              <Trophy className="mx-auto mb-3 h-8 w-8 text-amber-600" />
              <Counter end={426} label="Rewards Claimed" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ RECENT PARTICIPANTS ============ */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#F8FFF5] to-[#C8E6B9]/10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="mb-4 inline-block rounded-full bg-[#C8E6B9]/60 px-4 py-1.5 text-sm font-semibold text-[#1B4332]">
              Community
            </span>
            <h2 className="text-3xl font-bold text-[#1B4332] sm:text-4xl lg:text-5xl">
              Recent Participants
            </h2>
          </motion.div>

          {/* Horizontal scrolling cards */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {recentParticipants.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="min-w-[280px] snap-start flex-shrink-0 overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-500"
              >
                {/* Video placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-[#C8E6B9] to-[#5AAE4A]/30 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg cursor-pointer"
                  >
                    <Play className="h-6 w-6 text-[#2F7D32] ml-1" />
                  </motion.div>
                  <div className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
                    0:20
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="h-10 w-10 rounded-full bg-[#C8E6B9]"
                    />
                    <div>
                      <div className="text-sm font-semibold text-[#1B4332]">{p.name}</div>
                      <div className="text-xs text-[#1B4332]/50">{p.city}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#1B4332]/70 mb-3">{p.videoTitle}</p>
                  <div className="flex items-center gap-1 text-sm text-[#1B4332]/50">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span>{p.likes.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B4332] via-[#2F7D32] to-[#1B4332]" />
        <FloatingLeaves />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Ready to <span className="text-[#FFD54F]">GO IN 20</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Join thousands of women who are taking 20 minutes for themselves. Your hair deserves it.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/challenge"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD54F] to-[#FFC107] px-8 py-4 text-base font-bold text-[#1B4332] shadow-xl transition-all hover:shadow-2xl hover:scale-105"
            >
              Start Your Challenge
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              <Award className="h-5 w-5" />
              View Leaderboard
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
