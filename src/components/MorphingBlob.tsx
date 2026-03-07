import { motion } from "framer-motion";

interface MorphingBlobProps {
  className?: string;
  color?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

const blobPaths = [
  "M45.4,-51.2C58.2,-41.8,67.4,-26.4,71.2,-9.3C75,7.9,73.3,26.7,63.2,39.3C53.2,51.9,34.7,58.3,16.2,62.2C-2.3,66.1,-20.8,67.5,-36.4,60.6C-52,53.7,-64.6,38.5,-70.2,21C-75.7,3.4,-74.1,-16.5,-65.1,-31.8C-56.1,-47.1,-39.7,-57.7,-23.2,-65.2C-6.7,-72.7,9.9,-77,24.2,-71.5C38.5,-66,32.6,-60.6,45.4,-51.2Z",
  "M39.9,-46.5C51.2,-37.7,59.3,-24.5,63.1,-9.5C66.8,5.5,66.2,22.3,58.2,34.8C50.2,47.3,34.9,55.5,18.5,60.1C2.2,64.7,-15.1,65.7,-30.2,59.6C-45.3,53.6,-58.2,40.4,-65.3,24.7C-72.4,9,-73.7,-9.2,-67.5,-24.1C-61.3,-39,-47.5,-50.5,-33.2,-58.5C-18.9,-66.5,-4,-71,7.6,-68.8C19.2,-66.6,28.7,-55.3,39.9,-46.5Z",
  "M44.2,-52C56.8,-42.3,66,-27.5,69.7,-11.1C73.5,5.3,71.7,23.3,62.5,36.5C53.3,49.7,36.6,58.1,19.2,62.4C1.8,66.7,-16.4,67,-31.9,60.1C-47.5,53.3,-60.4,39.3,-67.1,22.8C-73.8,6.3,-74.2,-12.7,-66.9,-28C-59.6,-43.3,-44.6,-55,-29.6,-63.6C-14.6,-72.2,0.4,-77.9,14.4,-74.5C28.3,-71.1,31.6,-61.7,44.2,-52Z",
];

const MorphingBlob = ({
  className = "",
  color = "hsl(var(--primary) / 0.08)",
  size = 400,
  duration = 12,
  delay = 0,
}: MorphingBlobProps) => {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1.5 }}
    >
      <svg
        viewBox="-100 -100 200 200"
        className="w-full h-full"
        style={{ filter: "blur(40px)" }}
      >
        <motion.path
          fill={color}
          animate={{
            d: blobPaths,
          }}
          transition={{
            d: {
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          transform="translate(0,0)"
        />
      </svg>
    </motion.div>
  );
};

export default MorphingBlob;
