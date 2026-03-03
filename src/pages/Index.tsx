import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Code2, Sparkles } from "lucide-react";
import InteractiveLetters from "@/components/InteractiveLetters";
import FloatingParticles from "@/components/FloatingParticles";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background noise-bg grid-pattern overflow-hidden flex flex-col">
      <FloatingParticles />

      {/* Top Name */}
      <motion.header
        className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono-code text-sm sm:text-base text-muted-foreground tracking-widest uppercase">
            Vaddi Naveen Kumar
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Code2 size={16} />
          <span className="font-mono-code text-xs hidden sm:inline">v0.1.0</span>
        </div>
      </motion.header>

      {/* Center Content */}
      <div className="flex-1 relative z-10 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          {/* Status Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border border-glow mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Sparkles size={14} className="text-primary" />
            <span className="font-mono-code text-xs text-muted-foreground tracking-wider uppercase">
              Under Development
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="gradient-text">Something</span>
            <br />
            <span className="text-foreground">Amazing is</span>
            <br />
            <span className="gradient-text">Coming</span>
            <span className="text-primary text-glow">_</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto mb-10 font-mono-code leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            We're crafting something extraordinary. This website is currently
            under development. Please come back later.
          </motion.p>

          {/* Contact */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <a
              href="mailto:vaddinaveen@example.com"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono-code text-sm font-semibold hover:shadow-[0_0_30px_hsl(160_100%_50%/0.3)] transition-all duration-300"
            >
              <Mail size={16} />
              Contact for Queries
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <span className="text-muted-foreground font-mono-code text-xs">
              vaddinaveen@example.com
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Interactive Letters */}
      <motion.footer
        className="relative z-10 py-8 sm:py-12 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-center text-muted-foreground font-mono-code text-[10px] tracking-widest uppercase mb-4">
          Hover over the letters ↓
        </p>
        <InteractiveLetters />
      </motion.footer>

      {/* Corner Decorations */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-[radial-gradient(circle,hsl(160_100%_50%/0.06),transparent_70%)] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,hsl(280_80%_65%/0.05),transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default Index;
