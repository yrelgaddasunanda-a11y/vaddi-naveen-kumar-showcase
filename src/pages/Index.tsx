import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { Mail, ArrowUpRight, Sparkles, MapPin, Clock, ChevronDown, Code2, Palette, Rocket, Zap } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import InteractiveLetters from "@/components/InteractiveLetters";
import FloatingParticles from "@/components/FloatingParticles";
import SocialLinks from "@/components/SocialLinks";
import ThemeToggle from "@/components/ThemeToggle";
import StatusMarquee from "@/components/StatusMarquee";
import CursorGlow from "@/components/CursorGlow";
import MagneticButton from "@/components/MagneticButton";
import IntroAnimation from "@/components/IntroAnimation";
import GradientMeshBg from "@/components/GradientMeshBg";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import MorphingBlob from "@/components/MorphingBlob";
import ScrollProgress from "@/components/ScrollProgress";
import ContactSection from "@/components/ContactSection";

/* ─── Typing text effect ─── */
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          className="text-primary"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

/* ─── 3D Tilt Skill Card ─── */
const SkillPillar = ({ icon: Icon, title, description, index }: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) => {
  const colors = ["primary", "accent", "highlight", "primary"];
  const color = colors[index % colors.length];
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const spotlightX = useTransform(mouseX, [0, 1], [0, 100]);
  const spotlightY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <ScrollReveal delay={index * 0.12} direction={index % 2 === 0 ? "left" : "right"}>
      <motion.div
        ref={ref}
        className="group relative p-6 sm:p-8 rounded-2xl border border-border/40 backdrop-blur-sm bg-card/20 overflow-hidden cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 800,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Spotlight glow following cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, hsl(var(--${color}) / 0.12), transparent 60%)`
            ),
          }}
        />

        <motion.div
          className={`w-12 h-12 rounded-xl border border-${color}/20 flex items-center justify-center mb-4 relative`}
          whileHover={{ rotate: 10, scale: 1.1 }}
          style={{ transform: "translateZ(20px)" }}
        >
          <Icon size={22} className={`text-${color}`} />
          <div className={`absolute inset-0 rounded-xl bg-${color}/5`} />
        </motion.div>

        <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2" style={{ transform: "translateZ(15px)" }}>
          {title}
        </h3>
        <p className="font-mono-code text-[11px] sm:text-xs text-muted-foreground leading-relaxed" style={{ transform: "translateZ(10px)" }}>
          {description}
        </p>

        <motion.div
          className={`absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-${color}/0 group-hover:border-${color}/20 rounded-br-2xl transition-colors duration-500`}
        />
      </motion.div>
    </ScrollReveal>
  );
};

