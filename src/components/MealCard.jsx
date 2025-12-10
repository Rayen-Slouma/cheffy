import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sparkles, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Expanded meal data with 8 unique recipes including nutritional info and prices (in TND)
export const meals = [
  {
    id: 1,
    plated: 'https://images.unsplash.com/photo-1580554530778-ca36943938b2?w=800&q=80',
    ingredients: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80',
    ingredientImages: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&q=80',
      'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=200&q=80',
      'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=200&q=80',
      'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=200&q=80'
    ],
    nutrition: { calories: 520, protein: 32, fat: 28, carbs: 18 },
    price: 45.00
  },
  {
    id: 2,
    plated: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    ingredients: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80',
    ingredientImages: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=80',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80',
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&q=80'
    ],
    nutrition: { calories: 480, protein: 14, fat: 22, carbs: 58 },
    price: 38.00
  },
  {
    id: 3,
    plated: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
    ingredients: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    ingredientImages: [
      'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80',
      'https://images.unsplash.com/photo-1550411294-875e72260ba7?w=200&q=80',
      'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=200&q=80'
    ],
    nutrition: { calories: 380, protein: 35, fat: 18, carbs: 12 },
    price: 52.00
  },
  {
    id: 4,
    plated: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=800&q=80',
    ingredients: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=800&q=80',
    ingredientImages: [
      'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=200&q=80',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200&q=80',
      'https://images.unsplash.com/photo-1583224994076-8dc5e0fc4c13?w=200&q=80',
      'https://images.unsplash.com/photo-1485963631004-f2f00b1d6571?w=200&q=80'
    ],
    nutrition: { calories: 550, protein: 28, fat: 20, carbs: 62 },
    price: 35.00
  },
  {
    id: 5,
    plated: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=800&q=80',
    ingredients: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
    ingredientImages: [
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&q=80',
      'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=200&q=80',
      'https://images.unsplash.com/photo-1446714276218-bd84d334af98?w=200&q=80',
      'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=200&q=80'
    ],
    nutrition: { calories: 620, protein: 42, fat: 35, carbs: 8 },
    price: 68.00
  },
  {
    id: 6,
    plated: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80',
    ingredients: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    ingredientImages: [
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&q=80',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80',
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=200&q=80',
      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=200&q=80'
    ],
    nutrition: { calories: 450, protein: 26, fat: 24, carbs: 35 },
    price: 32.00
  },
  {
    id: 7,
    plated: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80',
    ingredients: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800&q=80',
    ingredientImages: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&q=80',
      'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=200&q=80',
      'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=200&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&q=80'
    ],
    nutrition: { calories: 290, protein: 28, fat: 16, carbs: 6 },
    price: 58.00
  },
  {
    id: 8,
    plated: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
    ingredients: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&q=80',
    ingredientImages: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80',
      'https://images.unsplash.com/photo-1544378730-8b5104b38c64?w=200&q=80',
      'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=200&q=80',
      'https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?w=200&q=80'
    ],
    nutrition: { calories: 320, protein: 38, fat: 14, carbs: 4 },
    price: 85.00
  }
];

export default function MealCard({ meal, mealIndex = 0, onSelect }) {
  const { t, fontClass, isRTL } = useLanguage();
  const [showIngredients, setShowIngredients] = useState(false);
  const pressTimer = useRef(null);

  // Get meal data from translations based on index
  const mealData = t.meals[mealIndex] || t.meals[0];

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setShowIngredients(true);
    }, 150);
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
    setShowIngredients(false);
  };

  return (
    <motion.div
      className="relative w-full h-40 rounded-2xl overflow-hidden shadow-lg cursor-pointer select-none"
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onClick={() => !showIngredients && onSelect({ ...meal, mealIndex })}
      whileTap={{ scale: 0.98 }}
    >
      {/* Plated Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${meal.plated}')` }}
        animate={{ opacity: showIngredients ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Ingredients Image (Knolling view) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${meal.ingredients}')` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showIngredients ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Price Badge - Top Left */}
      <div className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-sm shadow-lg`}>
        <span className="text-white text-xs font-bold">{meal.price?.toFixed(0) || 0}</span>
        <span className="text-white/80 text-[9px]">{t.price?.currency || 'TND'}</span>
      </div>

      {/* Nutrition Badge - Top Right */}
      <div className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm`}>
        <Flame size={10} className="text-orange-400" />
        <span className="text-white text-[10px] font-medium">{meal.nutrition?.calories || 0} {t.nutrition?.calories || 'kcal'}</span>
      </div>

      {/* Content Overlay */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <motion.h3
          layout
          className={`${fontClass.heading} text-lg font-semibold text-white mb-1`}
        >
          {mealData.name}
        </motion.h3>

        <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-1 text-white/80 text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Clock size={12} />
            <span>{mealData.time} {isRTL ? 'د' : 'min'}</span>
          </div>
          <div className={`flex items-center gap-1 text-saffron text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles size={12} />
            <span>{mealData.tags}</span>
          </div>
          {/* Macro badges */}
          <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-emerald-400 text-[10px]">P:{meal.nutrition?.protein || 0}g</span>
            <span className="text-amber-400 text-[10px]">F:{meal.nutrition?.fat || 0}g</span>
            <span className="text-blue-400 text-[10px]">C:{meal.nutrition?.carbs || 0}g</span>
          </div>
        </div>

        {/* Hold hint */}
        <AnimatePresence>
          {!showIngredients && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="text-white/50 text-[10px] mt-1"
            >
              {t.reveal}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

