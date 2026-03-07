import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "expand" | "done">("logo");
  const name = "VNK";
  const fullName = "VADDI NAVEEN KUMAR";

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("expand"), 1800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 1.5], opacity: [0, 0.8, 0.4] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Horizontal lines */}
          <motion.div
            className="absolute h-px w-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ top: "calc(50% - 40px)" }}
          />
          <motion.div
            className="absolute h-px w-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ top: "calc(50% + 40px)" }}
          />

          <div className="relative flex flex-col items-center">
            {/* Monogram letters */}
            <div className="flex items-center gap-1">
              {name.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold text-foreground"
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }}
                  transition={{
                    delay: 0.2 + i * 0.12,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Dot separator */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary mt-4"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />

            {/* Full name reveal */}
            <motion.div
              className="overflow-hidden mt-3"
              initial={{ height: 0, opacity: 0 }}
              animate={
                phase === "expand"
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-[3px]">
                {fullName.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className={`font-mono-code text-[10px] sm:text-xs tracking-[0.25em] uppercase ${
                      char === " " ? "w-2" : "text-muted-foreground"
                    }`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={
                      phase === "expand"
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 5 }
                    }
                    transition={{
                      delay: i * 0.02,
                      duration: 0.3,
                    }}
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
              animate={{ width: 120, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <motion.div
                className="h-full rounded-full animated-border"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-6 left-6 sm:top-10 sm:left-10 w-8 h-8 border-l-2 border-t-2 border-primary/20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-8 h-8 border-r-2 border-b-2 border-accent/20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
