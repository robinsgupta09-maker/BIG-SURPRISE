import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONFIG } from "./config";
import type { FoodOption } from "./config";

// Components
import { FloatingParticles } from "./components/FloatingParticles";
import { MusicToggle } from "./components/MusicToggle";
import { SecretSurprise } from "./components/SecretSurprise";
import { ProgressIndicator } from "./components/ProgressIndicator";

import { EntryExperience } from "./components/EntryExperience";
import { SecretAccess } from "./components/SecretAccess";

// Screens
import { WelcomeScreen } from "./components/WelcomeScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { DatePicker } from "./components/DatePicker";
import { VibeSelector } from "./components/VibeSelector";
import { FriendshipQuestion } from "./components/FriendshipQuestion";
import { FakePaymentScreen } from "./components/FakePaymentScreen";
import { FinalScreen } from "./components/FinalScreen";

enum Steps {
  WELCOME = 0,
  QUESTION = 1,
  DATE = 2,
  VIBE = 3,
  FRIENDSHIP = 4,
  FAKE_PAYMENT = 5,
  FINAL = 6,
}

const TOTAL_STEPS = 6; // Welcome to Fake Payment are 6 steps with indicator (0 to 5)

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (!CONFIG.secretAccess.enabled) return true;
    return sessionStorage.getItem("best_friend_access_granted") === "true";
  });
  const [showEntry, setShowEntry] = useState(CONFIG.entryExperience.enabled);
  const [step, setStep] = useState<Steps>(Steps.WELCOME);
  
  // Selection States
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<FoodOption | null>(null);
  const [friendshipAns, setFriendshipAns] = useState<string | null>(null);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const resetSurprise = () => {
    setStep(Steps.WELCOME);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedFood(null);
    setFriendshipAns(null);
  };

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <motion.div
          key="secret-access-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SecretAccess onUnlock={() => setIsAuthenticated(true)} />
        </motion.div>
      ) : showEntry ? (
        <motion.div
          key="entry-exp"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <EntryExperience onComplete={() => setShowEntry(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="app-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`min-h-screen w-full flex flex-col justify-between relative bg-gradient-to-tr ${CONFIG.theme.backgroundGradient} overflow-y-auto font-sans`}
        >
          
          {/* Global Background Elements */}
          <FloatingParticles />
          <MusicToggle />
          <SecretSurprise />

          {/* Header Area (Includes Progress Indicator for non-final screens) */}
          <header className="w-full pt-8 px-4 flex flex-col items-center z-10 shrink-0">
            <h2 className="text-rose-400/80 font-serif italic text-lg select-none">
              For {CONFIG.friendName} ✨
            </h2>
            {step < Steps.FINAL && (
              <ProgressIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
            )}
          </header>

          {/* Main Content Area (Animated Cards) */}
          <main className="w-full flex-grow flex items-center justify-center py-6 px-4 z-10">
            <div className="w-full max-w-lg flex items-center justify-center">
              <AnimatePresence mode="wait">
                {step === Steps.WELCOME && (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    <WelcomeScreen onNext={nextStep} />
                  </motion.div>
                )}

                {step === Steps.QUESTION && (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    <QuestionScreen onNext={nextStep} />
                  </motion.div>
                )}

                {step === Steps.DATE && (
                  <motion.div
                    key="date"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    <DatePicker
                      onSelect={(date, time) => {
                        setSelectedDate(date);
                        setSelectedTime(time);
                        nextStep();
                      }}
                      initialDate={selectedDate}
                      initialTime={selectedTime ? selectedTime.toLowerCase().replace(/[^a-z]/g, "") : "evening"}
                    />
                  </motion.div>
                )}

                {step === Steps.VIBE && (
                  <motion.div
                    key="vibe"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    <VibeSelector
                      onNext={(vibe) => {
                        setSelectedFood(vibe);
                        nextStep();
                      }}
                      initialVibeId={selectedFood?.id || ""}
                    />
                  </motion.div>
                )}

                {step === Steps.FRIENDSHIP && (
                  <motion.div
                    key="friendship"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    <FriendshipQuestion
                      onNext={(ans) => {
                        setFriendshipAns(ans);
                        nextStep();
                      }}
                    />
                  </motion.div>
                )}

                {step === Steps.FAKE_PAYMENT && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    <FakePaymentScreen onNext={nextStep} />
                  </motion.div>
                )}

                {step === Steps.FINAL && (
                  <motion.div
                    key="final"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex justify-center"
                  >
                    <FinalScreen
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      selectedFoodEmoji={selectedFood?.emoji || "🍕"}
                      selectedFoodName={selectedFood?.name || "TBD"}
                      friendshipAns={friendshipAns}
                      onReset={resetSurprise}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>

          {/* Footer Area */}
          <footer className="w-full py-4 text-center text-xs text-slate-400 font-medium select-none z-10 shrink-0">
            Made with 💖 by {CONFIG.myName}
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
