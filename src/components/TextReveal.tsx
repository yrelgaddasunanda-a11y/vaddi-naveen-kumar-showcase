import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

const TextReveal = ({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.04,
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap justify-center gap-x-[0.3em] ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -80 }}
            animate={
              isInView
                ? { y: "0%", rotateX: 0 }
                : { y: "110%", rotateX: -80 }
            }
            transition={{
              delay: delay + wi * staggerChildren,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
