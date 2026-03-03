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
