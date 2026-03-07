import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

// Floating geometric shapes for the intro
const FloatingShape = ({ delay, x, y, size, type, duration }: {
  delay: number; x: string; y: string; size: number; type: number; duration: number;
}) => {
  const shapeStyle = type === 0
    ? "rounded-full border border-primary/20"
    : type === 1
    ? "border border-accent/15 rotate-45"
    : "rounded-full bg-highlight/8";

  return (
    <motion.div
      className={`absolute ${shapeStyle}`}
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0.6, 0],
        scale: [0, 1, 1.2, 0.9, 0],
        y: [0, -30, -60, -40, -80],
        x: [0, type === 0 ? 15 : -15, type === 1 ? -10 : 20, 5, 0],
        rotate: [0, type === 2 ? 180 : 90, type === 0 ? -45 : 270, 360],
      }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

// Orbiting particles around the monogram
const OrbitParticle = ({ index, total }: { index: number; total: number }) => {
  const angle = (index / total) * 360;
  const radius = 120;

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/40"
      style={{
        left: "50%",
        top: "50%",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.4, 0.8, 0],
        scale: [0, 1.5, 1, 1.5, 0],
        x: [
          0,
          Math.cos((angle * Math.PI) / 180) * radius,
          Math.cos(((angle + 120) * Math.PI) / 180) * (radius + 20),
          Math.cos(((angle + 240) * Math.PI) / 180) * radius,
          0,
        ],
        y: [
          0,
          Math.sin((angle * Math.PI) / 180) * radius,
          Math.sin(((angle + 120) * Math.PI) / 180) * (radius + 20),
          Math.sin(((angle + 240) * Math.PI) / 180) * radius,
          0,
        ],
      }}
      transition={{
        duration: 2.8,
        delay: 0.3 + index * 0.06,
        ease: "easeInOut",
      }}
    />
  );
};

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "expand" | "done">("logo");
  const name = "VNK";
  const fullName = "VADDI NAVEEN KUMAR";

  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: `${8 + Math.random() * 84}%`,
        y: `${8 + Math.random() * 84}%`,
        size: 6 + Math.random() * 18,
        type: i % 3,
        delay: Math.random() * 1.2,
        duration: 2 + Math.random() * 1.5,
      })),
    []
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("expand"), 2000);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--primary) / 0.06), transparent), radial-gradient(ellipse 60% 80% at 30% 70%, hsl(var(--accent) / 0.04), transparent), radial-gradient(ellipse 50% 50% at 70% 30%, hsl(var(--highlight) / 0.03), transparent)",
            }}
          />

          {/* Moving grid lines */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Floating geometric shapes */}
          {floatingShapes.map((s) => (
            <FloatingShape key={s.id} {...s} />
          ))}

          {/* Central radial pulses */}
          {[0, 0.4, 0.8].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/10"
              style={{ width: 200 + i * 80, height: 200 + i * 80 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 2],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                delay: 0.2 + delay,
                duration: 2,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Orbiting particles */}
          <div className="relative">
            {Array.from({ length: 12 }).map((_, i) => (
              <OrbitParticle key={i} index={i} total={12} />
            ))}
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center">
            {/* Glow behind monogram */}
            <motion.div
              className="absolute -inset-20 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, hsl(var(--accent) / 0.06) 40%, transparent 70%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.8, 1.4],
                opacity: [0, 1, 0.7],
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Rotating ring */}
            <motion.div
              className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-dashed border-primary/15"
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                scale: 1,
                rotate: 360,
                opacity: [0, 0.5, 0.3],
              }}
              transition={{
                scale: { delay: 0.2, duration: 0.8, ease: "easeOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                opacity: { delay: 0.2, duration: 1 },
              }}
            />

            {/* Second counter-rotating ring */}
            <motion.div
              className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-dotted border-accent/10"
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                scale: 1,
                rotate: -360,
                opacity: [0, 0.3, 0.15],
              }}
              transition={{
                scale: { delay: 0.4, duration: 0.8, ease: "easeOut" },
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                opacity: { delay: 0.4, duration: 1 },
              }}
            />

            {/* Monogram letters */}
            <div className="flex items-center gap-1 sm:gap-2">
              {name.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--foreground)))"
                        : i === 1
                        ? "linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--accent)))"
                        : "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--highlight)))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  initial={{ opacity: 0, y: 60, rotateX: -90, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.3 + i * 0.15,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Animated dot separator */}
            <div className="flex items-center gap-1.5 mt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`rounded-full ${
                    i === 1 ? "w-2 h-2 bg-primary" : "w-1 h-1 bg-muted-foreground/40"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                />
              ))}
            </div>

            {/* Full name reveal */}
            <motion.div
              className="overflow-hidden mt-4"
              initial={{ height: 0, opacity: 0 }}
              animate={
                phase === "expand"
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-center gap-[3px]">
                {fullName.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className={`font-mono-code text-[10px] sm:text-xs tracking-[0.25em] uppercase ${
                      char === " " ? "w-2" : "text-muted-foreground"
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={
                      phase === "expand"
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 8 }
                    }
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-6 h-[2px] rounded-full overflow-hidden bg-border/30"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 140, opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <motion.div
                className="h-full rounded-full animated-border"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>

            {/* Status text */}
            <motion.span
              className="font-mono-code text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              Initializing
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              >
                ...
              </motion.span>
            </motion.span>
          </div>

          {/* Corner accents with lines */}
          <motion.div
            className="absolute top-6 left-6 sm:top-10 sm:left-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="w-10 h-10 border-l-2 border-t-2 border-primary/20" />
            <motion.div
              className="absolute top-0 left-0 w-0 h-[2px] bg-primary/30"
              animate={{ width: 40 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="w-10 h-10 border-r-2 border-b-2 border-accent/20" />
            <motion.div
              className="absolute bottom-0 right-0 w-0 h-[2px] bg-accent/30"
              animate={{ width: 40 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
          </motion.div>

          {/* Floating horizontal scan lines */}
          {[25, 50, 75].map((top, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent"
              style={{ top: `${top}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.5, 0] }}
              transition={{ delay: 0.5 + i * 0.3, duration: 2, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