/* ─── Animated counter ─── */
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(value / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

/* ─── Main Page ─── */
const Index = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxMid = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Blob parallax transforms
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blobY3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blobRotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const blobRotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const [introComplete, setIntroComplete] = useState(() => {
    return localStorage.getItem("vnk-intro-seen") === "true";
  });

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    localStorage.setItem("vnk-intro-seen", "true");
  }, []);

  const skills = [
    { icon: Code2, title: "Creative Development", description: "Building immersive digital experiences with cutting-edge web technologies and creative coding." },
    { icon: Palette, title: "Motion Design", description: "Crafting fluid animations and scroll-driven narratives that guide attention and delight users." },
    { icon: Rocket, title: "Performance First", description: "Optimized for speed, accessibility, and seamless experience across all devices." },
    { icon: Zap, title: "Innovation Driven", description: "Exploring WebGL, generative art, and emerging technologies to push boundaries." },
  ];

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            ref={containerRef}
            className="relative bg-background noise-bg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Layers */}
            <GradientMeshBg />
            <FloatingParticles />
            <CursorGlow />
            <ScrollProgress />

            {/* Morphing blobs with scroll parallax */}
            <motion.div style={{ y: blobY1, rotate: blobRotate1 }}>
              <MorphingBlob className="-top-32 -left-32 sm:-top-48 sm:-left-48" color="hsl(var(--primary) / 0.06)" size={500} duration={14} delay={0.5} />
            </motion.div>
            <motion.div style={{ y: blobY2, rotate: blobRotate2 }}>
              <MorphingBlob className="-bottom-40 -right-40 sm:-bottom-56 sm:-right-56" color="hsl(var(--accent) / 0.05)" size={450} duration={16} delay={1} />
            </motion.div>
            <motion.div style={{ y: blobY3 }}>
              <MorphingBlob className="top-1/3 right-0 translate-x-1/2" color="hsl(var(--highlight) / 0.04)" size={350} duration={18} delay={1.5} />
            </motion.div>

            {/* ═══════════════════ HERO SECTION ═══════════════════ */}
            <motion.section
              className="relative z-10 min-h-[100dvh] flex flex-col"
              style={{ opacity: heroOpacity, scale: heroScale }}
            >
              {/* Header */}
              <motion.header
                className="flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 sm:py-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    className="line-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ transformOrigin: "left" }}
                  />
                  <motion.span
                    className="font-display text-xs sm:text-sm md:text-base font-bold tracking-wide text-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Vaddi Naveen Kumar
                  </motion.span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border backdrop-blur-sm bg-card/30 text-muted-foreground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.4)" }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MapPin size={12} />
                    </motion.div>
                    <span className="font-mono-code text-[10px] tracking-wider uppercase">India</span>
                  </motion.div>
                  <ThemeToggle />
                </div>
              </motion.header>

              {/* Hero center */}
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
                <div className="text-center max-w-4xl w-full">
                  {/* Status Badge */}
                  <motion.div
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-border/50 backdrop-blur-md bg-card/40 shadow-[0_4px_30px_hsl(var(--primary)/0.08)] mb-6 sm:mb-10"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={12} className="text-primary sm:w-[14px] sm:h-[14px]" />
                    </motion.div>
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {["Something", "Extraordinary", "is Brewing"].map((word, i) => (
                      <motion.span
                        key={word}
                        className={`${i === 1 ? "gradient-text" : "text-foreground"} inline-block ${i < 2 ? "mr-[0.3em]" : ""}`}
                        initial={{ opacity: 0, y: 50, rotateX: -45, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                        transition={{
                          delay: 0.5 + i * 0.2,
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                    <motion.span
                      className="text-primary inline-block ml-0.5 sm:ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    >
                      _
                    </motion.span>
                  </motion.h1>

                  {/* Separator */}
                  <motion.div
                    className="flex items-center justify-center gap-3 mb-5 sm:mb-8"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                  >
                    <motion.div
                      className="h-px w-8 sm:w-16 bg-border"
                      animate={{ scaleX: [1, 1.5, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="h-px w-8 sm:w-16 bg-border"
                      animate={{ scaleX: [1, 1.5, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-10 font-mono-code leading-relaxed px-2 min-h-[3em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <TypingText
                      text="We're crafting an experience worth waiting for. This space is under development — check back soon."
                      delay={1.4}
                    />
                  </motion.p>

                  {/* CTA + Social */}
                  <motion.div
                    className="flex flex-col items-center gap-5 sm:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                  >
                    <MagneticButton
                      href="mailto:hello@vaddinaveenkumar.dev"
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
                        hello@vaddinaveenkumar.dev
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <span className="font-mono-code text-[8px] tracking-[0.3em] uppercase text-muted-foreground/30 mb-1">
                  Scroll to explore
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown size={16} className="text-muted-foreground/30" />
                </motion.div>
              </motion.div>
            </motion.section>

            {/* ═══════════════════ MARQUEE DIVIDER ═══════════════════ */}
            <StatusMarquee />

            {/* ═══════════════════ ABOUT / VISION SECTION ═══════════════════ */}
            <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-8 md:px-12">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="flex items-center gap-3 mb-8 sm:mb-12">
                    <div className="line-accent" />
                    <span className="font-mono-code text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground">
                      About the Project
                    </span>
                  </div>
                </ScrollReveal>

                <TextReveal
                  text="Building digital experiences at the intersection of design, motion, and technology."
                  className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-8 sm:mb-12"
                  delay={0.1}
                />

                <ScrollReveal delay={0.3}>
                  <p className="font-mono-code text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    This portfolio is being crafted with obsessive attention to detail — every animation, 
                    every interaction, every pixel is intentional. Built with React, Framer Motion, 
                    and a passion for pushing web boundaries.
                  </p>
                </ScrollReveal>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16">
                  {[
                    { value: 100, suffix: "%", label: "Passion" },
                    { value: 60, suffix: "fps", label: "Smooth" },
                    { value: 0, suffix: "→∞", label: "Projects" },
                  ].map((stat, i) => (
                    <ScrollReveal key={stat.label} delay={0.1 + i * 0.1}>
                      <div className="text-center">
                        <div className="font-display text-3xl sm:text-5xl font-extrabold gradient-text mb-1">
                          {stat.suffix === "→∞" ? (
                            <span>0<span className="text-primary">→∞</span></span>
                          ) : (
                            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                          )}
                        </div>
                        <span className="font-mono-code text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
                          {stat.label}
                        </span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════════ SKILLS / PILLARS ═══════════════════ */}
            <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-8 md:px-12">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="flex items-center gap-3 mb-8 sm:mb-12">
                    <div className="line-accent" />
                    <span className="font-mono-code text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground">
                      What I Do
                    </span>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {skills.map((skill, i) => (
                    <SkillPillar key={skill.title} {...skill} index={i} />
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════════ HORIZONTAL RULE ANIMATION ═══════════════════ */}
            <ScrollReveal className="px-4 sm:px-8 md:px-12">
              <div className="max-w-5xl mx-auto flex items-center gap-4">
                <motion.div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary/40"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
            </ScrollReveal>

            {/* ═══════════════════ INTERACTIVE LETTERS SECTION ═══════════════════ */}
            <motion.section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
              <ScrollReveal>
                <p className="text-center text-muted-foreground/40 font-mono-code text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-4 sm:mb-5">
                  {typeof window !== "undefined" && "ontouchstart" in window
                    ? "Tap the letters ↓"
                    : "Hover over the letters ↓"}
                </p>
              </ScrollReveal>
              <InteractiveLetters />
            </motion.section>

            {/* ═══════════════════ CONTACT SECTION ═══════════════════ */}
            <ContactSection />

            {/* ═══════════════════ FOOTER ═══════════════════ */}
            <footer className="relative z-10 border-t border-border/30 py-8 sm:py-12 px-4 sm:px-8 md:px-12">
              <div className="max-w-5xl mx-auto">
                {/* Footer top row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
                  <ScrollReveal direction="left">
                    <div className="flex items-center gap-3">
                      <div className="line-accent" />
                      <span className="font-display text-sm font-bold text-foreground">
                        Vaddi Naveen Kumar
                      </span>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="right">
                    <SocialLinks />
                  </ScrollReveal>
                </div>

                {/* Divider */}
                <motion.div
                  className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent mb-6"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />

                {/* Footer bottom */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <ScrollReveal direction="left">
                    <span className="font-mono-code text-[9px] sm:text-[10px] tracking-widest uppercase text-muted-foreground/30">
                      © {currentYear} Vaddi Naveen Kumar
                    </span>
                  </ScrollReveal>

                  <ScrollReveal direction="right">
                    <div className="flex items-center gap-3">
                      <span className="font-mono-code text-[9px] tracking-wider uppercase text-muted-foreground/20">
                        Built with passion
                      </span>
                      <motion.div
                        className="w-1 h-1 rounded-full bg-primary"
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </footer>

            {/* ═══════════════════ PARALLAX BACKGROUND DECORATIONS ═══════════════════ */}
            <motion.div className="fixed top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-[radial-gradient(circle,hsl(var(--primary)/0.08),transparent_70%)] pointer-events-none z-0" style={{ y: parallaxSlow }} />
            <motion.div className="fixed bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[radial-gradient(circle,hsl(var(--accent)/0.06),transparent_70%)] pointer-events-none z-0" style={{ y: parallaxFast }} />
            <motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-[radial-gradient(circle,hsl(var(--primary)/0.03),transparent_60%)] pointer-events-none z-0" style={{ y: parallaxMid, scale: parallaxScale }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
