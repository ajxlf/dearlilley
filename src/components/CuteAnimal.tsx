import { motion } from "framer-motion";

const CuteAnimal = () => {
  return (
    <motion.svg
      className="w-52 h-40 md:w-64 md:h-48 mx-auto drop-shadow-xl"
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "backOut" }}
    >
      <defs>
        <linearGradient id="fur" x1="0" x2="1">
          <stop offset="0" stopColor="#fcd5b8" />
          <stop offset="1" stopColor="#f5b88a" />
        </linearGradient>
        <linearGradient id="heart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff4d7d" />
          <stop offset="1" stopColor="#e91e63" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Floating heart with glow */}
      <motion.path
        d="M250 50 C250 33 270 25 282 38
           C294 25 314 33 314 50
           C314 78 282 92 282 106
           C282 92 250 78 250 50Z"
        fill="url(#heart)"
        filter="url(#glow)"
        animate={{ 
          scale: [1, 1.1, 1],
          y: [0, -5, 0]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "282px 70px" }}
      />

      {/* Body */}
      <path
        d="M90 120 C90 70 140 40 190 60
           C240 40 290 70 290 120
           C290 180 240 210 190 210
           C140 210 90 180 90 120Z"
        fill="url(#fur)"
      />

      {/* Ears */}
      <path d="M110 92 L95 55 L140 78 Z" fill="#f5b88a" />
      <path d="M270 92 L285 55 L240 78 Z" fill="#f5b88a" />
      <path d="M115 85 L105 60 L135 80 Z" fill="#ffb6c1" />
      <path d="M265 85 L275 60 L245 80 Z" fill="#ffb6c1" />

      {/* Eyes */}
      <circle cx="155" cy="125" r="10" fill="#333" />
      <circle cx="225" cy="125" r="10" fill="#333" />
      <circle cx="157" cy="122" r="3" fill="#fff" />
      <circle cx="227" cy="122" r="3" fill="#fff" />

      {/* Blush */}
      <ellipse cx="135" cy="145" rx="15" ry="8" fill="#ffb6c1" opacity="0.6" />
      <ellipse cx="245" cy="145" rx="15" ry="8" fill="#ffb6c1" opacity="0.6" />

      {/* Nose */}
      <path
        d="M190 144 C186 144 182 148 182 152
           C182 160 190 164 190 170
           C190 164 198 160 198 152
           C198 148 194 144 190 144Z"
        fill="#ff7aa2"
      />

      {/* Mouth */}
      <path
        d="M175 165 Q190 180 205 165"
        stroke="#333"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Whiskers */}
      <line x1="120" y1="150" x2="90" y2="145" stroke="#333" strokeWidth="1.5" opacity="0.3" />
      <line x1="120" y1="158" x2="90" y2="160" stroke="#333" strokeWidth="1.5" opacity="0.3" />
      <line x1="260" y1="150" x2="290" y2="145" stroke="#333" strokeWidth="1.5" opacity="0.3" />
      <line x1="260" y1="158" x2="290" y2="160" stroke="#333" strokeWidth="1.5" opacity="0.3" />
    </motion.svg>
  );
};

export default CuteAnimal;
