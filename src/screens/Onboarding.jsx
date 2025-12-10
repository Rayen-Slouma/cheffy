import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Onboarding({ onStart }) {
  const { t, fontClass, isRTL } = useLanguage();

  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80')`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
      </div>

      {/* Content */}
      <motion.div 
        className="absolute inset-0 flex flex-col justify-end pb-20 px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Main Text */}
        <motion.h1 
          layout
          className={`
            ${fontClass.heading} text-4xl font-semibold text-white mb-4 leading-tight
            ${isRTL ? 'text-right' : 'text-left'}
          `}
        >
          {t.start}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          layout
          className={`
            ${fontClass.body} text-lg text-white/80 mb-10
            ${isRTL ? 'text-right' : 'text-left'}
          `}
        >
          {t.sub}
        </motion.p>

        {/* Start Button (Pill) */}
        <motion.button
          onClick={onStart}
          className="w-full py-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-full font-medium text-lg transition-all duration-300 shadow-lg shadow-emerald-900/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t.btn_start}
        </motion.button>
      </motion.div>
    </div>
  );
}

