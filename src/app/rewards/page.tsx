/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Award, Star, Crown, ChevronRight, X, Clock } from 'lucide-react';

const rewards = [
  {
    id: 'bronze',
    tier: 'Bronze',
    title: 'Vatika Hair Oil Kit',
    points: 500,
    claimed: 312,
    total: 500,
    icon: Gift,
    color: 'from-[#FFD54F]/20 to-amber-500/20',
    borderColor: 'border-amber-200/50',
    iconColor: 'text-amber-500',
    badge: '🥉'
  },
  {
    id: 'silver',
    tier: 'Silver',
    title: 'Spa Voucher ৳2,000',
    points: 2000,
    claimed: 89,
    total: 200,
    icon: Award,
    color: 'from-slate-300/20 to-slate-400/20',
    borderColor: 'border-slate-300/50',
    iconColor: 'text-slate-500',
    badge: '🥈'
  },
  {
    id: 'gold',
    tier: 'Gold',
    title: 'Samsung Galaxy Buds',
    points: 5000,
    claimed: 23,
    total: 50,
    icon: Star,
    color: 'from-yellow-300/20 to-yellow-500/20',
    borderColor: 'border-yellow-300/50',
    iconColor: 'text-yellow-500',
    badge: '🥇'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function RewardsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClaim = (points: number) => {
    setToastMessage(`You need ${points} more points!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FFF5] pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#C8E6B9] text-[#1B4332] text-sm font-semibold mb-4 border border-[#5AAE4A]/30">
            Earn & Win
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-4">
            Rewards
          </h1>
          <p className="text-[#2F7D32] max-w-2xl mx-auto">
            Collect points and redeem them for exclusive Vatika rewards, vouchers, and amazing grand prizes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {rewards.map((reward) => (
            <motion.div
              key={reward.id}
              variants={itemVariants}
              className={`bg-white/70 backdrop-blur-xl rounded-3xl p-6 border ${reward.borderColor} shadow-lg shadow-[#5AAE4A]/5 relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${reward.color} rounded-bl-full -z-10 transition-transform group-hover:scale-110`} />
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-white shadow-sm ${reward.iconColor}`}>
                  <reward.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="text-4xl">{reward.badge}</div>
              </div>

              <div className="text-sm font-semibold text-[#5AAE4A] mb-1">{reward.tier} Tier</div>
              <h3 className="text-xl font-bold text-[#1B4332] mb-4">{reward.title}</h3>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2 text-[#2F7D32]">
                  <span>Claimed</span>
                  <span className="font-semibold">{reward.claimed} / {reward.total}</span>
                </div>
                <div className="w-full bg-[#C8E6B9]/50 rounded-full h-2.5">
                  <div 
                    className="bg-[#5AAE4A] h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${(reward.claimed / reward.total) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => handleClaim(reward.points)}
                className="w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 bg-[#F8FFF5] text-[#2F7D32] border border-[#C8E6B9] hover:bg-[#C8E6B9] hover:text-[#1B4332] transition-colors"
              >
                <span>Claim for {reward.points} pts</span>
                <ChevronRight size={18} />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Grand Prize */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-1 border border-[#FFD54F] shadow-2xl shadow-[#FFD54F]/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD54F]/20 via-transparent to-[#FFD54F]/20 animate-pulse" />
          
          <div className="relative bg-white/90 backdrop-blur-sm rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFD54F] to-amber-500 text-white shadow-lg shadow-amber-500/30 flex-shrink-0">
              <Crown size={48} strokeWidth={1.5} />
            </div>

            <div className="flex-grow text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD54F]/20 text-amber-700 text-sm font-bold mb-3 border border-[#FFD54F]/50">
                <span>🏆 Grand Prize</span>
              </div>
              <h3 className="text-3xl font-bold text-[#1B4332] mb-2">Luxury Cox's Bazar Trip</h3>
              <p className="text-[#2F7D32] mb-4">3 Days / 2 Nights fully paid luxury stay for two people. Only 3 spots available!</p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-semibold text-[#5AAE4A]">
                <div className="flex items-center gap-1.5 bg-[#F8FFF5] px-4 py-2 rounded-lg border border-[#C8E6B9]">
                  <Clock size={16} />
                  Ends in: {String(timeLeft.days).padStart(2, '0')}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
                </div>
                <div className="px-4 py-2">
                  <span className="text-amber-600 font-bold">0 / 3</span> Claimed
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex-shrink-0">
              <button
                onClick={() => handleClaim(10000)}
                className="w-full md:w-auto py-4 px-8 rounded-xl font-bold text-white bg-gradient-to-r from-[#2F7D32] to-[#1B4332] hover:shadow-lg hover:shadow-[#2F7D32]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Claim for 10,000 pts</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1B4332] text-white px-6 py-4 rounded-2xl shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-[#FFD54F] animate-pulse" />
            <span className="font-medium">{toastMessage}</span>
            <button 
              onClick={() => setToastMessage(null)}
              className="ml-4 text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
