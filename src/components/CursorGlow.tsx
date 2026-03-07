import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CursorGlow = () => {
  const [isMobile] = useState(() => "ontouchstart" in globalThis);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const visibleRef = useRef(false);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const opacity = useMotionValue(0);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        opacity.set(1);
      }
    };

    const handleLeave = () => {
      visibleRef.current = false;
      opacity.set(0);
    };
    const handleEnter = () => {
      visibleRef.current = true;
      opacity.set(1);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [isMobile, mouseX, mouseY, opacity]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[1] mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, hsl(var(--accent) / 0.03) 40%, transparent 70%)",
        opacity,
      }}
    />
  );
};

export default CursorGlow;
