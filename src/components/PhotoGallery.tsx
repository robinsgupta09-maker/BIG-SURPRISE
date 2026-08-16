import React from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../config";

export const PhotoGallery: React.FC = () => {
  return (
    <div className="w-full mt-10">
      <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-800 text-center mb-8 relative inline-block">
        {CONFIG.gallery.title}
        <span className="absolute bottom-[-6px] left-0 right-0 h-1 bg-rose-200 rounded-full"></span>
      </h2>

      {/* Grid of Polaroids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
        {CONFIG.gallery.photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -5 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0, 
              zIndex: 30,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
            className={`bg-white p-4 pb-6 shadow-md border border-slate-100 rounded-sm relative transform cursor-pointer ${photo.rotation} transition-shadow duration-300`}
          >
            {/* Cute Tape/Pin effect */}
            <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-5 bg-amber-100/60 opacity-80 backdrop-blur-xxs rotate-[-2deg] shadow-xxs border-l border-r border-amber-200/30"></div>
            
            {/* Polaroid Image Box */}
            <div className="w-full aspect-square bg-slate-50 overflow-hidden border border-slate-100 mb-4 flex items-center justify-center">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400";
                }}
              />
            </div>

            {/* Captions in Handwriting look */}
            <p className="font-serif italic text-sm text-slate-700 text-center font-medium leading-tight">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
