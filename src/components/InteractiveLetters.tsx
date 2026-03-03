import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type AnimationStyle = "rotate" | "wave" | "scatter" | "flip" | "glitch";

const ANIMATION_STYLES: AnimationStyle[] = ["rotate", "wave", "scatter", "flip", "glitch"];

const getVisitAnimationStyle = (): AnimationStyle => {
  const visits = parseInt(localStorage.getItem("vnk-visit-count") || "0", 10);
  localStorage.setItem("vnk-visit-count", String(visits + 1));
  return ANIMATION_STYLES[visits % ANIMATION_STYLES.length];
};

const getHoverAnimation = (style: AnimationStyle, index: number) => {
  switch (style) {
    case "rotate":
      return {
        rotate: [15, -15, 25, -25, 10][index % 5],
        scale: 1.4,
        y: -10,
      };
    case "wave":
      return {
        y: -30 - (index % 3) * 10,
        scale: 1.2,
        rotate: 0,
      };
    case "scatter":
      return {
        x: (index % 2 === 0 ? 1 : -1) * (10 + (index % 4) * 5),
        y: -(15 + (index % 3) * 10),
        rotate: (index % 2 === 0 ? 1 : -1) * 20,
        scale: 1.3,
      };
    case "flip":
      return {
        rotateX: 180,
        scale: 1.2,
        y: -5,
      };
    case "glitch":
      return {
        x: [0, -3, 3, -1, 0],
        y: [0, 2, -2, 1, 0],
        scale: 1.3,
        skewX: 5,
      };
  }
};

const InteractiveLetters = () => {
  const name = "VADDI NAVEEN KUMAR";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animStyle, setAnimStyle] = useState<AnimationStyle>("rotate");

  useEffect(() => {
    setAnimStyle(getVisitAnimationStyle());
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-1 sm:gap-2 select-none">
      {name.split("").map((letter, index) => {
        if (letter === " ") {
          return <span key={index} className="w-3 sm:w-5" />;
        }

        const isHovered = hoveredIndex === index;

        return (
          <motion.span
            key={index}
            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold cursor-pointer inline-block"
            style={{ color: "hsl(var(--muted-foreground))" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={
              isHovered
                ? {
                    ...getHoverAnimation(animStyle, index),
                    color: index % 3 === 0
                      ? "hsl(var(--primary))"
                      : index % 3 === 1
                      ? "hsl(var(--accent))"
                      : "hsl(var(--highlight))",
                  }
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
              transition: { delay: index * 0.03, duration: 0.5 },
            }}
            viewport={{ once: true }}
          >
            {letter}
          </motion.span>
        );
      })}
      <motion.p
        className="w-full text-center mt-3 font-mono-code text-[10px] text-muted-foreground/50 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.8 } }}
        viewport={{ once: true }}
      >
        Animation style: {animStyle}
      </motion.p>
    </div>
  );
};

export default InteractiveLetters;
