import React from "react";
import { Heart } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex items-center justify-center space-x-1.5 md:space-x-3 my-6 select-none">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <React.Fragment key={index}>
            {/* Heart node */}
            <div className="relative flex items-center justify-center">
              <Heart
                className={`w-5 h-5 transition-all duration-500 ${
                  isCompleted
                    ? "fill-rose-400 text-rose-400 scale-100"
                    : isActive
                    ? "fill-rose-300/40 text-rose-400 scale-120 animate-pulse"
                    : "text-slate-300 scale-95"
                }`}
              />
              {isActive && (
                <span className="absolute w-5 h-5 rounded-full bg-rose-400/20 animate-ping pointer-events-none"></span>
              )}
            </div>

            {/* Connecting line (don't draw after the last heart) */}
            {index < totalSteps - 1 && (
              <div
                className={`h-0.5 w-6 md:w-10 rounded-full transition-all duration-700 ${
                  isCompleted ? "bg-rose-300" : "bg-slate-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
