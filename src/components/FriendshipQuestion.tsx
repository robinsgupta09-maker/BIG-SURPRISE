import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";

interface FriendshipQuestionProps {
  onNext: (selectedAnswer: string) => void;
}

export const FriendshipQuestion: React.FC<FriendshipQuestionProps> = ({
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleContinue = () => {
    if (selectedOption) {
      onNext(selectedOption);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg p-8 md:p-12 text-center rounded-3xl glass-card relative shadow-xl"
    >
      {/* Decorative backgrounds */}
      <div className="absolute -top-12 -left-12 w-28 h-28 bg-rose-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-violet-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-6xl mb-6 select-none animate-float block">
          👑😜
        </span>
        
        <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
          One last thing...
        </h3>
        
        <h1 className="font-serif text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mb-8">
          {CONFIG.friendshipQuestion.title}
        </h1>

        {/* Options Row */}
        <div className="flex justify-center gap-4 w-full max-w-[340px] mb-8">
          {CONFIG.friendshipQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`flex-1 py-4 px-6 rounded-2xl border text-base font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                  isSelected
                    ? "bg-violet-400 border-violet-400 text-white shadow-md ring-2 ring-violet-200"
                    : "bg-white/40 border-slate-200 text-slate-600 hover:bg-white/80 hover:border-slate-300"
                }`}
              >
                <span className="block text-2xl mb-1 select-none">{opt.emoji}</span>
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Response block */}
        <div className="h-28 flex flex-col items-center justify-center w-full">
          <AnimatePresence>
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="flex flex-col items-center w-full"
              >
                <div className="mb-6 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium text-slate-700 italic max-w-xs shadow-sm relative">
                  "{CONFIG.friendshipQuestion.responses[selectedOption]}"
                  <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-50 border-r border-b border-slate-100 rotate-45"></div>
                </div>

                <button
                  onClick={handleContinue}
                  className={`w-full max-w-[280px] py-3.5 rounded-full text-base font-semibold shadow-md active:scale-95 transition-all duration-300 cursor-pointer ${CONFIG.theme.primaryColor}`}
                >
                  {CONFIG.friendshipQuestion.buttonText}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
