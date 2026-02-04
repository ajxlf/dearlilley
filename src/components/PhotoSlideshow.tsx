import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import couple1 from "@/assets/couple-1.jpeg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpeg";

const photos = [couple1, couple2, couple3];

const FloatingMiniHearts = () => {
  const hearts = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: ["💕", "💗", "💖", "❤️", "💓"][Math.floor(Math.random() * 5)],
      size: 12 + Math.random() * 10,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 3,
      xOffset: -20 + Math.random() * 40,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute"
          style={{
            fontSize: heart.size,
            left: `${heart.left}%`,
            bottom: "-10%",
          }}
          animate={{
            y: [0, -280],
            x: [0, heart.xOffset, -heart.xOffset, 0],
            opacity: [0, 1, 1, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {heart.emoji}
        </motion.span>
      ))}
    </div>
  );
};

const PhotoSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-56 h-52 md:w-64 md:h-60 mx-auto my-6">
      {/* Floating mini hearts */}
      <FloatingMiniHearts />
      {/* Heart-shaped glow background */}
      <div 
        className="absolute inset-0 bg-primary/20 blur-xl"
        style={{
          clipPath: "path('M 50 90 C 20 60, 0 30, 25 15 C 40 5, 50 15, 50 25 C 50 15, 60 5, 75 15 C 100 30, 80 60, 50 90 Z')",
        }}
      />
      
      {/* Heart-shaped frame border */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          filter: "drop-shadow(0 4px 20px hsl(340 82% 52% / 0.4))",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full absolute">
          <defs>
            <clipPath id="heartClip">
              <path d="M 50 88 C 20 60, 0 35, 25 18 C 38 10, 50 18, 50 28 C 50 18, 62 10, 75 18 C 100 35, 80 60, 50 88 Z" />
            </clipPath>
          </defs>
          {/* Heart border */}
          <path 
            d="M 50 88 C 20 60, 0 35, 25 18 C 38 10, 50 18, 50 28 C 50 18, 62 10, 75 18 C 100 35, 80 60, 50 88 Z" 
            fill="none" 
            stroke="hsl(340 82% 52% / 0.5)" 
            strokeWidth="3"
            className="animate-pulse-heart"
          />
        </svg>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-2 overflow-hidden"
          style={{
            clipPath: "path('M 112 198 C 44.8 135, 0 78.75, 56.25 40.5 C 85.5 22.5, 112 40.5, 112 63 C 112 40.5, 139.5 22.5, 168.75 40.5 C 225 78.75, 180 135, 112 198 Z')",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img
            src={photos[currentIndex]}
            alt="Us together"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? "bg-primary w-4" 
                : "bg-primary/40 hover:bg-primary/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoSlideshow;
