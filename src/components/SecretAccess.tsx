import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, Lock, Unlock } from "lucide-react";
import confetti from "canvas-confetti";
import { CONFIG } from "../config";

interface SecretAccessProps {
  onUnlock: () => void;
}

// Expected SHA-256 hash of "18092006"
const EXPECTED_HASH = "d43705457e224a509c7fc5a93400abaf33b9957d312d9b8a2ec708b3bf6b99e8";

// SHA-256 Helper using browser Web Crypto API
async function hashPassword(plainText: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(plainText);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const SecretAccess: React.FC<SecretAccessProps> = ({ onUnlock }) => {
  const shouldReduceMotion = useReducedMotion();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [stage, setStage] = useState<"gate" | "success">("gate");
  const [bgPosition, setBgPosition] = useState("0% 50%");

  // Slowly shifting background positioning
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setErrorMsg(null);
    const hash = await hashPassword(password);

    if (hash === EXPECTED_HASH) {
      // Access granted!
      setStage("success");
      
      // Persist in session storage
      sessionStorage.setItem("best_friend_access_granted", "true");

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 55,
        origin: { y: 0.6 }
      });

      // Extra delayed star particles
      if (!shouldReduceMotion) {
        setTimeout(() => {
          confetti({
            particleCount: 30,
            angle: 60,
            spread: 45,
            origin: { x: 0.2 }
          });
        }, 200);
        setTimeout(() => {
          confetti({
            particleCount: 30,
            angle: 120,
            spread: 45,
            origin: { x: 0.8 }
          });
        }, 350);
      }

      // Transition to entry experience after success display
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      // Access denied
      setShakeTrigger((prev) => prev + 1);
      const incorrectList = CONFIG.secretAccess.incorrectMessages;
      const randomMsg = incorrectList[Math.floor(Math.random() * incorrectList.length)];
      setErrorMsg(randomMsg);
      setPassword("");
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full min-h-screen flex items-center justify-center p-4 z-50 overflow-hidden font-sans select-none transition-all duration-[6s] ease-in-out bg-gradient-to-br from-rose-100 via-violet-50 to-sky-100"
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: bgPosition
      }}
    >
      {/* Background ambient particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-[15%] left-[20%] text-2xl animate-pulse">✨</div>
          <div className="absolute top-[30%] right-[15%] text-2xl animate-bounce duration-5000">💖</div>
          <div className="absolute bottom-[20%] left-[10%] text-xl animate-float">❤️</div>
          <div className="absolute bottom-[15%] right-[25%] text-xl animate-pulse duration-4000">⭐</div>
        </div>
      )}

      {/* Main Container Card */}
      <AnimatePresence mode="wait">
        {stage === "gate" ? (
          <motion.div
            key="gate-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-lg p-8 md:p-12 text-center rounded-3xl glass-card shadow-2xl flex flex-col items-center border border-white/60 relative"
          >
            <span className="text-[10px] tracking-widest text-slate-400 font-extrabold uppercase mb-4 flex items-center gap-1">
              ♡ Just For You ♡
            </span>

            <h1 className="font-serif text-3xl md:text-3.5xl font-extrabold text-slate-800 leading-tight mb-3">
              {CONFIG.secretAccess.title}
            </h1>

            <p className="font-sans text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-sm mb-6">
              {CONFIG.secretAccess.subtitle}
            </p>

            <span className="text-xs text-rose-400 font-bold uppercase tracking-wider mb-6">
              {CONFIG.secretAccess.question}
            </span>

            {/* Password input form */}
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">
              <motion.div
                animate={shouldReduceMotion ? {} : { x: shakeTrigger ? [-10, 10, -10, 10, -5, 5, 0] : 0 }}
                transition={{ duration: 0.4 }}
                className="w-full relative flex items-center mb-6"
              >
                <Lock className="w-4 h-4 text-slate-300 absolute left-4 pointer-events-none" />
                
                <input
                  type={showPassword ? "text" : "password"}
                  inputMode="numeric"
                  maxLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value.replace(/\D/g, ""))} // Only allow digits
                  placeholder={CONFIG.secretAccess.placeholder}
                  className="w-full pl-11 pr-12 py-3.5 rounded-full border border-slate-200/60 bg-white/50 text-center font-mono text-base font-bold text-slate-700 placeholder-slate-400/80 focus:border-rose-300 focus:ring-4 focus:ring-rose-200/20 focus:outline-none transition-all shadow-inner"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 p-1 text-slate-300 hover:text-slate-500 transition-colors focus:outline-none cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </motion.div>

              {/* Error messages block */}
              <div className="h-6 mb-4 flex items-center justify-center">
                <AnimatePresence>
                  {errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-semibold text-rose-500"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Unlock Button */}
              <button
                type="submit"
                disabled={password.length === 0}
                className={`w-full py-4 rounded-full text-base font-bold shadow-md active:scale-[0.97] hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2 select-none min-h-[52px] ${
                  password.length > 0
                    ? "bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                <Unlock className="w-4 h-4" />
                {CONFIG.secretAccess.buttonText}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            className="text-center p-8 max-w-md flex flex-col items-center"
          >
            <span className="text-6xl block mb-6 animate-bounce-slow">🎉💖</span>
            
            <h1 className="font-serif text-3xl font-extrabold text-slate-800 leading-tight mb-2">
              {CONFIG.secretAccess.successTitle}
            </h1>

            <p className="text-base text-rose-500 font-bold mb-6 animate-pulse">
              {CONFIG.secretAccess.successMessage}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/40 border border-white/60 rounded-2xl px-6 py-4 shadow-sm"
            >
              <h2 className="font-serif text-xl font-bold text-slate-700 mb-1">
                Okay... I know it's you. ❤️
              </h2>
              <p className="text-xs text-slate-400 font-bold tracking-wide uppercase">
                Preparing something for you...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
