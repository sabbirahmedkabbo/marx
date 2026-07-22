'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Gift, RotateCcw } from 'lucide-react';

export default function LoyaltyPage() {
  const [stamps, setStamps] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const TOTAL_STAMPS = 8;
  const isComplete = stamps === TOTAL_STAMPS;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCollect = () => {
    if (stamps < TOTAL_STAMPS) {
      setStamps(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setStamps(0);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#F8FFF5] pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#C8E6B9] text-[#1B4332] font-semibold text-sm tracking-wide uppercase"
          >
            Collect & Win
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1B4332] tracking-tight"
          >
            Loyalty Card
          </motion.h1>
        </div>

        {/* Loyalty Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gradient-to-br from-[#1B4332] to-[#2F7D32] rounded-3xl p-8 shadow-2xl max-w-md mx-auto overflow-hidden"
        >
          {/* Card Details */}
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-2xl font-bold text-white tracking-widest mb-1 flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-[#FFD54F]" fill="currentColor" />
              VATIKA NATURALS
              <Star className="w-5 h-5 text-[#FFD54F]" fill="currentColor" />
            </h2>
            <p className="text-[#C8E6B9] font-medium tracking-wide">GO IN 20 LOYALTY</p>
          </div>

          {/* Stamps Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8 relative z-10">
            {Array.from({ length: TOTAL_STAMPS }).map((_, index) => {
              const isFilled = index < stamps;
              return (
                <div key={index} className="flex justify-center items-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isFilled ? 'bg-[#FFD54F] shadow-lg shadow-[#FFD54F]/20' : 'border-2 border-dashed border-white/40'
                  }`}>
                    <AnimatePresence>
                      {isFilled && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                          <Check className="w-8 h-8 text-[#1B4332]" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center text-white/90 font-medium relative z-10">
            {stamps}/{TOTAL_STAMPS} stamps collected
          </div>

          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFD54F]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        </motion.div>

        {/* Action Button & Completion State */}
        <div className="text-center relative">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.button
                key="collect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCollect}
                className="bg-gradient-to-r from-[#FFD54F] to-[#FFC107] text-[#1B4332] rounded-full px-8 py-4 font-bold text-lg shadow-xl shadow-[#FFD54F]/20 flex items-center gap-2 mx-auto"
              >
                <Star className="w-5 h-5" fill="currentColor" />
                Collect Stamp
              </motion.button>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="inline-flex flex-col items-center p-6 bg-white rounded-3xl shadow-xl shadow-[#5AAE4A]/10 border border-[#5AAE4A]/20">
                  <Gift className="w-12 h-12 text-[#5AAE4A] mb-3" />
                  <h3 className="text-2xl font-bold text-[#1B4332] mb-1">Reward Unlocked! 🎉</h3>
                  <p className="text-[#2F7D32] font-medium">You've earned a free Vatika Hair Oil!</p>
                </div>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8F5E9] text-[#2F7D32] rounded-full font-semibold hover:bg-[#C8E6B9] transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Card
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confetti */}
          {isComplete && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
              {Array.from({ length: 50 }).map((_, i) => {
                const colors = ['#FFD54F', '#5AAE4A', '#2F7D32', '#1B4332', '#C8E6B9'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                return (
                  <motion.div
                    key={`confetti-${i}`}
                    className="absolute top-1/2 left-1/2 w-3 h-3 rounded-sm"
                    style={{ backgroundColor: color }}
                    initial={{
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 0,
                      opacity: 1
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * window.innerWidth,
                      y: (Math.random() - 0.5) * window.innerHeight * 1.5,
                      rotate: Math.random() * 720 - 360,
                      scale: Math.random() * 1.5 + 0.5,
                      opacity: 0
                    }}
                    transition={{
                      duration: Math.random() * 2 + 1.5,
                      ease: "easeOut",
                      delay: Math.random() * 0.2
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Milestones */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 pt-8"
        >
          {/* Milestone 1 */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-6 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-[#1B4332]">Mini Vatika Kit</h4>
                <p className="text-[#5AAE4A] font-medium text-sm">4 Stamps</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2F7D32]">
                <Gift className="w-5 h-5" />
              </div>
            </div>
            
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#5AAE4A] to-[#2F7D32]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((stamps / 4) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-right text-xs text-gray-500 mt-2 font-medium">
              {stamps >= 4 ? 'Unlocked!' : `${Math.max(4 - stamps, 0)} more to go`}
            </p>
          </div>

          {/* Milestone 2 */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-6 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-[#1B4332]">Full Size Collection</h4>
                <p className="text-[#5AAE4A] font-medium text-sm">8 Stamps</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#FFF8E1] flex items-center justify-center text-[#FFC107]">
                <Star className="w-5 h-5" />
              </div>
            </div>
            
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#FFD54F] to-[#FFC107]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((stamps / 8) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-right text-xs text-gray-500 mt-2 font-medium">
              {stamps >= 8 ? 'Unlocked!' : `${Math.max(8 - stamps, 0)} more to go`}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
