import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUpRight, Sparkles, MapPin, Clock } from "lucide-react";
import { useState, useCallback } from "react";
import InteractiveLetters from "@/components/InteractiveLetters";
import FloatingParticles from "@/components/FloatingParticles";
import SocialLinks from "@/components/SocialLinks";
import ThemeToggle from "@/components/ThemeToggle";
import ProgressBar from "@/components/ProgressBar";
import StatusMarquee from "@/components/StatusMarquee";
import CursorGlow from "@/components/CursorGlow";
import MagneticButton from "@/components/MagneticButton";
import IntroAnimation from "@/components/IntroAnimation";

const Index = () => {
  const currentYear = new Date().getFullYear();
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      <IntroAnimation onComplete={handleIntroComplete} />
      <AnimatePresence>
        {introComplete && (
          <motion.div
            className="relative min-h-[100dvh] bg-background noise-bg dot-pattern overflow-hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
      <FloatingParticles />
      <CursorGlow />

      {/* Top animated progress bar */}
      <ProgressBar />

      {/* Header */}
      <motion.header
        className="relative z-10 flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 sm:py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="line-accent" />
          <span className="font-display text-xs sm:text-sm md:text-base font-bold tracking-wide text-foreground">
            Vaddi Naveen Kumar
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <MapPin size={12} />
            <span className="font-mono-code text-[10px] tracking-wider uppercase">India</span>
          </motion.div>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* Center Content */}
      <div className="flex-1 relative z-10 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-0">
        <div className="text-center max-w-4xl w-full">
          {/* Status Badge */}
          <motion.div
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-border/50 backdrop-blur-md bg-card/40 shadow-[0_4px_30px_hsl(var(--primary)/0.08)] mb-6 sm:mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Sparkles size={12} className="text-primary sm:w-[14px] sm:h-[14px]" />
            <span className="font-mono-code text-[10px] sm:text-xs text-muted-foreground tracking-wider uppercase">
              Under Construction
            </span>
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-primary" />
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-[2.5rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-extrabold sm:leading-[0.9] mb-5 sm:mb-8 font-display px-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="text-foreground inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Something
            </motion.span>
            <br />
            <motion.span
              className="gradient-text inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              Extraordinary
            </motion.span>
            <br />
            <motion.span
              className="text-foreground inline-block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              is Brewing
            </motion.span>
            <motion.span
              className="text-primary inline-block ml-0.5 sm:ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
              _
            </motion.span>
          </motion.h1>

          {/* Decorative separator */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-5 sm:mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="h-px w-8 sm:w-16 bg-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-8 sm:w-16 bg-border" />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-10 font-mono-code leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            We're crafting an experience worth waiting for.
            <br className="hidden sm:block" />
            This space is under development — check back soon.
          </motion.p>

          {/* Contact + Social */}
          <motion.div
            className="flex flex-col items-center gap-5 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <MagneticButton
              href="mailto:vaddinaveen@example.com"
              className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-display text-xs sm:text-sm font-bold hover:shadow-[0_0_40px_hsl(var(--primary)/0.35)] transition-all duration-300"
            >
              <Mail size={14} className="sm:w-4 sm:h-4" />
              Get in Touch
              <ArrowUpRight
                size={12}
                className="sm:w-[14px] sm:h-[14px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </MagneticButton>

            <SocialLinks />

            <div className="flex items-center gap-2 text-muted-foreground/50">
              <Clock size={10} />
              <span className="font-mono-code text-[10px] sm:text-xs">
                vaddinaveen@example.com
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling marquee */}
      <StatusMarquee />

      {/* Bottom Interactive Letters */}
      <motion.footer
        className="relative z-10 py-6 sm:py-10 md:py-14 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p className="text-center text-muted-foreground/40 font-mono-code text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-4 sm:mb-5">
          {typeof window !== "undefined" && "ontouchstart" in window
            ? "Tap the letters ↓"
            : "Hover over the letters ↓"}
        </p>
        <InteractiveLetters />

        {/* Copyright */}
        <motion.p
          className="text-center text-muted-foreground/30 font-mono-code text-[9px] tracking-widest uppercase mt-6 sm:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          © {currentYear} Vaddi Naveen Kumar. All rights reserved.
        </motion.p>
      </motion.footer>

      {/* Corner Decorations - responsive */}
      <div className="fixed top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-[radial-gradient(circle,hsl(var(--primary)/0.08),transparent_70%)] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[radial-gradient(circle,hsl(var(--accent)/0.06),transparent_70%)] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-[radial-gradient(circle,hsl(var(--primary)/0.03),transparent_60%)] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
