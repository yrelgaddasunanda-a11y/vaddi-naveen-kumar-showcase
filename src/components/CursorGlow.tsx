import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    // Only show on non-touch devices
    if ("ontouchstart" in window) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [mouseX, mouseY, visible]);

  if ("ontouchstart" in globalThis) return null;

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
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
};

export default CursorGlow;
