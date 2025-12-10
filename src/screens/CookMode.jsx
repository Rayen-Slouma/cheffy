import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Check, X, ChefHat, Package } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Meal Selection Screen Component
function MealSelection({ boxItems, onSelectMeal, onExit, isDarkMode = false }) {
  const { t, fontClass, isRTL } = useLanguage();

  return (
    <div className={`absolute inset-0 bottom-20 flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      {/* Exit Button */}
      <motion.button
        onClick={onExit}
        className={`absolute top-10 ${isRTL ? 'left-4' : 'right-4'} z-50 flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors ${isRTL ? 'flex-row-reverse' : ''} ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white/90 hover:bg-white shadow-sm'}`}
        whileTap={{ scale: 0.95 }}
      >
        <X size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
        <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.exitCook}</span>
      </motion.button>

      {/* Header */}
      <div className="pt-10 pb-4 px-6">
        <motion.h1
          layout
          className={`${fontClass.heading} text-2xl font-semibold ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {t.cookMode}
        </motion.h1>
        <p className={`text-sm mt-1 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {t.selectMeal || (isRTL ? 'اختر وصفة للطبخ' : 'Select a recipe to cook')}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto hide-scrollbar pb-10">
        {boxItems.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Package size={48} strokeWidth={1} className={isDarkMode ? 'text-gray-600' : 'text-gray-400'} />
            </div>
            <h2 className={`${fontClass.heading} text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.emptyBox || (isRTL ? 'صندوقك فارغ' : 'Your box is empty')}
            </h2>
            <p className={`text-sm max-w-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.addMealsFirst || (isRTL ? 'أضف وجبات إلى صندوقك أولاً لبدء الطبخ' : 'Add meals to your box first to start cooking')}
            </p>
          </motion.div>
        ) : (
          // Meal grid
          <div className="grid grid-cols-1 gap-4">
            {boxItems.map((item, index) => {
              const mealData = t.meals[item.mealIndex] || t.meals[0];
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onSelectMeal(item)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50 shadow-sm border border-gray-100'}`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.plated}
                      alt={mealData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`${fontClass.heading} font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {mealData.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {mealData.time} {isRTL ? 'دقيقة' : 'min'} • {mealData.steps?.length || 4} {t.stepsLabel || (isRTL ? 'خطوات' : 'steps')}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <ChefHat size={20} className="text-white" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Cooking Interface Component
function CookingInterface({ meal, onFinish, onExit, isDarkMode = false }) {
  const { t, fontClass, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(240);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const mealData = t.meals[meal.mealIndex] || t.meals[0];
  const mealSteps = mealData.steps || [];
  const totalSteps = mealSteps.length;
  const progress = ((240 - timeLeft) / 240) * 100;

  // Timer circle colors based on dark mode
  const bgStrokeColor = isDarkMode ? '#374151' : '#E2E8F0';
  const progressStrokeColor = '#064E3B';

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  const resetTimer = () => {
    setTimeLeft(240);
    setIsRunning(false);
  };

  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className={`relative w-full h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      {/* Exit Button */}
      <motion.button
        onClick={onExit}
        className={`absolute top-10 ${isRTL ? 'left-4' : 'right-4'} z-50 flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors ${isRTL ? 'flex-row-reverse' : ''} ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white/90 hover:bg-white shadow-sm'}`}
        whileTap={{ scale: 0.95 }}
      >
        <X size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
        <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.exitCook}</span>
      </motion.button>

      {/* Header with Meal Name */}
      <div className="pt-10 pb-2 px-6">
        <motion.h1
          layout
          className={`${fontClass.heading} text-lg font-semibold ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {mealData.name}
        </motion.h1>
        <p className={`text-sm mt-1 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {t.step} {currentStep + 1} {t.of} {totalSteps}
        </p>
      </div>

      {/* Timer Circle */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-48 h-48 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="88" fill="none" stroke={bgStrokeColor} strokeWidth="8" />
            <circle
              cx="96" cy="96" r="88" fill="none" stroke={progressStrokeColor} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`${fontClass.heading} text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatTime(timeLeft)}
            </span>
            <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.timer}</span>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex items-center gap-5 mb-6">
          <motion.button
            onClick={resetTimer}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            whileTap={{ scale: 0.9 }}
          >
            <RotateCcw size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
          </motion.button>
          <motion.button
            onClick={() => setIsRunning(!isRunning)}
            className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/50"
            whileTap={{ scale: 0.9 }}
          >
            {isRunning ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white ml-1" />}
          </motion.button>
          <div className="w-12 h-12" />
        </div>

        {/* Current Step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center px-6"
          >
            <p className={`${fontClass.body} text-base leading-relaxed ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {mealSteps[currentStep]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className={`flex items-center justify-between px-6 pb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <motion.button
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${isRTL ? 'flex-row-reverse' : ''} ${currentStep === 0 ? 'opacity-30' : (isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200')}`}
          whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
        >
          <PrevIcon size={18} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
          <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.prevStep}</span>
        </motion.button>
        <motion.button
          onClick={handleNextStep}
          className={`flex items-center gap-2 px-5 py-2.5 bg-emerald-800 rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white text-sm">{currentStep === totalSteps - 1 ? t.finish : t.nextStep}</span>
          {currentStep === totalSteps - 1 ? <Check size={18} className="text-white" /> : <NextIcon size={18} className="text-white" />}
        </motion.button>
      </div>
    </div>
  );
}

// Main CookMode Component
export default function CookMode({ boxItems, cookingMeal, onSelectMeal, onFinish, onExit, isDarkMode = false }) {
  return (
    <AnimatePresence mode="wait">
      {cookingMeal ? (
        <motion.div
          key="cooking"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full"
        >
          <CookingInterface meal={cookingMeal} onFinish={onFinish} onExit={onExit} isDarkMode={isDarkMode} />
        </motion.div>
      ) : (
        <motion.div
          key="selection"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full"
        >
          <MealSelection boxItems={boxItems} onSelectMeal={onSelectMeal} onExit={onExit} isDarkMode={isDarkMode} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

