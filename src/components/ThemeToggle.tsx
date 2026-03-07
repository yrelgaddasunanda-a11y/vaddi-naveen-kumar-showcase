import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [showHint, setShowHint] = useState(false);

  // Keyboard shortcut: Ctrl/Cmd + D to toggle theme
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleTheme]);

  // Show hint on first visit
  useEffect(() => {
    const seen = localStorage.getItem("vnk-theme-hint-seen");
    if (!seen) {
      const timer = setTimeout(() => setShowHint(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissHint = () => {
    setShowHint(false);
    localStorage.setItem("vnk-theme-hint-seen", "true");
  };

  const handleToggle = () => {
    toggleTheme();
    dismissHint();
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleToggle}
        className="relative w-10 h-10 rounded-full border border-border backdrop-blur-sm bg-card/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title="Toggle theme (Ctrl+D)"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </motion.button>

      {/* First-visit hint tooltip */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-full right-0 mt-3 z-50"
          >
            <div className="relative backdrop-blur-md bg-card/80 border border-border/60 rounded-xl px-4 py-3 shadow-[0_8px_30px_hsl(var(--primary)/0.12)] max-w-[200px]">
              {/* Arrow */}
              <div className="absolute -top-[6px] right-4 w-3 h-3 rotate-45 bg-card/80 border-l border-t border-border/60" />
              
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center gap-1">
                  <Sun size={12} className="text-primary" />
                  <span className="text-muted-foreground/50">/</span>
                  <Moon size={12} className="text-accent" />
                </div>
                <span className="font-display text-[11px] font-bold text-foreground">
                  Theme
                </span>
              </div>
              <p className="font-mono-code text-[9px] text-muted-foreground leading-relaxed">
                Try {theme === "dark" ? "light" : "dark"} mode! Click the icon or press{" "}
                <kbd className="px-1 py-0.5 rounded bg-muted text-[8px] font-bold border border-border">
                  Ctrl+D
                </kbd>
              </p>
              <button
                onClick={dismissHint}
                className="mt-2 font-mono-code text-[8px] tracking-wider uppercase text-primary hover:text-accent transition-colors"
              >
                Got it ✓
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
