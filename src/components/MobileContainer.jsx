import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function MobileContainer({ children, isDarkMode = false }) {
  const { isRTL, fontClass } = useLanguage();

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Scaled container to fit in viewport at 100% zoom */}
      <div
        className="origin-center"
        style={{ transform: 'scale(0.8)' }}
      >
        <motion.div
          layout
          className={`
            relative overflow-hidden
            w-[390px] h-[844px]
            rounded-[3rem]
            shadow-2xl
            border-[10px] border-gray-900
            ${isDarkMode ? 'bg-gray-900' : 'bg-slate-50'}
            ${fontClass.body}
          `}
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{
            boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.4), 0 30px 60px -30px rgba(0, 0, 0, 0.3), inset 0 0 0 2px rgba(255,255,255,0.1)'
          }}
        >
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-center">
            {/* Camera dot */}
            <div className="absolute right-4 w-2.5 h-2.5 bg-gray-800 rounded-full ring-1 ring-gray-700" />
          </div>

          {/* Screen content */}
          <div className="relative w-full h-full overflow-hidden">
            {children}
          </div>

          {/* Home indicator bar */}
          <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full z-50 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-900'}`} />
        </motion.div>
      </div>
    </div>
  );
}

