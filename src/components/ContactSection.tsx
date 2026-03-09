import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, ArrowUpRight, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@vaddinaveenkumar.dev",
      href: "mailto:hello@vaddinaveenkumar.dev",
      color: "primary",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-20 sm:py-32 px-4 sm:px-8 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <div className="line-accent" />
            <span className="font-mono-code text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Get in Touch
            </span>
          </div>
        </ScrollReveal>

        {/* Big CTA text */}
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-[1.05] mb-6 sm:mb-10">
            Let's Create{" "}
            <span className="gradient-text">Something</span>
            <br />
            <span className="text-foreground">Together</span>
            <motion.span
              className="inline-block ml-2 text-primary"
              animate={{ rotate: [0, 14, -8, 14, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={28} className="sm:w-8 sm:h-8" />
            </motion.span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-mono-code text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed mb-10 sm:mb-14">
            Have a project in mind, or just want to say hello? I'd love to hear from you.
            Let's discuss how we can bring your ideas to life.
          </p>
        </ScrollReveal>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {/* Email card */}
          <ScrollReveal delay={0.25} direction="left">
            <motion.a
              href="mailto:hello@vaddinaveenkumar.dev"
              className="group relative block p-6 sm:p-8 rounded-2xl border border-border/40 backdrop-blur-sm bg-card/20 overflow-hidden"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onMouseEnter={() => setHoveredField("email")}
              onMouseLeave={() => setHoveredField(null)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
              
              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-xl border border-primary/20 flex items-center justify-center mb-4"
                  animate={hoveredField === "email" ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Mail size={20} className="text-primary" />
                </motion.div>
                <p className="font-mono-code text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 mb-2">
                  Email
                </p>
                <p className="font-display text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  hello@vaddinaveenkumar.dev
                </p>
              </div>

              <motion.div
                className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/0 group-hover:border-primary/20 rounded-br-2xl transition-colors duration-500"
              />
            </motion.a>
          </ScrollReveal>

          {/* Quick action card */}
          <ScrollReveal delay={0.3} direction="right">
            <motion.div
              className="group relative p-6 sm:p-8 rounded-2xl border border-border/40 backdrop-blur-sm bg-card/20 overflow-hidden flex flex-col justify-between"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.08),transparent_70%)]" />

              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-xl border border-accent/20 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 10 }}
                >
                  <Send size={20} className="text-accent" />
                </motion.div>
                <p className="font-mono-code text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 mb-2">
                  Availability
                </p>
                <p className="font-display text-sm sm:text-base font-bold text-foreground">
                  Open for collaborations
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-full w-full bg-green-500" />
                  </span>
                  <span className="font-mono-code text-[10px] text-muted-foreground">Currently available</span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Big CTA button */}
        <ScrollReveal delay={0.35}>
          <div className="flex justify-center">
            <MagneticButton
              href="mailto:hello@vaddinaveenkumar.dev"
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-primary text-primary-foreground font-display text-sm sm:text-base font-bold hover:shadow-[0_0_60px_hsl(var(--primary)/0.4)] transition-all duration-300"
            >
              <Mail size={18} />
              Say Hello
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
