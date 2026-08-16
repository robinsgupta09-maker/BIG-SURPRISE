import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { CONFIG } from "../config";

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(CONFIG.music.url);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      // Clean up when unmounting
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Playback prevented or failed:", err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-md glass-card transition-all duration-300 transform active:scale-95 cursor-pointer ${
        isPlaying ? "text-rose-500 scale-105 border-rose-200" : "text-slate-400"
      }`}
      aria-label="Toggle background music"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  );
};
