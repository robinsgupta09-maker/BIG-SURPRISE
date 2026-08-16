import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { CONFIG } from "../config";

interface QuestionScreenProps {
  onNext: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({ onNext }) => {
  const [nopeAttempts, setNopeAttempts] = useState(0);
  const [nopePosition, setNopePosition] = useState<{ x: number; y: number } | null>(null);
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleObviouslyClick = () => {
    // Fire a tiny confetti
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0.3, y: 0.8 }
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 0.7, y: 0.8 }
    });
    onNext();
  };

  const teleportNopeButton = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 140; // Approx width of the button
    const buttonHeight = 50; // Approx height of the button

    // Calculate maximum boundaries so the button stays inside the card
    const maxX = containerRect.width - buttonWidth - 32;
    const maxY = containerRect.height - buttonHeight - 32;

    // Generate random coordinates inside the card container boundaries
    const randomX = Math.max(16, Math.floor(Math.random() * maxX));
    const randomY = Math.max(containerRect.height / 2, Math.floor(Math.random() * maxY));

    setNopePosition({ x: randomX, y: randomY });

    // Show a funny message
    const phraseIndex = nopeAttempts % CONFIG.funnyQuestion.nopePhrases.length;
    setBubbleMessage(CONFIG.funnyQuestion.nopePhrases[phraseIndex]);
    setNopeAttempts((prev) => prev + 1);
  };

  const handleNopeHover = (e: React.MouseEvent) => {
    e.preventDefault();
    teleportNopeButton();
  };

  const handleNopeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    teleportNopeButton();
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg p-8 md:p-12 text-center rounded-3xl glass-card relative min-h-[400px] flex flex-col justify-between shadow-xl"
    >
      {/* Decorative backgrounds */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-200/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-sky-200/50 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center mt-4">
        <span className="text-6xl mb-6 select-none animate-bounce block">
          😭👀
        </span>
        
        <h1 className="font-serif text-3xl md:text-3.5xl font-extrabold text-slate-800 tracking-tight leading-tight mb-3">
          {CONFIG.funnyQuestion.title}
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 font-medium max-w-sm mb-6 leading-relaxed">
          {CONFIG.funnyQuestion.subtitle}
        </p>

        {/* Playful speech bubble */}
        <AnimatePresence mode="wait">
          {bubbleMessage && (
            <motion.div
              key={bubbleMessage}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="mb-6 bg-rose-50 text-rose-500 border border-rose-100 rounded-2xl px-4 py-2 text-sm font-semibold max-w-xs shadow-sm relative"
            >
              {bubbleMessage}
              <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-rose-50 border-r border-b border-rose-100 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive buttons */}
      <div className="relative w-full h-24 flex items-center justify-center space-x-4 mt-8">
        <button
          onClick={handleObviouslyClick}
          className={`px-8 py-3.5 rounded-full text-base font-semibold shadow-md hover:shadow-lg active:scale-95 transform transition-all duration-300 cursor-pointer ${CONFIG.theme.primaryColor}`}
        >
          {CONFIG.funnyQuestion.buttonObviously}
        </button>

        {/* Teleporting Nope button */}
        <button
          onMouseEnter={handleNopeHover}
          onClick={handleNopeClick}
          style={
            nopePosition
              ? {
                  position: "absolute",
                  left: `${nopePosition.x}px`,
                  top: `${nopePosition.y}px`,
                  transition: "left 0.15s ease-out, top 0.15s ease-out",
                }
              : {}
          }
          className={`px-8 py-3.5 rounded-full text-base font-semibold border border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-700 bg-white/70 shadow-sm transition-all duration-300 cursor-pointer ${
            nopePosition ? "z-20" : ""
          }`}
        >
          {CONFIG.funnyQuestion.buttonNope}
        </button>
      </div>
    </motion.div>
  );
};
