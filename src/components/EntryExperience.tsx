import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Heart, Sparkles, Flame, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { CONFIG } from "../config";

interface EntryExperienceProps {
  onComplete: () => void;
}

export const EntryExperience: React.FC<EntryExperienceProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"loading" | "warning" | "intro">("loading");
  
  // Custom slow moving pastel gradient background
  const [bgPosition, setBgPosition] = useState("0% 50%");

  // Progress logic
  useEffect(() => {
    if (stage !== "loading") return;

    const totalDuration = 3200; // ~3.2 seconds total duration
    const intervalTime = 30; // update every 30ms
    const totalSteps = totalDuration / intervalTime;
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + (Math.random() * 0.8 - 0.4); // Add subtle natural variation
        if (next >= 100) {
          clearInterval(timer);
          // Wait briefly at 100% for feedback, then transition to warning
          setTimeout(() => {
            setStage("warning");
          }, 450);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [stage]);

  // Handle slowly shifting background positioning
  useEffect(() => {
    if (shouldReduceMotion) return;
    const positions = ["0% 50%", "50% 100%", "100% 50%", "50% 0%"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % positions.length;
      setBgPosition(positions[index]);
    }, 6000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Loading messages based on progress percentage
  const getLoadingMessage = (p: number) => {
    const messages = CONFIG.entryExperience.loadingMessages;
    if (p < 20) return messages[0];
    if (p < 40) return messages[1];
    if (p < 60) return messages[2];
    if (p < 80) return messages[3];
    if (p < 95) return messages[4];
    return messages[5];
  };

  // Generate ASCII progress bar
  const getASCIIProgressBar = (p: number) => {
    const totalBlocks = 18;
    const filledBlocks = Math.floor((p / 100) * totalBlocks);
    const unfilledBlocks = totalBlocks - filledBlocks;
    return "█".repeat(filledBlocks) + "░".repeat(unfilledBlocks);
  };

  // Handle the ENTER action
  const handleEnter = () => {
    // Confetti burst!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Extra cute delayed sparkles
    if (!shouldReduceMotion) {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.1 }
        });
      }, 200);
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.9 }
        });
      }, 350);
    }

    setStage("intro");
    
    // Auto complete entry after brief personalized greeting
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  // Status checkmarks data
  const statusItems = [
    { text: "Friendship data loaded", threshold: 25 },
    { text: "Chaos level calculated", threshold: 50 },
    { text: "Memories recovered", threshold: 75 },
    { text: "Best-friend status verified", threshold: 100 }
  ];

  return (
    <div 
      className="fixed inset-0 w-full h-full min-h-screen flex items-center justify-center p-4 z-50 overflow-hidden font-sans select-none transition-all duration-[6s] ease-in-out bg-gradient-to-br from-rose-100 via-violet-50 to-sky-100"
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: bgPosition
      }}
    >
      {/* Background floating elements (sparkles/hearts) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          <div className="absolute top-[10%] left-[15%] text-2xl animate-pulse">✨</div>
          <div className="absolute top-[20%] right-[10%] text-3xl animate-bounce duration-5000">💖</div>
          <div className="absolute bottom-[25%] left-[8%] text-2xl animate-bounce duration-4000">❤️</div>
          <div className="absolute bottom-[12%] right-[20%] text-xl animate-pulse duration-3000">⭐</div>
          <div className="absolute top-[55%] left-[80%] text-2xl animate-float">🌸</div>
        </div>
      )}

      {/* Main Glassmorphic Container Card */}
      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <motion.div
            key="loading-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-lg p-6 md:p-10 rounded-3xl glass-card shadow-2xl flex flex-col items-center relative overflow-hidden"
          >
            {/* Entry Polaroid Photo */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: -3 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { 
                opacity: 1, 
                scale: 1, 
                rotate: -2,
                y: [0, -6, 0]
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotate: { duration: 0.5 },
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }
              }}
              className="bg-white p-3 pb-5 shadow-lg border border-slate-100/50 rounded-sm transform rotate-[-2deg] mb-6 max-w-[200px]"
            >
              <div className="w-[176px] h-[220px] bg-slate-50 overflow-hidden border border-slate-100/50 rounded-xs mb-3">
                <img
                  src={CONFIG.photos.entry}
                  alt="A little surprise"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-serif italic text-xs text-slate-500 text-center font-medium leading-none">
                For you, with love.
              </p>
            </motion.div>

            {/* Header */}
            <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase mb-2">
              A Little Something For You
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-800 text-center leading-tight mb-8">
              {CONFIG.entryExperience.loadingTitle} <span className="text-rose-400 block sm:inline">{CONFIG.friendName}...</span>
            </h1>

            {/* Progress Display */}
            <div className="w-full flex flex-col items-center mb-6">
              <span className="text-xs text-rose-500 font-bold mb-2 h-5 text-center flex items-center justify-center animate-pulse">
                {getLoadingMessage(progress)}
              </span>
              
              {/* ASCII Progress Bar */}
              <div className="font-mono text-xs md:text-sm text-slate-500 tracking-wider bg-slate-900/5 px-4 py-2 rounded-xl border border-white/50 shadow-inner">
                {getASCIIProgressBar(progress)} {Math.floor(progress)}%
              </div>
            </div>

            {/* Fake System Status Checkboxes */}
            <div className="w-full max-w-[280px] space-y-2 mt-2">
              {statusItems.map((item, idx) => {
                const isChecked = progress >= item.threshold;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-center gap-2.5 text-left text-xs font-semibold"
                  >
                    <CheckCircle2 
                      className={`w-4 h-4 transition-all duration-300 ${
                        isChecked 
                          ? "text-emerald-400 fill-emerald-50 scale-110" 
                          : "text-slate-300 scale-90 opacity-60"
                      }`}
                    />
                    <span className={isChecked ? "text-slate-700" : "text-slate-400 opacity-60 font-normal"}>
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {stage === "warning" && (
          <motion.div
            key="warning-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              boxShadow: "0 25px 50px -12px rgba(244, 63, 94, 0.08), 0 2px 2px 0 rgba(255, 255, 255, 0.6) inset" 
            }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-lg p-6 md:p-10 rounded-3xl glass-card shadow-2xl flex flex-col items-center border border-rose-200/50"
          >
            {/* Shaking Alert Sign */}
            <motion.div
              animate={shouldReduceMotion ? {} : { 
                rotate: [-2, 2, -2, 2, 0],
                y: [0, -2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                repeatDelay: 2
              }}
              className="p-3.5 bg-rose-50 border border-rose-100 rounded-full text-rose-500 mb-4 shadow-sm"
            >
              <AlertTriangle className="w-8 h-8 fill-rose-50/20" />
            </motion.div>

            <span className="text-[10px] tracking-widest text-rose-500 font-extrabold uppercase mb-2 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100/50">
              ⚠️ Important Notice
            </span>
            
            <h1 className="font-serif text-2xl md:text-3.5xl font-extrabold text-slate-800 text-center leading-tight mb-4">
              {CONFIG.entryExperience.warningTitle}
            </h1>

            <p className="text-xs text-slate-400 font-bold mb-6 tracking-wide uppercase">
              This website contains:
            </p>

            {/* List items with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm mb-8">
              {CONFIG.entryExperience.warningItems.map((item, idx) => {
                const icons = [
                  <Heart key="heart" className="w-4 h-4 text-rose-400 fill-rose-100" />,
                  <Flame key="flame" className="w-4 h-4 text-amber-500 fill-amber-50" />,
                  <Sparkles key="sparkles" className="w-4 h-4 text-violet-400 fill-violet-50" />,
                  <RefreshCw key="refresh" className="w-4 h-4 text-sky-400" />
                ];
                return (
                  <div 
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 bg-white/40 border border-white/80 rounded-xl shadow-xxs text-xs font-bold text-slate-700 hover:bg-white/80 transition-colors"
                  >
                    {icons[idx] || <Sparkles className="w-4 h-4 text-pink-400" />}
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>

            {/* Enter Button */}
            <button
              onClick={handleEnter}
              className={`w-full max-w-[280px] py-4 rounded-full text-sm md:text-base font-bold shadow-md hover:shadow-lg active:scale-95 transform transition-all duration-300 cursor-pointer text-white flex items-center justify-center gap-2 bg-rose-400 hover:bg-rose-500 focus:ring-rose-200 ring-4 ring-rose-200/20`}
            >
              {CONFIG.entryExperience.enterButtonText}
            </button>
          </motion.div>
        )}

        {stage === "intro" && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="text-center p-8 max-w-md"
          >
            <span className="text-5xl md:text-6xl block mb-6 animate-bounce-slow">✨🥰</span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
              Okay {CONFIG.friendName}...
            </h2>
            <p className="text-lg text-rose-500 font-bold mt-3 animate-pulse">
              {CONFIG.entryExperience.finalIntroText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
