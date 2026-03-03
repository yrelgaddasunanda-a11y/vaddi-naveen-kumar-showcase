import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Sparkles } from "lucide-react";
import InteractiveLetters from "@/components/InteractiveLetters";
import FloatingParticles from "@/components/FloatingParticles";
import SocialLinks from "@/components/SocialLinks";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background noise-bg dot-pattern overflow-hidden flex flex-col">
      <FloatingParticles />

      {/* Header */}
      <motion.header
        className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="line-accent" />
          <span className="font-display text-sm sm:text-base font-bold tracking-wide text-foreground">
            Vaddi Naveen Kumar
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </motion.header>

      {/* Center Content */}
      <div className="flex-1 relative z-10 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          {/* Status Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border border-glow mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Sparkles size={14} className="text-primary" />
            <span className="font-mono-code text-xs text-muted-foreground tracking-wider uppercase">
              Under Construction
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold leading-[0.9] mb-8 font-display"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-foreground">Something</span>
            <br />
            <span className="gradient-text">Extraordinary</span>
            <br />
            <span className="text-foreground">is Brewing</span>
            <motion.span
              className="text-primary inline-block ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
              _
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto mb-10 font-mono-code leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            We're crafting an experience worth waiting for.
            <br className="hidden sm:block" />
            This space is under development — check back soon.
          </motion.p>

          {/* Contact + Social */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <a
              href="mailto:vaddinaveen@example.com"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-display text-sm font-bold hover:shadow-[0_0_40px_hsl(var(--primary)/0.35)] transition-all duration-300 hover:scale-105"
            >
              <Mail size={16} />
              Get in Touch
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>

            <SocialLinks />

            <span className="text-muted-foreground/60 font-mono-code text-xs">
              vaddinaveen@example.com
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Interactive Letters */}
      <motion.footer
        className="relative z-10 py-8 sm:py-14 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-center text-muted-foreground/50 font-mono-code text-[10px] tracking-[0.2em] uppercase mb-5">
          Hover over the letters ↓
        </p>
        <InteractiveLetters />
      </motion.footer>

      {/* Corner Decorations */}
      <div className="fixed top-0 left-0 w-72 h-72 bg-[radial-gradient(circle,hsl(var(--primary)/0.08),transparent_70%)] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,hsl(var(--accent)/0.06),transparent_70%)] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--primary)/0.03),transparent_60%)] pointer-events-none" />
    </div>
  );
};

export default Index;
