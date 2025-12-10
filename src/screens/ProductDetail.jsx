import { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Scissors, Droplets, Scale, Timer, Flame, Beef, Droplet, Wheat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetail({ meal, onClose, onAddToBox, isDarkMode = false }) {
  const { t, fontClass, isRTL } = useLanguage();
  const ingredientScrollRef = useRef(null);

  // Get meal data from translations based on index
  const mealData = t.meals[meal.mealIndex] || t.meals[0];
  const ingredientImages = meal.ingredientImages || [];
  const nutrition = meal.nutrition || { calories: 0, protein: 0, fat: 0, carbs: 0 };

  const easyFeatures = [
    { icon: Scissors, label: t.whyEasy.noChopping },
    { icon: Droplets, label: t.whyEasy.noWashing },
    { icon: Scale, label: t.whyEasy.preMeasured },
    { icon: Timer, label: t.whyEasy.quickCook },
  ];

  const nutritionItems = [
    { icon: Flame, label: t.nutrition?.calories || 'kcal', value: nutrition.calories, color: 'text-orange-500', bg: isDarkMode ? 'bg-orange-900/30' : 'bg-orange-50' },
    { icon: Beef, label: t.nutrition?.protein || 'Protein', value: `${nutrition.protein}g`, color: 'text-emerald-500', bg: isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50' },
    { icon: Droplet, label: t.nutrition?.fat || 'Fat', value: `${nutrition.fat}g`, color: 'text-amber-500', bg: isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50' },
    { icon: Wheat, label: t.nutrition?.carbs || 'Carbs', value: `${nutrition.carbs}g`, color: 'text-blue-500', bg: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50' },
  ];

  return (
    <motion.div
      className={`absolute top-0 left-0 right-0 bottom-20 z-40 flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      {/* Header Image */}
      <div className="relative h-52 flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${meal.plated}')` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-gray-900' : 'from-slate-50'} to-transparent`} />

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className={`absolute top-10 ${isRTL ? 'left-4' : 'right-4'} w-10 h-10 backdrop-blur rounded-full flex items-center justify-center shadow-lg ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pt-2">
        {/* Title */}
        <motion.h1
          layout
          className={`${fontClass.heading} text-2xl font-semibold mb-2 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {mealData.name}
        </motion.h1>

        <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <p className={`text-saffron font-medium`}>
            {mealData.time} {isRTL ? 'دقيقة' : 'min'} • {mealData.tags}
          </p>
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-white text-lg font-bold">{meal.price?.toFixed(0) || 0}</span>
            <span className="text-white/80 text-xs">{t.price?.currency || 'TND'}</span>
          </div>
        </div>

        {/* Nutrition Grid */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {nutritionItems.map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center p-2 rounded-xl ${item.bg}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <item.icon size={16} className={item.color} />
              <span className={`text-sm font-semibold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.value}
              </span>
              <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Ingredients Scroll - RTL aware with fade gradients */}
        <div className="mb-6">
          <h2 className={`${fontClass.heading} text-base font-semibold mb-3 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {mealData.ingredients.length} {isRTL ? 'مكونات' : 'Ingredients'}
          </h2>
          <div className="relative w-full overflow-hidden">
            {/* Left fade gradient */}
            <div
              className={`absolute top-0 bottom-0 w-6 z-10 pointer-events-none ${isRTL ? 'right-0' : 'left-0'}`}
              style={{
                background: isRTL
                  ? `linear-gradient(to left, ${isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(248, 250, 252)'}, transparent)`
                  : `linear-gradient(to right, ${isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(248, 250, 252)'}, transparent)`
              }}
            />
            {/* Right fade gradient */}
            <div
              className={`absolute top-0 bottom-0 w-6 z-10 pointer-events-none ${isRTL ? 'left-0' : 'right-0'}`}
              style={{
                background: isRTL
                  ? `linear-gradient(to right, ${isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(248, 250, 252)'}, transparent)`
                  : `linear-gradient(to left, ${isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(248, 250, 252)'}, transparent)`
              }}
            />

            <div
              ref={ingredientScrollRef}
              className="flex gap-3 hide-scrollbar pb-2 px-1 touch-pan-x"
              style={{
                overflowX: 'scroll',
                WebkitOverflowScrolling: 'touch',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                touchAction: 'pan-x'
              }}
            >
              {mealData.ingredients.map((ingredient, index) => {
                const imgSrc = ingredientImages[index] || ingredientImages[index % (ingredientImages.length || 1)] || null;
                return (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-20"
                    style={{ scrollSnapAlign: 'center' }}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`w-20 h-20 rounded-2xl overflow-hidden mb-2 shadow-md border flex items-center justify-center ${isDarkMode ? 'border-gray-700 bg-gradient-to-br from-gray-700 to-gray-800' : 'border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className={`text-2xl ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>🥗</span>
                      )}
                    </div>
                    <p className={`text-xs text-center ${fontClass.body} leading-tight h-8 overflow-hidden ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {ingredient}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Why This Is Easy */}
        <div className="mb-6">
          <h2 className={`${fontClass.heading} text-base font-semibold mb-3 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.whyEasy.title}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {easyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-2 p-3 rounded-xl shadow-sm ${isRTL ? 'flex-row-reverse' : ''} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-800/10'}`}>
                  <feature.icon size={16} className="text-emerald-500" />
                </div>
                <span className={`text-xs font-medium ${fontClass.body} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Add to Box Button */}
      <div className={`flex-shrink-0 p-4 pb-8 ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
        <motion.button
          onClick={onAddToBox}
          className={`w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-full font-medium text-base transition-all duration-300 shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{t.addToBox}</span>
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
            {meal.price?.toFixed(0) || 0} {t.price?.currency || 'TND'}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

