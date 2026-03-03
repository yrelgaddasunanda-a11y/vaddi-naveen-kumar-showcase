import { motion } from "framer-motion";

const ProgressBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] sm:h-[3px] bg-border/30 overflow-hidden">
      <motion.div
        className="h-full animated-border rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: "35%" }}
        transition={{ delay: 0.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};

export default ProgressBar;
