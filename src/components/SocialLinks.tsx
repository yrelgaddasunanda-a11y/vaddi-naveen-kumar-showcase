import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/", color: "hover:text-foreground" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/", color: "hover:text-primary" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/", color: "hover:text-accent" },
  { icon: Twitter, label: "X", href: "https://x.com/", color: "hover:text-foreground" },
];

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {links.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground ${link.color} hover:border-primary/40 transition-all duration-300 active:scale-90`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 + i * 0.08, duration: 0.4 }}
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={link.label}
        >
          <link.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono-code opacity-0 group-hover:opacity-70 transition-opacity duration-200 whitespace-nowrap text-muted-foreground pointer-events-none">
            {link.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
