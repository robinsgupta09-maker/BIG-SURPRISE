import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number; // percentage width
  y: number; // percentage height
  size: number; // size in px
  emoji: string;
  duration: number; // animation duration in s
  delay: number; // start delay in s
}

// Restricted to subtle hearts and sparkles
const PARTICLE_EMOJIS = ["❤️", "💖", "✨", "⭐", "💕"];

export const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate exactly 8 subtle ambient particles (approx 4-5 hearts and 3-4 sparkles)
    const initialParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 10, // 10px to 22px (smaller to be less distracting)
      emoji: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)],
      duration: Math.random() * 20 + 20, // 20s to 40s (slow, subtle movement)
      delay: Math.random() * -15, // start at offset keyframes
    }));

    setParticles(initialParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute opacity-18 select-none transition-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            animation: `float-up ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(105vh) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.18;
          }
          90% {
            opacity: 0.18;
          }
          100% {
            transform: translateY(-10vh) rotate(180deg) translateX(15px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
