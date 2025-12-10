import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MealCard, { meals } from '../components/MealCard';

export default function Home({ onSelectMeal, isDarkMode = false }) {
  const { t, fontClass, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef(null);

  // Filter meals based on search query
  const filteredMeals = meals.filter((meal, index) => {
    const mealName = t.meals[index]?.name || '';
    return mealName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Handle scroll to show/hide header
  const handleScroll = (e) => {
    const currentScrollY = e.target.scrollTop;

    if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
      // Scrolling down
      setShowHeader(false);
    } else {
      // Scrolling up
      setShowHeader(true);
    }

    lastScrollY.current = currentScrollY;
  };

  return (
    <div className={`absolute inset-0 bottom-20 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      {/* Header with auto-hide */}
      <AnimatePresence>
        {showHeader && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`absolute top-0 left-0 right-0 z-30 pt-10 pb-2 px-5 bg-gradient-to-b ${isDarkMode ? 'from-gray-900 via-gray-900' : 'from-slate-50 via-slate-50'} to-transparent`}
          >
            <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <motion.h1
                layout
                className={`${fontClass.heading} text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                Chefy
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar - always visible, z-index below bottom nav (z-50) */}
      <div className={`absolute left-0 right-0 z-10 px-4 ${showHeader ? 'top-20' : 'top-10'}`}
        style={{ transition: 'top 0.3s ease-in-out' }}
      >
        <div className={`relative flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Search
            size={18}
            className={`absolute ${isRTL ? 'right-4' : 'left-4'} ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`w-full py-3 ${isRTL ? 'pr-11 pl-10' : 'pl-11 pr-10'} rounded-xl border transition-all duration-200 ${fontClass.body} text-sm
              ${isDarkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-600'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-600'
              } focus:outline-none focus:ring-2 focus:ring-emerald-600/20`}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {searchQuery && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setSearchQuery('')}
              className={`absolute ${isRTL ? 'left-3' : 'right-3'} p-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'}`}
            >
              <X size={14} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Scrollable Meal Feed */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`absolute top-0 left-0 right-0 bottom-0 overflow-y-auto hide-scrollbar ${showHeader ? 'pt-36' : 'pt-24'}`}
        style={{
          transition: 'padding-top 0.3s ease-in-out'
        }}
      >
        <div className="px-4 space-y-3 pb-4">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal, index) => {
              // Find original index for translations
              const originalIndex = meals.findIndex(m => m.id === meal.id);
              return (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  layout
                >
                  <MealCard meal={meal} mealIndex={originalIndex} onSelect={onSelectMeal} />
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <Search size={40} className="mx-auto mb-3 opacity-40" />
              <p className={`${fontClass.body} text-sm`}>
                {isRTL ? 'لم يتم العثور على وصفات' : 'No recipes found'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

