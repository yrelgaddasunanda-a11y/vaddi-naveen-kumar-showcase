import { motion, forwardRef } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

type AnimationStyle = "rotate" | "wave" | "scatter" | "flip" | "glitch";

const ANIMATION_STYLES: AnimationStyle[] = ["rotate", "wave", "scatter", "flip", "glitch"];

const STYLE_LABELS: Record<AnimationStyle, string> = {
  rotate: "Spin",
  wave: "Wave",
  scatter: "Scatter",
  flip: "Flip",
  glitch: "Glitch",
};

const getVisitAnimationStyle = (): AnimationStyle => {
  const visits = parseInt(localStorage.getItem("vnk-visit-count") || "0", 10);
  localStorage.setItem("vnk-visit-count", String(visits + 1));
  return ANIMATION_STYLES[visits % ANIMATION_STYLES.length];
};

const getHoverAnimation = (style: AnimationStyle, index: number) => {
  switch (style) {
    case "rotate":
      return { rotate: [15, -15, 25, -25, 10][index % 5], scale: 1.4, y: -10 };
    case "wave":
      return { y: -30 - (index % 3) * 10, scale: 1.2, rotate: 0 };
    case "scatter":
      return {
        x: (index % 2 === 0 ? 1 : -1) * (10 + (index % 4) * 5),
        y: -(15 + (index % 3) * 10),
        rotate: (index % 2 === 0 ? 1 : -1) * 20,
        scale: 1.3,
      };
    case "flip":
      return { rotateX: 180, scale: 1.2, y: -5 };
    case "glitch":
      return { x: [0, -3, 3, -1, 0], y: [0, 2, -2, 1, 0], scale: 1.3, skewX: 5 };
  }
};

const InteractiveLetters = forwardRef<HTMLDivElement>((_, ref) => {
  const name = "VADDI NAVEEN KUMAR";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animStyle, setAnimStyle] = useState<AnimationStyle>("rotate");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setAnimStyle(getVisitAnimationStyle());
    const check = () => setIsMobile(window.innerWidth < 640 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleInteraction = useCallback((index: number) => {
    if (isMobile) {
      setHoveredIndex((prev) => (prev === index ? null : index));
    } else {
      setHoveredIndex(index);
    }
  }, [isMobile]);

  const letters = name.split("");

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-[2px] xs:gap-1 sm:gap-2 select-none max-w-4xl mx-auto px-2">
      {letters.map((letter, index) => {
        if (letter === " ") {
          return <span key={index} className="w-2 xs:w-3 sm:w-5" />;
        }

        const isHovered = hoveredIndex === index;
        const colorClass =
          index % 3 === 0
            ? "hsl(var(--primary))"
            : index % 3 === 1
            ? "hsl(var(--accent))"
            : "hsl(var(--highlight))";

        return (
          <motion.span
            key={index}
            className="font-display text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold cursor-pointer inline-block touch-manipulation"
            style={{ color: "hsl(var(--muted-foreground))" }}
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            onTouchStart={() => handleInteraction(index)}
            animate={
              isHovered
                ? { ...getHoverAnimation(animStyle, index), color: colorClass }
                : {
                    rotate: 0,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotateX: 0,
                    skewX: 0,
                    color: "hsl(var(--muted-foreground))",
                  }
            }
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.025, duration: 0.4 },
            }}
            viewport={{ once: true }}
          >
            {letter}
          </motion.span>
        );
      })}

      {/* Style indicator */}
      <motion.div
        className="w-full flex items-center justify-center gap-2 mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.6 } }}
        viewport={{ once: true }}
      >
        {ANIMATION_STYLES.map((s) => (
          <span
            key={s}
            className={`font-mono-code text-[8px] sm:text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border transition-all duration-300 ${
              s === animStyle
                ? "border-primary/40 text-primary bg-primary/5"
                : "border-transparent text-muted-foreground/25"
            }`}
          >
            {STYLE_LABELS[s]}
          </span>
        ))}
      </motion.div>
    </div>
  );
});

InteractiveLetters.displayName = "InteractiveLetters";

export default InteractiveLetters;
