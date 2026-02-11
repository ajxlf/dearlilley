import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import CuteAnimal from "./CuteAnimal";
import PhotoSlideshow from "./PhotoSlideshow";
const ValentineCard = () => {
  const [accepted, setAccepted] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0
  });
  const zoneRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: {
          x: 0,
          y: 0.7
        },
        colors: ['#ff4d7d', '#ff8fab', '#ffc2d1', '#ffe5ec', '#ffb6c1']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: {
          x: 1,
          y: 0.7
        },
        colors: ['#ff4d7d', '#ff8fab', '#ffc2d1', '#ffe5ec', '#ffb6c1']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: {
          x: 0.5,
          y: 0.5
        },
        colors: ['#ff4d7d', '#ff8fab', '#ffc2d1', '#ffe5ec', '#ffb6c1', '#e91e63']
      });
    }, 300);
  }, []);
  const handleYesClick = () => {
    setAccepted(true);
    fireConfetti();
  };
  const moveNoButton = useCallback((clientX: number, clientY: number) => {
    if (!zoneRef.current || !noRef.current) return;
    const zone = zoneRef.current.getBoundingClientRect();
    const btn = noRef.current.getBoundingClientRect();
    const centerX = btn.left + btn.width / 2;
    const centerY = btn.top + btn.height / 2;
    let dx = centerX - clientX;
    let dy = centerY - clientY;
    const mag = Math.hypot(dx, dy) || 1;
    dx /= mag;
    dy /= mag;
    const moveDistance = 120;
    let newX = noPosition.x + dx * moveDistance;
    let newY = noPosition.y + dy * moveDistance;

    // Clamp to zone boundaries
    const maxX = (zone.width - btn.width) / 2;
    const maxY = (zone.height - btn.height) / 2;
    newX = Math.max(-maxX, Math.min(maxX, newX));
    newY = Math.max(-maxY, Math.min(maxY, newY));
    setNoPosition({
      x: newX,
      y: newY
    });
    setYesScale(prev => Math.min(2, prev + 0.08));
  }, [noPosition]);
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!noRef.current) return;
    const btn = noRef.current.getBoundingClientRect();
    const distance = Math.hypot(btn.left + btn.width / 2 - e.clientX, btn.top + btn.height / 2 - e.clientY);
    if (distance < 120) {
      moveNoButton(e.clientX, e.clientY);
    }
  }, [moveNoButton]);
  return <motion.div className="glass-card w-full max-w-lg mx-4 p-8 md:p-10 rounded-3xl text-center relative z-10" initial={{
    y: 40,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.8,
    ease: "easeOut"
  }}>
      <CuteAnimal />

      <motion.h1 className="font-romantic text-3xl md:text-4xl lg:text-5xl text-gradient mt-6 mb-2 pb-2 leading-relaxed py-[20px]" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3,
      duration: 0.6
    }}>
        Lyana Nycole Lilley
      </motion.h1>

      {/* Photo Slideshow */}
      <motion.div initial={{
      opacity: 0,
      scale: 0.9
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      delay: 0.4,
      duration: 0.5
    }}>
        <PhotoSlideshow />
      </motion.div>
      
      <motion.p className="text-lg md:text-xl text-foreground/80 font-medium mb-8" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.5
    }}>
        Will you be my Valentine? 💕
      </motion.p>

      <AnimatePresence mode="wait">
        {!accepted ? <motion.div key="buttons" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0,
        scale: 0.9
      }} transition={{
        delay: 0.6
      }}>
            <div ref={zoneRef} className="relative h-32 md:h-36 flex items-center justify-center gap-8 touch-none" onPointerMove={handlePointerMove}>
              <motion.button onClick={handleYesClick} className="px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-full glow-primary hover:brightness-110 transition-all" animate={{
            scale: yesScale
          }} whileHover={{
            scale: yesScale * 1.05
          }} whileTap={{
            scale: yesScale * 0.98
          }}>
                Yes! 💖
              </motion.button>

              <motion.button ref={noRef} className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-full transition-colors hover:bg-secondary/80" animate={{
            x: noPosition.x,
            y: noPosition.y
          }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }} onClick={e => e.preventDefault()}>
                No
              </motion.button>
            </div>

            <motion.p className="text-sm text-muted-foreground mt-2" initial={{
          opacity: 0
        }} animate={{
          opacity: 0.7
        }} transition={{
          delay: 0.8
        }}>
              "No" seems a bit shy 😈
            </motion.p>
          </motion.div> : <motion.div key="result" className="py-6" initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        type: "spring",
        stiffness: 200,
        damping: 15
      }}>
            <motion.h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4" animate={{
          scale: [1, 1.1, 1]
        }} transition={{
          duration: 0.5
        }}>
              YAY! 🎉
            </motion.h2>
            
            <motion.div className="bg-secondary/50 rounded-2xl p-6 mx-2 mb-6 border border-primary/20" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }}>
              <motion.p className="text-lg md:text-xl text-foreground/90 font-medium italic leading-relaxed" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.6
          }}>
                Every moment with you feels like a dream come true. You make my heart skip a beat and my days brighter. I'm so lucky to have you in my life. 
              </motion.p>
              <motion.p className="text-right text-primary font-romantic text-xl mt-4" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.8
          }}>
                Forever yours,
AJ❤️
              </motion.p>
            </motion.div>

            <motion.p className="text-xl text-foreground/80 mb-4" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 1
        }}>
              I knew you'd say yes ;) Now call me on Discord and let's enjoy our valentines x
            </motion.p>
            <motion.div className="text-6xl animate-heart-beat inline-block" initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 1.2,
          type: "spring"
        }}>
              💕
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
};
export default ValentineCard;
