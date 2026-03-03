import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const FloatingParticles = () => {
  const prefersReduced = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: prefersReduced ? 6 : 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 6,
        type: i % 3,
      })),
    [prefersReduced]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.type === 0
                ? "hsl(var(--primary) / 0.15)"
                : p.type === 1
                ? "hsl(var(--accent) / 0.12)"
                : "hsl(var(--highlight) / 0.1)",
          }}
          animate={
            prefersReduced
              ? { opacity: [0.2, 0.5, 0.2] }
              : {
                  y: [0, -50, 0],
                  x: [0, p.type === 0 ? 15 : -15, 0],
                  opacity: [0, 0.5, 0],
                }
          }
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
