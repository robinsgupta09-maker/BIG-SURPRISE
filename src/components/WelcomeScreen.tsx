import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { CONFIG } from "../config";

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Trigger a small, local burst of pink heart particles around the button
    confetti({
      particleCount: 15,
      spread: 45,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ["#fda4af", "#f43f5e", "#f472b6"],
      scalar: 0.85
    });

    // Brief delay for the animation to be seen before continuing navigation
    setTimeout(() => {
      onNext();
    }, 320);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.98 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto p-8 md:p-12 text-center rounded-3xl glass-card relative overflow-hidden shadow-xl"
    >
      {/* Decorative blurry background glows */}
      <div className="absolute -top-12 -left-12 w-28 h-28 bg-rose-200/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-violet-200/50 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        {/* 1. Sparkles icon at the top */}
        <Sparkles className="w-5 h-5 text-amber-400 mb-3 animate-pulse shrink-0" />

        {/* 2. Personalized Micro-Text */}
        <p className="text-[10px] md:text-[11px] font-sans font-bold tracking-widest text-slate-400 uppercase mb-4 opacity-90 select-none">
          {CONFIG.welcome.microText}
        </p>

        {/* 3. Photo or fallback card */}
        {CONFIG.photos.welcome ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-[72vw] sm:w-[260px] h-[340px] max-w-[280px] rounded-[22px] overflow-hidden border border-white/40 shadow-md mb-[35px] md:mb-[45px] shrink-0"
          >
            <img
              src={CONFIG.photos.welcome}
              alt="Welcome"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[72vw] sm:w-[260px] h-[340px] max-w-[280px] rounded-[22px] bg-white/30 border border-white/45 flex items-center justify-center shadow-md mb-[35px] md:mb-[45px] shrink-0 relative overflow-hidden"
          >
            <div className="absolute w-20 h-20 bg-rose-200/50 rounded-full blur-xl animate-pulse" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <Heart className="w-14 h-14 text-rose-400 fill-rose-100 animate-pulse" />
              <span className="text-[10px] font-serif italic text-slate-500 font-bold select-none">For You</span>
            </motion.div>
          </motion.div>
        )}
        
        {/* 4. Spacing: Photo -> 35-45px -> Heading */}
        <h1 className="font-serif text-[32px] md:text-[46px] font-extrabold text-slate-800 tracking-tight leading-[1.1] mb-[16px] md:mb-[22px] max-w-md mx-auto">
          {CONFIG.welcome.title}
        </h1>
        
        {/* 5. Spacing: Heading -> 16-22px -> Subtitle */}
        <p className="font-sans text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-[500px] mb-[35px] md:mb-[45px] text-center px-2">
          {CONFIG.welcome.subtitle}
        </p>

        {/* 6. Spacing: Subtitle -> 35-45px -> Button */}
        <button
          onClick={handleButtonClick}
          className="px-10 py-4 rounded-full text-base font-bold shadow-md hover:shadow-lg active:scale-[0.97] hover:scale-[1.03] transition-all duration-300 cursor-pointer bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white focus:outline-none focus:ring-4 focus:ring-rose-200/40 select-none min-h-[52px]"
        >
          {CONFIG.welcome.buttonText}
        </button>
      </div>
    </motion.div>
  );
};
