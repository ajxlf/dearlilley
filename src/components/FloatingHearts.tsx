import { motion } from "framer-motion";

const hearts = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 20 + 12,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 15,
  opacity: Math.random() * 0.3 + 0.1,
}));

const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-medium"
          style={{
            left: `${heart.left}%`,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          initial={{ y: "100vh", rotate: 0 }}
          animate={{
            y: "-100vh",
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            y: {
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            },
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
