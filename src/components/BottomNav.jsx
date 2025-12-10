import { motion } from 'framer-motion';
import { UtensilsCrossed, Package, ChefHat, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const navItems = [
  { key: 'home', icon: UtensilsCrossed },
  { key: 'cart', icon: Package },
  { key: 'cook', icon: ChefHat },
  { key: 'profile', icon: User },
];

export default function BottomNav({ activeTab, onTabChange, boxCount = 0, boxTotal = 0, isDarkMode = false }) {
  const { t, fontClass, isRTL } = useLanguage();

  return (
    <motion.div
      layout
      className={`
        absolute bottom-0 left-0 right-0 z-50
        px-4 pb-8 pt-3
        bg-gradient-to-t ${isDarkMode ? 'from-gray-900 via-gray-900' : 'from-slate-50 via-slate-50'} to-transparent
      `}
      style={{ pointerEvents: 'auto' }}
    >
      <div className={`flex items-center justify-around rounded-2xl shadow-lg py-2 ${isRTL ? 'flex-row-reverse' : ''} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className="relative flex flex-col items-center py-2 px-4"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                <Icon
                  size={24}
                  className={`transition-colors duration-300 ${isActive ? 'text-emerald-500' : (isDarkMode ? 'text-gray-500' : 'text-gray-400')}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {/* Box count and price badge */}
                {item.key === 'cart' && boxCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-4 flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-600 text-white text-[9px] font-bold rounded-full shadow-md"
                  >
                    <span>{boxCount}</span>
                    {boxTotal > 0 && (
                      <>
                        <span className="text-white/60">•</span>
                        <span>{boxTotal.toFixed(0)}</span>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
              <span className={`
                text-xs mt-1 transition-colors duration-300
                ${fontClass.body}
                ${isActive ? 'text-emerald-500 font-medium' : (isDarkMode ? 'text-gray-500' : 'text-gray-400')}
              `}>
                {t.nav[item.key]}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 bg-emerald-500 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

