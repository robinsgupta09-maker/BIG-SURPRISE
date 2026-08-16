import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { CONFIG } from "../config";

interface FakePaymentScreenProps {
  onNext: () => void;
}

export const FakePaymentScreen: React.FC<FakePaymentScreenProps> = ({
  onNext,
}) => {
  const [showPrankModal, setShowPrankModal] = useState(false);

  const handlePayClick = () => {
    setShowPrankModal(true);
    // Fire funny confetti burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleProceed = () => {
    setShowPrankModal(false);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg p-6 md:p-8 text-center rounded-3xl glass-card relative shadow-xl flex flex-col items-center"
    >
      {/* Decorative backgrounds */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-indigo-100/50 rounded-full blur-3xl" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="text-5xl mb-4 select-none block animate-float">💳🤭</span>
        
        <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
          {CONFIG.fakePayment.title}
        </h3>
        
        <p className="text-sm md:text-base text-slate-500 font-medium max-w-sm mb-6 leading-relaxed">
          {CONFIG.fakePayment.subtitle}
        </p>

        {/* Fake Invoice Card */}
        <div className="w-full max-w-[340px] bg-white border border-slate-100 rounded-2xl p-5 shadow-md mb-8 text-left relative overflow-hidden">
          <div className="absolute right-[-10px] top-[-10px] w-20 h-20 bg-rose-50 rounded-full blur-xl opacity-60"></div>
          
          <div className="flex justify-between items-start mb-4 pb-3 border-b border-dashed border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                {CONFIG.fakePayment.agreementName}
              </h3>
              <p className="text-xxs text-slate-400 font-medium">
                Ref: BF-{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-rose-500 font-serif">
                {CONFIG.fakePayment.price}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>Appointment Fee</span>
              <span>₹499.00</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>Therapist Upgrades</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-800 border-t border-slate-50 pt-2">
              <span>Total Amount</span>
              <span>₹499.00</span>
            </div>
          </div>

          <div className="text-center bg-slate-50 py-1.5 rounded-lg border border-slate-100 mb-2">
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              {CONFIG.fakePayment.details}
            </p>
          </div>

          {/* Dummy Barcode styling */}
          <div className="flex flex-col items-center mt-4 pt-2">
            <div className="flex space-x-1.5 h-6 opacity-30">
              <div className="w-1.5 bg-slate-800 h-full"></div>
              <div className="w-0.5 bg-slate-800 h-full"></div>
              <div className="w-1 bg-slate-800 h-full"></div>
              <div className="w-2 bg-slate-800 h-full"></div>
              <div className="w-0.5 bg-slate-800 h-full"></div>
              <div className="w-1.5 bg-slate-800 h-full"></div>
              <div className="w-1 bg-slate-800 h-full"></div>
              <div className="w-0.5 bg-slate-800 h-full"></div>
            </div>
            <span className="text-[8px] text-slate-400 font-mono tracking-widest mt-1">
              * BEST-FRIENDS-FOREVER *
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePayClick}
          className={`w-full max-w-[280px] py-4 rounded-full text-base font-semibold shadow-md active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${CONFIG.theme.primaryColor}`}
        >
          <CreditCard className="w-5 h-5" />
          {CONFIG.fakePayment.buttonText}
        </button>

        <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          100% secure mock checkout. No money will be charged.
        </p>
      </div>

      {/* Prank modal overlay */}
      <AnimatePresence>
        {showPrankModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-8 text-center rounded-3xl glass-card relative overflow-hidden shadow-2xl"
            >
              {/* Confetti bubble element decoration */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-100/50 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-rose-100/50 rounded-full blur-3xl" />

              <span className="text-6xl block mb-6 animate-bounce-slow">😹💳</span>
              
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4">
                {CONFIG.fakePayment.jokeTitle}
              </h2>
              
              <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-8">
                {CONFIG.fakePayment.jokeSubtitle}
              </p>

              <button
                onClick={handleProceed}
                className={`px-8 py-3.5 rounded-full text-base font-semibold shadow-md active:scale-95 transition-all cursor-pointer ${CONFIG.theme.primaryColor}`}
              >
                {CONFIG.fakePayment.jokeButtonText}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
