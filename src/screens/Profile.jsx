import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Heart, AlertCircle, Users, Bell, Moon, HelpCircle, LogOut, ChevronRight, ChevronLeft, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

// Preference Modal Component
function PreferenceModal({ isOpen, onClose, title, options, selected, onSelect, isMulti, isDarkMode, isRTL, fontClass, saveLabel }) {
  const [tempSelected, setTempSelected] = useState(selected);

  const handleToggle = (option) => {
    if (isMulti) {
      if (tempSelected.includes(option)) {
        setTempSelected(tempSelected.filter(o => o !== option));
      } else {
        setTempSelected([...tempSelected, option]);
      }
    } else {
      setTempSelected(option);
    }
  };

  const handleSave = () => {
    onSelect(tempSelected);
    onClose();
  };

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
            style={{ maxHeight: '70%' }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-5 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className={`${fontClass.heading} text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
              >
                <X size={18} />
              </motion.button>
            </div>
            {/* Options List */}
            <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(70vh - 140px)' }}>
              {options.map((option, index) => {
                const isSelected = isMulti ? tempSelected.includes(option) : tempSelected === option;
                return (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleToggle(option)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl mb-2 transition-colors ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} ${
                      isSelected
                        ? (isDarkMode ? 'bg-emerald-900/50 border border-emerald-600' : 'bg-emerald-50 border border-emerald-200')
                        : (isDarkMode ? 'bg-gray-700/50 border border-transparent' : 'bg-gray-50 border border-transparent')
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600'
                        : (isDarkMode ? 'border-gray-500' : 'border-gray-300')
                    }`}>
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                    <span className={`${fontClass.body} text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            {/* Save Button */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full font-medium transition-colors"
              >
                {saveLabel}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Profile({ isDarkMode = false, onToggleDarkMode }) {
  const { t, fontClass, isRTL, language } = useLanguage();
  const [notifications, setNotifications] = useState(true);

  // Preference states
  const [dietary, setDietary] = useState(t.profile.dietaryOptions[0]);
  const [allergies, setAllergies] = useState([t.profile.allergyOptions[0]]);
  const [household, setHousehold] = useState(t.profile.householdOptions[1]);

  // Modal states
  const [activeModal, setActiveModal] = useState(null);

  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  // Format allergies for display
  const formatAllergies = () => {
    if (allergies.length === 0 || (allergies.length === 1 && allergies[0] === t.profile.allergyOptions[0])) {
      return t.profile.allergyOptions[0];
    }
    const filtered = allergies.filter(a => a !== t.profile.allergyOptions[0]);
    return filtered.length > 2 ? `${filtered.slice(0, 2).join(', ')}...` : filtered.join(', ');
  };

  const preferences = [
    { key: 'dietary', icon: Heart, label: t.profile.dietary, value: dietary, options: t.profile.dietaryOptions, isMulti: false },
    { key: 'allergies', icon: AlertCircle, label: t.profile.allergies, value: formatAllergies(), options: t.profile.allergyOptions, isMulti: true },
    { key: 'household', icon: Users, label: t.profile.household, value: household, options: t.profile.householdOptions, isMulti: false },
  ];

  const settings = [
    { icon: Bell, label: t.profile.notifications, toggle: true, value: notifications, onChange: setNotifications },
    { icon: Moon, label: t.profile.darkMode, toggle: true, value: isDarkMode, onChange: onToggleDarkMode },
  ];

  const handlePreferenceSelect = (key, value) => {
    if (key === 'dietary') setDietary(value);
    else if (key === 'allergies') setAllergies(value);
    else if (key === 'household') setHousehold(value);
  };

  const getSelectedValue = (key) => {
    if (key === 'dietary') return dietary;
    if (key === 'allergies') return allergies;
    if (key === 'household') return household;
    return null;
  };

  return (
    <div className={`absolute inset-0 bottom-20 flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className="pt-10 pb-4 px-6">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <motion.h1
            layout
            className={`${fontClass.heading} text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {t.profile.title}
          </motion.h1>
          <LanguageToggle isLight={!isDarkMode} isAbsolute={false} />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-24">
        {/* Profile Card */}
        <motion.div
          className={`rounded-3xl p-5 shadow-sm mb-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-full flex items-center justify-center shadow-lg">
              <User size={28} className="text-white" />
            </div>
            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className={`${fontClass.heading} text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'سارة أحمد' : language === 'fr' ? 'Sarah Martin' : 'Sarah Johnson'}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.profile.memberSince} {language === 'ar' ? 'يناير ٢٠٢٤' : language === 'fr' ? 'Janvier 2024' : 'January 2024'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Preferences Section */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className={`${fontClass.body} text-xs font-semibold uppercase tracking-wider mb-2 px-1 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {t.profile.preferences}
          </h3>
          <div className={`rounded-2xl shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {preferences.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(248, 250, 252, 1)' }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveModal(item.key)}
                className={`w-full flex items-center gap-3 p-4 ${index < preferences.length - 1 ? (isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-100') : ''} ${isRTL ? 'flex-row-reverse' : ''} transition-colors`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-800/10'}`}>
                  <item.icon size={18} className="text-emerald-500" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className={`${fontClass.body} text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                </div>
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.value}</span>
                  <Arrow size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className={`${fontClass.body} text-xs font-semibold uppercase tracking-wider mb-2 px-1 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {t.profile.settings}
          </h3>
          <div className={`rounded-2xl shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {settings.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 ${index < settings.length - 1 ? (isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-100') : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-800/10'}`}>
                  <item.icon size={18} className="text-emerald-500" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className={`${fontClass.body} text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                </div>
                {/* Toggle Switch */}
                <button
                  onClick={() => item.onChange()}
                  className={`w-11 h-6 rounded-full transition-colors duration-300 ${item.value ? 'bg-emerald-600' : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')}`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-sm"
                    animate={{ x: item.value ? (isRTL ? 2 : 22) : (isRTL ? 22 : 2) }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={`rounded-2xl shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`flex items-center gap-3 p-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                <HelpCircle size={18} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              </div>
              <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <p className={`${fontClass.body} text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.profile.support}</p>
              </div>
              <Arrow size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          className={`w-full flex items-center justify-center gap-2 p-4 rounded-2xl shadow-sm text-red-500 ${isRTL ? 'flex-row-reverse' : ''} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={18} />
          <span className={`${fontClass.body} text-sm font-medium`}>{t.profile.logout}</span>
        </motion.button>
      </div>

      {/* Preference Modals */}
      {preferences.map((pref) => (
        <PreferenceModal
          key={pref.key}
          isOpen={activeModal === pref.key}
          onClose={() => setActiveModal(null)}
          title={pref.label}
          options={pref.options}
          selected={getSelectedValue(pref.key)}
          onSelect={(value) => handlePreferenceSelect(pref.key, value)}
          isMulti={pref.isMulti}
          isDarkMode={isDarkMode}
          isRTL={isRTL}
          fontClass={fontClass}
          saveLabel={t.profile.save}
        />
      ))}
    </div>
  );
}

