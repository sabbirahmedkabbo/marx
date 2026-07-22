'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, Zap, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const sections = [
    {
      id: "campaign",
      icon: <Leaf className="w-8 h-8 text-[#5AAE4A]" />,
      title: "The Campaign",
      content: [
        "GO IN 20 is a revolutionary campaign by Vatika Naturals challenging busy women to dedicate just 20 minutes to their hair care.",
        "In a world that never stops, Vatika proves that nourishment doesn't have to take forever."
      ]
    },
    {
      id: "vibe",
      icon: <Sparkles className="w-8 h-8 text-[#FFD54F]" />,
      title: "Main Character Vibe",
      content: [
        "Own your moment, be the protagonist, and make 20 minutes your power move.",
        "This isn't just hair care - it's a statement. A declaration that you deserve premium care without compromising your schedule."
      ]
    },
    {
      id: "momentum",
      icon: <Zap className="w-8 h-8 text-[#2F7D32]" />,
      title: "Momentum",
      content: [
        "Experience viral growth and join the community challenge that's taking over social media.",
        "Thousands are joining daily, redefining what it means to practice effective self-care in a fast-paced world."
      ]
    },
    {
      id: "tech",
      icon: <Clock className="w-8 h-8 text-[#1B4332]" />,
      title: "20 Minute Technology",
      content: [
        "Powered by Vatika's proprietary formula with natural ingredients that penetrate and nourish in exactly 20 minutes.",
        "No overnight oiling, no stickiness, just beautiful, tangible results."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FFF5] pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#E8F5E9] text-[#2F7D32] font-semibold text-sm tracking-widest uppercase mb-4 shadow-sm border border-[#C8E6B9]/50">
            Discover the Movement
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-[#2F7D32] to-[#5AAE4A] text-transparent bg-clip-text pb-2">
            About GO IN 20
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Redefining hair care for the unstoppable generation.
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl shadow-[#5AAE4A]/5 p-8 relative overflow-hidden group"
            >
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C8E6B9]/30 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform duration-500 group-hover:scale-150 pointer-events-none" />
              
              <div className="w-16 h-16 bg-[#F8FFF5] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[#E8F5E9]">
                {section.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-[#1B4332] mb-4">
                {section.title}
              </h3>
              
              <div className="space-y-3 text-gray-600 leading-relaxed font-medium">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-br from-[#1B4332] to-[#2F7D32] rounded-3xl p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Background patterns */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Ready to Join the Movement?
            </h2>
            <Link href="/challenge" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#5AAE4A] to-[#2F7D32] text-white rounded-full px-10 py-4 font-bold text-lg shadow-lg flex items-center gap-3 border border-white/20 hover:shadow-[#5AAE4A]/30 hover:shadow-xl transition-shadow"
              >
                Take the Challenge
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
