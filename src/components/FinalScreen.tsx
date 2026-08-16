import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Utensils, RefreshCw, Crown, Heart, Sparkles, Flame, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { CONFIG } from "../config";

interface FinalScreenProps {
  selectedDate: string;
  selectedTime: string;
  selectedFoodEmoji: string;
  selectedFoodName: string;
  friendshipAns: string | null;
  onReset: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  selectedDate,
  selectedTime,
  selectedFoodEmoji,
  selectedFoodName,
  friendshipAns,
  onReset,
}) => {
  // Stages: "wait" | "proper_ending" | "reveal_prompt" | "unveiled"
  const [stage, setStage] = useState<"wait" | "proper_ending" | "reveal_prompt" | "unveiled">("wait");

  const handleReveal = () => {
    setStage("unveiled");
    
    // Confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Custom heart/sparkle burst
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#fda4af", "#f43f5e", "#c084fc"]
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#fda4af", "#f43f5e", "#c084fc"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const statsItems = [
    { label: "Chaos Level", value: "99%", emoji: "😂", icon: <Flame className="w-4 h-4 text-rose-400" /> },
    { label: "Questionable Decisions", value: "∞", emoji: "🤦", icon: <Trophy className="w-4 h-4 text-amber-500" /> },
    { label: "Main Character Energy", value: "100%", emoji: "📸", icon: <Sparkles className="w-4 h-4 text-violet-400" /> },
    { label: "Laughs", value: "9,827+", emoji: "😆", icon: <Crown className="w-4 h-4 text-sky-400" /> },
    { label: "Friendship", value: "UNLIMITED", emoji: "❤️", icon: <Heart className="w-4 h-4 text-rose-500 fill-rose-100" /> },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center py-6 px-4">
      <AnimatePresence mode="wait">
        
        {/* Stage 1: Wait... */}
        {stage === "wait" && (
          <motion.div
            key="stage-wait"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md p-8 md:p-12 text-center rounded-3xl glass-card relative shadow-xl"
          >
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-rose-200/50 rounded-full blur-3xl" />
            <span className="text-6xl block mb-6 animate-float">👀</span>
            <h1 className="font-serif text-3.5xl font-extrabold text-slate-800 tracking-tight mb-4">
              Wait...
            </h1>
            <p className="text-base text-slate-600 font-medium mb-8">
              There's one more thing.
            </p>
            <button
              onClick={() => setStage("proper_ending")}
              className={`px-8 py-3.5 rounded-full text-base font-semibold shadow-md active:scale-95 transition-all duration-300 cursor-pointer bg-rose-400 hover:bg-rose-500 text-white`}
            >
              Continue →
            </button>
          </motion.div>
        )}

        {/* Stage 2: I think you deserve a proper ending. ❤️ */}
        {stage === "proper_ending" && (
          <motion.div
            key="stage-ending"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md p-8 md:p-12 text-center rounded-3xl glass-card relative shadow-xl"
          >
            <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-violet-200/50 rounded-full blur-3xl" />
            <span className="text-6xl block mb-6 animate-pulse">🫶💖</span>
            <h1 className="font-serif text-2.5xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mb-8">
              I think you deserve a proper ending. ❤️
            </h1>
            <button
              onClick={() => setStage("reveal_prompt")}
              className={`px-8 py-3.5 rounded-full text-base font-semibold shadow-md active:scale-95 transition-all duration-300 cursor-pointer bg-rose-400 hover:bg-rose-500 text-white`}
            >
              Show me →
            </button>
          </motion.div>
        )}

        {/* Stage 3: Reveal Prompt (Blurred Photo) */}
        {stage === "reveal_prompt" && (
          <motion.div
            key="stage-reveal-prompt"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md p-6 md:p-8 rounded-3xl glass-card relative shadow-xl flex flex-col items-center"
          >
            <span className="text-base text-slate-400 font-bold uppercase tracking-wider mb-6">
              One last thing...
            </span>

            {/* Blurred final image Polaroid */}
            <div className="bg-white p-3 pb-8 shadow-lg border border-slate-100/50 rounded-sm transform rotate-[-2deg] mb-8 w-full max-w-[220px]">
              <div className="w-[194px] h-[240px] bg-slate-50 overflow-hidden border border-slate-100/50 rounded-xs relative">
                <img
                  src={CONFIG.photos.final}
                  alt="Final reveal blurry"
                  className="w-full h-full object-cover filter blur-lg scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white/40 fill-white/10" />
                </div>
              </div>
            </div>

            <button
              onClick={handleReveal}
              className={`w-full max-w-[240px] py-4 rounded-full text-base font-bold shadow-md active:scale-95 transition-all duration-300 cursor-pointer bg-rose-400 hover:bg-rose-500 text-white animate-bounce-slow`}
            >
              REVEAL ❤️
            </button>
          </motion.div>
        )}

        {/* Stage 4: Unveiled (Photo unblurred + Custom Stats + Final Message) */}
        {stage === "unveiled" && (
          <motion.div
            key="stage-unveiled"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* The Main Unveiled Card */}
            <div className="w-full max-w-lg p-6 md:p-10 rounded-3xl glass-card shadow-2xl relative border border-white/60 mb-8 flex flex-col items-center">
              
              <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase mb-6 text-center block">
                Okay... This whole thing was made for you. ❤️
              </span>

              {/* Unveiled Polaroid Photo */}
              <motion.div
                initial={{ scale: 0.9, rotate: -3, filter: "blur(8px)" }}
                animate={{ scale: 1, rotate: -1.5, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="bg-white p-3 pb-8 shadow-xl border border-slate-100/50 rounded-sm mb-8 w-full max-w-[240px] flex flex-col items-center"
              >
                <div className="w-[214px] h-[270px] bg-slate-50 overflow-hidden border border-slate-100/50 rounded-xs mb-3">
                  <img
                    src={CONFIG.photos.final}
                    alt="Final reveal"
                    className="w-full h-full object-cover transition-all duration-[2s]"
                  />
                </div>
                <p className="font-serif italic text-sm text-slate-700 text-center font-bold">
                  Certified Best Friends 🫶
                </p>
              </motion.div>

              {/* Custom Final Config Message */}
              <div className="w-full text-center mb-8 px-2">
                <p className="font-serif text-lg md:text-xl font-bold text-slate-800 leading-relaxed italic whitespace-pre-line">
                  {CONFIG.finalMessage}
                </p>
              </div>

              {/* Itinerary / Summary Box */}
              <div className="w-full bg-white/60 border border-white/95 rounded-2xl p-5 text-left shadow-inner mb-8">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3.5 text-center">
                  Our Appointment Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2.5 p-2 bg-rose-50/50 rounded-xl">
                    <div className="p-1.5 bg-rose-100 rounded-lg text-rose-500 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-0.5">Date</p>
                      <p className="text-xs font-bold text-slate-700 truncate">{selectedDate || "TBD"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2 bg-violet-50/50 rounded-xl">
                    <div className="p-1.5 bg-violet-100 rounded-lg text-violet-500 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-0.5">Time</p>
                      <p className="text-xs font-bold text-slate-700 truncate">{selectedTime || "TBD"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2 bg-amber-50/50 rounded-xl">
                    <div className="p-1.5 bg-amber-100 rounded-lg text-amber-500 shrink-0">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-0.5">Vibe</p>
                      <p className="text-xs font-bold text-slate-700 truncate">
                        {selectedFoodEmoji} {selectedFoodName || "TBD"}
                      </p>
                    </div>
                  </div>
                </div>
                
                {friendshipAns && (
                  <div className="mt-3 flex items-center gap-2.5 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100/30">
                    <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-500 shrink-0">
                      <Crown className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-0.5">Cooler Friend</p>
                      <p className="text-xs font-bold text-indigo-700">
                        {friendshipAns === "me" ? `${CONFIG.friendName} 👑 (Correct choice!)` : `${CONFIG.myName} 🙄 (Highly debatable...)`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Friendship Stats Report */}
              <div className="w-full bg-slate-900/5 border border-slate-100 rounded-2xl p-5 mb-8">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-4 text-center">
                  📈 Friendship Report Card
                </h3>
                
                <div className="space-y-3">
                  {statsItems.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 * idx + 0.3 }}
                      className="flex items-center justify-between border-b border-dashed border-slate-200/50 pb-2 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2">
                        {stat.icon}
                        <span className="text-xs font-semibold text-slate-600">{stat.label}</span>
                      </div>
                      <span className="text-xs font-black text-slate-800 tracking-wide font-mono bg-white/70 px-2 py-0.5 rounded shadow-xxs">
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Reset/Do it again button */}
              <div className="flex flex-col items-center w-full">
                <button
                  onClick={onReset}
                  className="w-full max-w-[200px] py-3 rounded-full text-xs font-bold border border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Do it again!
                </button>
                
                <span className="text-[10px] text-slate-400 font-medium mt-6">
                  Made with ❤️ by {CONFIG.myName}
                </span>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
