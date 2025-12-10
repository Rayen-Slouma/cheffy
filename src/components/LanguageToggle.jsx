import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle({ isLight = false, isAbsolute = true }) {
  const { language, setLanguage, isRTL } = useLanguage();

  const languages = ['EN', 'FR', 'AR'];

  return (
    <motion.div
      layout
      className={`
        ${isAbsolute ? 'absolute top-12 z-40' : ''}
        ${isAbsolute && (isRTL ? 'left-4' : 'right-4')}
      `}
    >
      <div className={`flex items-center gap-1 ${isLight ? 'bg-gray-100' : 'bg-white/20 backdrop-blur-md'} rounded-full px-2 py-1.5`}>
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang.toLowerCase())}
            className={`
              px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
              ${language === lang.toLowerCase()
                ? isLight ? 'bg-emerald-800 text-white' : 'bg-white text-gray-900'
                : isLight ? 'text-gray-600 hover:bg-gray-200' : 'text-white hover:bg-white/10'
              }
            `}
          >
            {lang}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

