/* eslint-disable */
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Phone, Navigation2, X, Clock, Navigation } from 'lucide-react';

const stores = [
  { id: 1, name: 'Beauty Plus', area: 'Gulshan', distance: '0.8 km', isOpen: true, phone: '+880 1712-345678' },
  { id: 2, name: 'Shajgoj Partner Store', area: 'Dhanmondi', distance: '1.2 km', isOpen: true, phone: '+880 1898-765432' },
  { id: 3, name: 'Glow Cosmetics', area: 'Banani', distance: '2.1 km', isOpen: false, phone: '+880 1556-789012' },
  { id: 4, name: 'Natural Care', area: 'Mirpur', distance: '3.5 km', isOpen: true, phone: '+880 1912-456789' },
  { id: 5, name: 'Fresh Mart Beauty', area: 'Gulshan', distance: '1.0 km', isOpen: true, phone: '+880 1678-901234' },
  { id: 6, name: 'Ruposhi Beauty House', area: 'Dhanmondi', distance: '1.8 km', isOpen: true, phone: '+880 1845-234567' },
];

const areas = ['All', 'Gulshan', 'Dhanmondi', 'Banani', 'Mirpur'];

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArea, setActiveArea] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      const matchesSearch = store.area.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            store.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesArea = activeArea === 'All' || store.area === activeArea;
      return matchesSearch && matchesArea;
    });
  }, [searchQuery, activeArea]);

  const mapPins = [
    { top: '20%', left: '30%', delay: 0 },
    { top: '50%', left: '70%', delay: 0.5 },
    { top: '70%', left: '40%', delay: 1 },
    { top: '30%', left: '80%', delay: 1.5 },
    { top: '80%', left: '60%', delay: 2 }
  ];

  return (
    <div className="min-h-screen bg-[#F8FFF5] pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#C8E6B9] text-[#1B4332] text-sm font-semibold mb-4 border border-[#5AAE4A]/30 flex items-center gap-2 w-fit mx-auto">
            <Navigation2 size={16} /> Near You
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-4">
            Find a Store
          </h1>
          <p className="text-[#2F7D32] max-w-2xl mx-auto">
            Locate your nearest participating store to purchase Vatika products and earn reward points.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Map Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-64 lg:h-auto min-h-[300px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#C8E6B9] to-[#5AAE4A]/30 border border-[#5AAE4A]/20 shadow-inner"
          >
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#1B4332 2px, transparent 2px)',
                backgroundSize: '24px 24px'
              }}
            />
            
            {/* Pulsing Pins */}
            {mapPins.map((pin, index) => (
              <motion.div
                key={index}
                className="absolute text-[#1B4332]"
                style={{ top: pin.top, left: pin.left }}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: pin.delay,
                  ease: "easeInOut"
                }}
              >
                <div className="relative">
                  <MapPin size={32} fill="#5AAE4A" className="relative z-10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#5AAE4A] rounded-full opacity-30 animate-ping" />
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-white flex items-center gap-4 shadow-lg">
               <div className="p-2 bg-[#F8FFF5] rounded-full text-[#2F7D32]">
                 <Navigation size={20} />
               </div>
               <div>
                 <p className="text-sm font-semibold text-[#1B4332]">Location Services</p>
                 <p className="text-xs text-[#2F7D32]">Decorative map view</p>
               </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5AAE4A]" size={20} />
              <input 
                type="text"
                placeholder="Search by area or store name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-[#C8E6B9] focus:outline-none focus:border-[#5AAE4A] focus:ring-2 focus:ring-[#5AAE4A]/20 shadow-sm transition-all"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#2F7D32] mb-3">Quick Filters</h3>
              <div className="flex flex-wrap gap-2">
                {areas.map(area => (
                  <button
                    key={area}
                    onClick={() => setActiveArea(area)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeArea === area 
                        ? 'bg-[#2F7D32] text-white shadow-md shadow-[#2F7D32]/20' 
                        : 'bg-white text-[#2F7D32] border border-[#C8E6B9] hover:bg-[#F8FFF5]'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl p-6 border border-[#C8E6B9] flex-grow">
               <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-[#5AAE4A]" />
                 <h2 className="font-semibold text-[#1B4332]">Results ({filteredStores.length})</h2>
               </div>
               <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredStores.map(store => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={store.id}
                      className="bg-white p-4 rounded-xl border border-[#C8E6B9] shadow-sm hover:border-[#5AAE4A] transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-[#1B4332]">{store.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-[#5AAE4A] mt-1">
                            <MapPin size={14} />
                            <span>{store.area}</span>
                            <span className="text-gray-300">•</span>
                            <span>{store.distance}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                          store.isOpen ? 'bg-[#C8E6B9] text-[#2F7D32]' : 'bg-red-100 text-red-600'
                        }`}>
                          {store.isOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-[#2F7D32] mb-4">
                        <Phone size={14} />
                        <span>{store.phone}</span>
                      </div>

                      <button
                        onClick={() => setShowModal(true)}
                        className="w-full py-2 bg-[#F8FFF5] hover:bg-[#2F7D32] hover:text-white text-[#2F7D32] border border-[#C8E6B9] rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        Get Directions
                      </button>
                    </motion.div>
                  ))}

                  {filteredStores.length === 0 && (
                    <div className="text-center py-8 text-[#2F7D32]">
                      No stores found matching your criteria.
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-[#1B4332]/40 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-[#C8E6B9] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#F8FFF5] rounded-full flex items-center justify-center text-[#5AAE4A] mb-4 border border-[#C8E6B9]">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1B4332] mb-2">Redirect to Maps</h3>
              <p className="text-[#2F7D32] mb-6">
                Google Maps would open here in the live version to provide turn-by-turn directions.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-[#2F7D32] text-white rounded-xl font-medium hover:bg-[#1B4332] transition-colors"
              >
                OK
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
