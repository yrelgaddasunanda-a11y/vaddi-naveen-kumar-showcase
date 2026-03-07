import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMemo, useEffect, useRef } from "react";

const FloatingParticles = () => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });
  const isMobile = useRef("ontouchstart" in globalThis);

  useEffect(() => {
    if (isMobile.current) return;
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const particles = useMemo(
    () =>
      Array.from({ length: isMobile.current ? 8 : 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        duration: Math.random() * 14 + 8,
        delay: Math.random() * 5,
        type: i % 4,
        mouseInfluence: 10 + Math.random() * 25,
      })),
    []
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
            x: isMobile.current ? 0 : smoothX.get() * p.mouseInfluence - p.mouseInfluence / 2,
            y: isMobile.current ? 0 : smoothY.get() * p.mouseInfluence - p.mouseInfluence / 2,
            background:
              p.type === 0
                ? "hsl(var(--primary) / 0.18)"
                : p.type === 1
                ? "hsl(var(--accent) / 0.14)"
                : p.type === 2
                ? "hsl(var(--highlight) / 0.12)"
                : "hsl(var(--foreground) / 0.06)",
            boxShadow:
              p.type < 2
                ? `0 0 ${p.size * 3}px ${p.size}px ${
                    p.type === 0
                      ? "hsl(var(--primary) / 0.08)"
                      : "hsl(var(--accent) / 0.06)"
                  }`
                : "none",
          }}
          animate={{
            y: [0, -(30 + p.type * 15), 0],
            x: [0, p.type % 2 === 0 ? 20 : -20, 0],
            opacity: [0, 0.7, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Connecting lines effect - desktop only */}
      {!isMobile.current && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent"
              style={{
                top: `${25 + i * 25}%`,
                left: 0,
                right: 0,
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scaleX: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default FloatingParticles;
