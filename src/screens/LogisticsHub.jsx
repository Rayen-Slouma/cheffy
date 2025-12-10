import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Calendar, ChevronRight, ChevronLeft, Trash2, X, Minus, Plus, Check, Edit3, Flame, Beef, Droplet, Wheat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Recipe Edit Modal Component
function RecipeEditModal({ isOpen, onClose, item, onSave, isDarkMode, isRTL, t, fontClass }) {
  const [servings, setServings] = useState(2);
  const [removedIngredients, setRemovedIngredients] = useState([]);

  // Sync state when item changes
  useEffect(() => {
    if (item) {
      setServings(item.customizations?.servings || 2);
      setRemovedIngredients(item.customizations?.removedIngredients || []);
    }
  }, [item]);

  const mealData = t.meals[item?.mealIndex] || t.meals[0];
  const ingredients = mealData?.ingredients || [];
  const baseNutrition = item?.nutrition || { calories: 0, protein: 0, fat: 0, carbs: 0 };

  // Calculate adjusted nutrition based on servings and removed ingredients
  const ingredientFactor = ingredients.length > 0
    ? (ingredients.length - removedIngredients.length) / ingredients.length
    : 1;
  const servingFactor = servings / 2; // Base is 2 servings

  const adjustedNutrition = {
    calories: Math.round(baseNutrition.calories * servingFactor * ingredientFactor),
    protein: Math.round(baseNutrition.protein * servingFactor * ingredientFactor),
    fat: Math.round(baseNutrition.fat * servingFactor * ingredientFactor),
    carbs: Math.round(baseNutrition.carbs * servingFactor * ingredientFactor),
  };

  const toggleIngredient = (ingredient) => {
    setRemovedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSave = () => {
    onSave(item.id, { servings, removedIngredients });
    onClose();
  };

  const nutritionItems = [
    { icon: Flame, value: adjustedNutrition.calories, label: t.nutrition?.calories || 'kcal', color: 'text-orange-500' },
    { icon: Beef, value: `${adjustedNutrition.protein}g`, label: t.nutrition?.protein || 'P', color: 'text-emerald-500' },
    { icon: Droplet, value: `${adjustedNutrition.fat}g`, label: t.nutrition?.fat || 'F', color: 'text-amber-500' },
    { icon: Wheat, value: `${adjustedNutrition.carbs}g`, label: t.nutrition?.carbs || 'C', color: 'text-blue-500' },
  ];

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 z-[60]"
          />
          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`absolute bottom-0 left-0 right-0 z-[70] rounded-t-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={{ maxHeight: '85%' }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <X size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
              </motion.button>

              <h2 className={`${fontClass.heading} text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.nutrition?.editRecipe || 'Edit Recipe'}
              </h2>

              <div className="w-8" />
            </div>

            <div className="overflow-y-auto hide-scrollbar p-4" style={{ maxHeight: 'calc(85vh - 140px)' }}>
              {/* Meal Info */}
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <img
                  src={item.plated}
                  alt={mealData.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className={`${fontClass.heading} font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {mealData.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {mealData.time} min • {mealData.tags}
                  </p>
                </div>
              </div>

              {/* Nutrition Summary */}
              <div className={`flex justify-between gap-2 p-3 rounded-xl mb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                {nutritionItems.map((n, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <n.icon size={14} className={n.color} />
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{n.value}</span>
                    <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{n.label}</span>
                  </div>
                ))}
              </div>

              {/* Serving Size */}
              <div className="mb-5">
                <h4 className={`${fontClass.body} text-sm font-medium mb-3 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.nutrition?.servings || 'Servings'}
                </h4>
                <div className={`flex items-center justify-between p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    disabled={servings <= 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${servings <= 1 ? 'opacity-30' : ''} ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}
                  >
                    <Minus size={18} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                  </motion.button>
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{servings}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setServings(Math.min(6, servings + 1))}
                    disabled={servings >= 6}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${servings >= 6 ? 'opacity-30' : ''} ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}
                  >
                    <Plus size={18} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                  </motion.button>
                </div>
              </div>

              {/* Remove Ingredients */}
              <div className="mb-4">
                <h4 className={`${fontClass.body} text-sm font-medium mb-3 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.nutrition?.removeIngredients || 'Remove Ingredients'}
                </h4>
                <div className="space-y-2">
                  {ingredients.map((ingredient, index) => {
                    const isRemoved = removedIngredients.includes(ingredient);
                    return (
                      <motion.button
                        key={index}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleIngredient(ingredient)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${isRTL ? 'flex-row-reverse' : ''} ${
                          isRemoved
                            ? isDarkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200'
                            : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isRemoved
                            ? 'bg-red-500'
                            : isDarkMode ? 'bg-gray-600' : 'bg-white border border-gray-300'
                        }`}>
                          {isRemoved && <X size={14} className="text-white" />}
                        </div>
                        <span className={`flex-1 text-sm ${isRTL ? 'text-right' : 'text-left'} ${fontClass.body} ${
                          isRemoved
                            ? 'line-through opacity-50'
                            : ''
                        } ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {ingredient}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className={`flex gap-3 p-4 pb-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className={`flex-1 py-3 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
              >
                {t.nutrition?.cancel || 'Cancel'}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex-1 py-3 rounded-full font-medium bg-emerald-600 text-white"
              >
                {t.nutrition?.saveChanges || 'Save'}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Calendar Modal Component
function CalendarModal({ isOpen, onClose, selectedDate, onSelectDate, isDarkMode, isRTL, t, fontClass }) {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    // Add empty slots for days before the first day of month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const goToPrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isPast = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const days = getDaysInMonth(viewDate);
  const weekDays = t.days;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 z-[60]"
          />
          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`absolute bottom-0 left-0 right-0 z-[70] rounded-t-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={{ maxHeight: '75%' }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <X size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
              </motion.button>

              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={goToPrevMonth}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <ChevronLeft size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                </motion.button>

                <span className={`${fontClass.heading} text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t.months[viewDate.getMonth()]} {viewDate.getFullYear()}
                </span>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={goToNextMonth}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <ChevronRight size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                </motion.button>
              </div>

              <div className="w-8" /> {/* Spacer for alignment */}
            </div>

            {/* Week days header */}
            <div className={`grid grid-cols-7 gap-1 px-4 py-2 ${isRTL ? 'direction-rtl' : ''}`}>
              {weekDays.map((day, i) => (
                <div key={i} className={`text-center text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 px-4 pb-8">
              {days.map((date, i) => (
                <motion.button
                  key={i}
                  whileTap={date && !isPast(date) ? { scale: 0.9 } : {}}
                  onClick={() => date && !isPast(date) && (onSelectDate(date), onClose())}
                  disabled={!date || isPast(date)}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center text-sm font-medium
                    ${!date ? 'invisible' : ''}
                    ${isPast(date) ? 'opacity-30 cursor-not-allowed' : ''}
                    ${isSelected(date)
                      ? 'bg-emerald-600 text-white'
                      : isToday(date)
                        ? isDarkMode ? 'bg-gray-700 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {date?.getDate()}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function LogisticsHub({ boxItems, selectedDeliveryDate, onDateChange, onRemoveItem, onUpdateItem, isDarkMode = false }) {
  const { t, fontClass, isRTL } = useLanguage();

  // Use the date from props, converting from string
  const selectedDate = selectedDeliveryDate ? new Date(selectedDeliveryDate) : (() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
  })();

  const setSelectedDate = (date) => {
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const scrollRef = useRef(null);

  // Filter box items by selected date
  const filteredBoxItems = boxItems.filter(item => item.deliveryDate === selectedDate.toDateString());

  const handleSaveCustomization = (itemId, customizations) => {
    if (onUpdateItem) {
      onUpdateItem(itemId, customizations, selectedDate.toDateString());
    }
  };

  // Generate 14 days starting from today
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const isSelected = (date) => date.toDateString() === selectedDate.toDateString();
  const isToday = (date) => date.toDateString() === new Date().toDateString();

  // Scroll to selected date on mount or when selected date changes
  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = dates.findIndex(d => d.toDateString() === selectedDate.toDateString());
      if (selectedIndex >= 0) {
        // Calculate scroll position: each item is 64px (w-16) + 8px gap = 72px
        const itemWidth = 72;
        const containerWidth = scrollRef.current.offsetWidth;
        const scrollAmount = (selectedIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2);

        setTimeout(() => {
          scrollRef.current?.scrollTo({
            left: Math.max(0, scrollAmount),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [selectedDate]);

  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className={`absolute inset-0 bottom-20 flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className="pt-14 pb-4 px-6">
        <motion.h1
          layout
          className={`${fontClass.heading} text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {t.yourBox}
        </motion.h1>
      </div>

      {/* Date Picker Section */}
      <div className="mb-6">
        <div className={`flex items-center justify-between px-6 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t.selectDay}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCalendar(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${isRTL ? 'flex-row-reverse' : ''} ${isDarkMode ? 'bg-gray-800 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}
          >
            <Calendar size={16} />
            <span className={fontClass.body}>{t.months[selectedDate.getMonth()].slice(0, 3)}</span>
          </motion.button>
        </div>

        {/* Horizontal Date Scroll with fade gradients */}
        <div className="relative w-full overflow-hidden">
          {/* Left fade gradient */}
          <div
            className={`absolute top-0 bottom-0 w-8 z-10 pointer-events-none ${isRTL ? 'right-0' : 'left-0'}`}
            style={{
              background: isRTL
                ? `linear-gradient(to left, ${isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(248, 250, 252)'}, transparent)`
                : `linear-gradient(to right, ${isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(248, 250, 252)'}, transparent)`
            }}
          />

          {/* Right fade gradient */}
          <div
            className={`absolute top-0 bottom-0 w-8 z-10 pointer-events-none ${isRTL ? 'left-0' : 'right-0'}`}
            style={{
              background: isRTL
                ? `linear-gradient(to right, ${isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(248, 250, 252)'}, transparent)`
                : `linear-gradient(to left, ${isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(248, 250, 252)'}, transparent)`
            }}
          />

          <div
            ref={scrollRef}
            className="flex gap-2 px-6 py-1 overflow-x-scroll hide-scrollbar"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              overflowX: 'scroll',
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }}
          >
            {dates.map((date, index) => {
              const dayOfWeek = date.getDay();
              const dayName = t.days[dayOfWeek === 0 ? 6 : dayOfWeek - 1]; // Adjust for Mon start
              const isFirstOfMonth = date.getDate() === 1;

              return (
                <motion.button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  style={{ scrollSnapAlign: 'center' }}
                  className={`
                    flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center
                    transition-all duration-300 cursor-pointer touch-manipulation
                    ${isSelected(date)
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`text-[10px] uppercase tracking-wide ${isSelected(date) ? 'text-white/80' : 'opacity-60'}`}>
                    {dayName}
                  </span>
                  <span className="text-xl font-semibold">{date.getDate()}</span>
                  {(isFirstOfMonth || index === 0) && (
                    <span className={`text-[9px] uppercase ${isSelected(date) ? 'text-white/70' : 'text-emerald-600'}`}>
                      {t.monthsShort[date.getMonth()]}
                    </span>
                  )}
                  {isToday(date) && !isSelected(date) && (
                    <span className="text-[9px] text-emerald-500 font-medium">{t.today}</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Box Visualization */}
      <div className="flex-1 px-6 pb-24 overflow-y-auto hide-scrollbar">
        <AnimatePresence mode="wait">
          {filteredBoxItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`flex flex-col items-center justify-center h-64 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
            >
              <Package size={64} strokeWidth={1} />
              <p className={`mt-4 ${fontClass.body}`}>{t.empty}</p>
            </motion.div>
          ) : (
            <motion.div
              key="filled"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Virtual Box */}
              <div className={`relative rounded-3xl p-6 border-2 border-dashed ${isDarkMode ? 'bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-700' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'}`}>
                <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Package className={isDarkMode ? 'text-amber-400' : 'text-amber-600'} size={24} />
                    <span className={`${fontClass.heading} text-lg font-semibold ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                      {filteredBoxItems.length} {t.items}
                    </span>
                  </div>
                  {/* Box Total Price */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 shadow-md ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-white text-sm font-bold">
                      {filteredBoxItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(0)}
                    </span>
                    <span className="text-white/80 text-xs">{t.price?.currency || 'TND'}</span>
                  </div>
                </div>

                {/* Items in box */}
                <div className="grid grid-cols-2 gap-3">
                  {filteredBoxItems.map((item) => {
                    const hasCustomizations = item.customizations &&
                      (item.customizations.servings !== 2 ||
                       (item.customizations.removedIngredients && item.customizations.removedIngredients.length > 0));

                    return (
                      <motion.div
                        key={`${item.id}-${item.deliveryDate}`}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setEditingItem(item)}
                        className={`relative rounded-2xl p-3 shadow-sm cursor-pointer transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}
                      >
                        <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 relative">
                          <img
                            src={item.plated}
                            alt={t.meals[item.mealIndex]?.name || 'Meal'}
                            className="w-full h-full object-cover"
                          />
                          {/* Customization indicator */}
                          {hasCustomizations && (
                            <div className={`absolute bottom-1 ${isRTL ? 'right-1' : 'left-1'} px-1.5 py-0.5 rounded-full bg-emerald-500 flex items-center gap-1`}>
                              <Edit3 size={8} className="text-white" />
                              <span className="text-[8px] text-white font-medium">{t.nutrition?.customized || 'Custom'}</span>
                            </div>
                          )}
                        </div>
                        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <p className={`text-xs truncate flex-1 ${fontClass.body} ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t.meals[item.mealIndex]?.name || 'Meal'}
                          </p>
                          {item.customizations?.servings && item.customizations.servings !== 2 && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                              ×{item.customizations.servings}
                            </span>
                          )}
                        </div>
                        {/* Item Price */}
                        <div className={`flex items-center mt-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                          <span className={`text-sm font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            {item.price?.toFixed(0) || 0}
                          </span>
                          <span className={`text-[10px] ml-1 ${isRTL ? 'mr-1 ml-0' : ''} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {t.price?.currency || 'TND'}
                          </span>
                        </div>

                        {/* Remove button */}
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveItem(item.id, item.deliveryDate);
                          }}
                          className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} w-6 h-6 bg-red-100 rounded-full flex items-center justify-center`}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={12} className="text-red-500" />
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Info */}
              <motion.button
                onClick={() => setShowCalendar(true)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl shadow-sm ${isRTL ? 'flex-row-reverse' : ''} ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} transition-colors`}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-800/10'}`}>
                  <Calendar size={24} className="text-emerald-500" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className={`text-sm ${fontClass.body} ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.selectDay}</p>
                  <p className={`font-semibold ${fontClass.body} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t.days[selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1]} {selectedDate.getDate()} {t.monthsShort[selectedDate.getMonth()]}
                  </p>
                </div>
                <ArrowIcon size={20} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        isDarkMode={isDarkMode}
        isRTL={isRTL}
        t={t}
        fontClass={fontClass}
      />

      {/* Recipe Edit Modal */}
      <RecipeEditModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        item={editingItem}
        onSave={handleSaveCustomization}
        isDarkMode={isDarkMode}
        isRTL={isRTL}
        t={t}
        fontClass={fontClass}
      />
    </div>
  );
}

