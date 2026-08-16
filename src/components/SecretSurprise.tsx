import React, { useState } from "react";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";

export const SecretSurprise: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    const nextCount = clickCount + 1;
    if (nextCount >= CONFIG.secretSurprise.requiredClicks) {
      setClickCount(0);
      setShowModal(true);
      
      // Fire confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Fire extra delayed bursts for premium feel
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
      }, 250);
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } else {
      setClickCount(nextCount);
    }
  };

  return (
    <>
      {/* Hidden small trigger in bottom right */}
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 z-40 p-2 text-slate-300 hover:text-rose-200 transition-colors duration-300 active:scale-90 cursor-pointer select-none"
        title="Shhh..."
      >
        <Heart className="w-4 h-4 fill-current opacity-40 hover:opacity-100 transition-opacity" />
      </button>

      {/* Secret Message Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-8 text-center rounded-3xl glass-card relative overflow-hidden shadow-2xl"
            >
              {/* Decorative backgrounds */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-rose-200 rounded-full blur-2xl opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-violet-200 rounded-full blur-2xl opacity-50"></div>

              <span className="text-5xl block mb-4 animate-bounce-slow">✨💖✨</span>
              
              <h3 className="font-serif text-3xl font-bold text-rose-500 mb-3">
                {CONFIG.secretSurprise.title}
              </h3>
              
              <p className="text-lg text-slate-700 font-medium mb-6 italic leading-relaxed">
                "{CONFIG.secretSurprise.message}"
              </p>
              
              <button
                onClick={() => setShowModal(false)}
                className={`px-6 py-2.5 rounded-full font-semibold shadow-md active:scale-95 transition-all cursor-pointer ${CONFIG.theme.primaryColor}`}
              >
                Awww, okay! 🥹
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
