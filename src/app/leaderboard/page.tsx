/* eslint-disable */
'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Trophy, MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const leaderboardData = [
  { id: 1, name: 'Ayesha Rahman', city: 'Dhaka', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ayesha&backgroundColor=c8e6b9', likes: 2847, rank: 1, points: 9850, movement: 'stable' as const },
  { id: 2, name: 'Nusrat Jahan', city: 'Chattogram', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Nusrat&backgroundColor=c8e6b9', likes: 2134, rank: 2, points: 8720, movement: 'up' as const },
  { id: 3, name: 'Maliha Tasnim', city: 'Sylhet', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maliha&backgroundColor=c8e6b9', likes: 1956, rank: 3, points: 7980, movement: 'up' as const },
  { id: 4, name: 'Farzana Akter', city: 'Dhaka', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Farzana&backgroundColor=c8e6b9', likes: 1678, rank: 4, points: 6540, movement: 'down' as const },
  { id: 5, name: 'Sadia Islam', city: 'Dhaka', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sadia&backgroundColor=c8e6b9', likes: 1423, rank: 5, points: 5890, movement: 'up' as const },
  { id: 6, name: 'Nabila Hossain', city: 'Chattogram', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Nabila&backgroundColor=c8e6b9', likes: 1287, rank: 6, points: 5210, movement: 'down' as const },
  { id: 7, name: 'Rumana Aktar', city: 'Dhaka', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rumana&backgroundColor=c8e6b9', likes: 1105, rank: 7, points: 4780, movement: 'up' as const },
  { id: 8, name: 'Tasmia Khan', city: 'Chattogram', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Tasmia&backgroundColor=c8e6b9', likes: 989, rank: 8, points: 4320, movement: 'stable' as const },
  { id: 9, name: 'Priya Das', city: 'Sylhet', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya&backgroundColor=c8e6b9', likes: 876, rank: 9, points: 3990, movement: 'up' as const },
  { id: 10, name: 'Jannatul Ferdous', city: 'Dhaka', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jannatul&backgroundColor=c8e6b9', likes: 754, rank: 10, points: 3650, movement: 'down' as const },
];

const STAGGER_CHILD = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredData = useMemo(() => {
    return leaderboardData.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === 'All' || user.city === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [searchQuery, selectedCity]);
  
  const top3 = filteredData.slice(0, 3);
  const remainingList = filteredData.slice(3);

  const getMovementIcon = (movement: 'up' | 'down' | 'stable') => {
    if (movement === 'up') return <TrendingUp className="w-5 h-5 text-[#5AAE4A]" />;
    if (movement === 'down') return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  const podiumOrder = [
    { ...top3[1], placement: '2nd' },
    { ...top3[0], placement: '1st' },
    { ...top3[2], placement: '3rd' },
  ].filter(user => user.id !== undefined) as (typeof top3[0] & { placement: string })[];

  return (
    <div className="min-h-screen bg-[#F8FFF5] pt-28 pb-20 px-4 text-[#1B4332]">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#C8E6B9] text-[#1B4332] px-4 py-1.5 rounded-full font-medium text-sm tracking-wide"
          >
            <Trophy className="w-4 h-4 text-[#FFD54F]" />
            Top Performers
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Leaderboard
          </motion.h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/70 backdrop-blur-xl p-4 rounded-3xl border border-[#C8E6B9]/30 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-[#C8E6B9] focus:outline-none focus:ring-2 focus:ring-[#2F7D32] transition-shadow placeholder:text-gray-400 text-[#1B4332]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {['All', 'Dhaka', 'Chattogram', 'Sylhet'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCity === city
                    ? 'bg-[#2F7D32] text-white shadow-md'
                    : 'bg-white text-[#1B4332] hover:bg-[#C8E6B9]/50'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Podium */}
        {filteredData.length > 0 && (
          <div className="pt-10 flex flex-col md:flex-row items-end justify-center gap-6 md:gap-8 min-h-[400px]">
            {podiumOrder.map((user, index) => {
              if (!user.id) return null;
              
              const isFirst = user.placement === '1st';
              const isSecond = user.placement === '2nd';
              
              const heightClass = isFirst ? 'md:h-[340px]' : isSecond ? 'md:h-[280px]' : 'md:h-[260px]';
              const ringColor = isFirst ? 'ring-[#FFD54F]' : isSecond ? 'ring-gray-300' : 'ring-[#CD7F32]';
              const borderColor = isFirst ? 'border-[#FFD54F]' : isSecond ? 'border-gray-300' : 'border-[#CD7F32]';
              const glow = isFirst ? 'shadow-[0_0_40px_rgba(255,213,79,0.3)]' : 'shadow-xl';

              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className={`relative flex flex-col items-center w-full md:w-72 bg-white/70 backdrop-blur-xl rounded-[2rem] border ${borderColor} ${glow} p-6 pb-8 ${heightClass} justify-end`}
                >
                  <div className={`absolute -top-12 flex flex-col items-center`}>
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={`w-24 h-24 rounded-full bg-white ring-4 ${ringColor} object-cover`}
                      />
                      <div className="absolute -bottom-3 -right-2 text-3xl drop-shadow-md">
                        {isFirst ? '🥇' : isSecond ? '🥈' : '🥉'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-10 space-y-2">
                    <h3 className="font-bold text-xl text-[#1B4332] line-clamp-1">{user.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-sm font-medium text-[#2F7D32]">
                      <MapPin className="w-4 h-4" />
                      {user.city}
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 pt-4">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Points</span>
                        <span className="font-bold text-[#1B4332]">{user.points.toLocaleString()}</span>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Likes</span>
                        <span className="font-bold flex items-center gap-1 text-pink-600">
                          <Heart className="w-3.5 h-3.5 fill-pink-600" />
                          {user.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* List Section */}
        {remainingList.length > 0 && (
          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } }
            }}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {remainingList.map((user) => (
              <motion.div
                key={user.id}
                variants={STAGGER_CHILD}
                className="group flex items-center justify-between p-4 bg-white/70 backdrop-blur-xl border border-white hover:border-[#C8E6B9] rounded-2xl shadow-sm hover:shadow-md transition-all cursor-default"
              >
                <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                  <div className="w-8 text-center font-bold text-gray-400 group-hover:text-[#2F7D32] transition-colors">
                    #{user.rank}
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full bg-[#C8E6B9]/30"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[#1B4332] truncate">{user.name}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {user.city}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 md:gap-12">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="font-bold text-[#1B4332]">{user.points.toLocaleString()} pts</span>
                  </div>
                  <div className="hidden md:flex flex-col items-end">
                    <span className="font-bold text-pink-600 flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-pink-600" />
                      {user.likes}
                    </span>
                  </div>
                  <div className="w-8 flex justify-center">
                    {getMovementIcon(user.movement)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredData.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No participants found matching your criteria.
          </div>
        )}

      </div>
    </div>
  );
}
