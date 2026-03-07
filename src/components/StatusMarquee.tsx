import { motion } from "framer-motion";

const items = [
  "UNDER DEVELOPMENT",
  "✦",
  "COMING SOON",
  "✦",
  "STAY TUNED",
  "✦",
  "SOMETHING BIG",
  "✦",
];

const StatusMarquee = () => {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative z-10 overflow-hidden border-y border-border/50 py-2 sm:py-3">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex whitespace-nowrap gap-6 sm:gap-8"
        animate={{ x: [0, -50 * items.length] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {repeatedItems.map((item, i) => (
          <span
            key={i}
            className="font-mono-code text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground/30 shrink-0"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default StatusMarquee;
