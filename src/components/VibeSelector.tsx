import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { CONFIG } from "../config";
import type { FoodOption } from "../config";

interface VibeSelectorProps {
  onNext: (vibe: FoodOption) => void;
  initialVibeId?: string;
}

export const VibeSelector: React.FC<VibeSelectorProps> = ({
  onNext,
  initialVibeId = "",
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialVibeId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleContinue = () => {
    const selectedVibe = CONFIG.vibeSelector.options.find(
      (opt) => opt.id === selectedId
    );
    if (selectedVibe) {
      onNext(selectedVibe);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg p-6 md:p-8 text-center rounded-3xl glass-card relative shadow-xl"
    >
      {/* Decorative backgrounds */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-rose-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-5xl mb-4 select-none block animate-float">
          🍕✨
        </span>
        
        <h1 className="font-serif text-3xl font-bold text-slate-800 mb-1">
          {CONFIG.vibeSelector.title}
        </h1>
        
        <p className="text-sm text-slate-500 font-medium mb-6">
          {CONFIG.vibeSelector.subtitle}
        </p>

        {/* Grid layout */}
        <div className="grid grid-cols-2 gap-3.5 w-full max-w-[420px] mb-8">
          {CONFIG.vibeSelector.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`group p-4 rounded-2xl border text-center transition-all duration-300 relative overflow-hidden flex flex-col items-center cursor-pointer transform active:scale-95 ${
                  isSelected
                    ? "bg-rose-50/70 border-rose-300/80 shadow-md ring-2 ring-rose-200"
                    : "bg-white/40 border-slate-200 hover:border-slate-300 hover:bg-white/80 hover:shadow-sm"
                }`}
              >
                {/* Emoji with bounce on hover/selected */}
                <span
                  className={`text-4.5xl mb-2 block transition-transform duration-300 select-none group-hover:scale-115 ${
                    isSelected ? "animate-bounce scale-110" : ""
                  }`}
                >
                  {opt.emoji}
                </span>
                
                <h3 className="font-semibold text-slate-800 text-sm mb-0.5">
                  {opt.name}
                </h3>
                
                <p className="text-xxs text-slate-400 font-medium leading-tight max-w-[120px]">
                  {opt.description}
                </p>

                {/* Checked Badge */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-2 right-2 bg-rose-400 text-white rounded-full p-0.5 shadow-sm"
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Select Success Prompt & Button */}
        <div className="h-20 flex flex-col items-center justify-center w-full">
          <AnimatePresence>
            {selectedId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col items-center w-full"
              >
                <p className="text-rose-500 font-semibold text-sm mb-4">
                  {CONFIG.vibeSelector.successMessage}
                </p>
                <button
                  onClick={handleContinue}
                  className={`w-full max-w-[280px] py-3.5 rounded-full text-base font-semibold shadow-md active:scale-95 transition-all duration-300 cursor-pointer ${CONFIG.theme.primaryColor}`}
                >
                  {CONFIG.vibeSelector.buttonText}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
