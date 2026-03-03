import { motion } from "framer-motion";
import { useState } from "react";

const InteractiveLetters = () => {
  const name = "VADDI NAVEEN KUMAR";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getRandomTransform = () => {
    const rotations = [15, -15, 25, -25, 10, -10, 30, -30];
    const scales = [1.3, 1.5, 1.2, 1.4];
    return {
      rotate: rotations[Math.floor(Math.random() * rotations.length)],
      scale: scales[Math.floor(Math.random() * scales.length)],
    };
  };

  return (
    <div className="flex flex-wrap justify-center gap-1 sm:gap-2 select-none">
      {name.split("").map((letter, index) => {
        const transform = getRandomTransform();
        const isSpace = letter === " ";

        if (isSpace) {
          return <span key={index} className="w-3 sm:w-5" />;
        }

        return (
          <motion.span
            key={index}
            className="font-mono-code text-2xl sm:text-4xl md:text-5xl font-bold cursor-pointer inline-block"
            style={{ color: "hsl(var(--muted-foreground))" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={
              hoveredIndex === index
                ? {
                    rotate: transform.rotate,
                    scale: transform.scale,
                    color: index % 2 === 0 
                      ? "hsl(160, 100%, 50%)" 
                      : "hsl(280, 80%, 65%)",
                    textShadow:
                      index % 2 === 0
                        ? "0 0 25px hsl(160 100% 50% / 0.6)"
                        : "0 0 25px hsl(280 80% 65% / 0.6)",
                  }
                : {
                    rotate: 0,
                    scale: 1,
                    color: "hsl(240, 5%, 55%)",
                    textShadow: "0 0 0px transparent",
                  }
            }
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
            viewport={{ once: true }}
          >
            {letter}
          </motion.span>
        );
      })}
    </div>
  );
};

export default InteractiveLetters;
