import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/" },
];

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      {links.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label={link.label}
        >
          <link.icon size={18} />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono-code text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-200 whitespace-nowrap">
            {link.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
