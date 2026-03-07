import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: [number, number, number];
}

const GradientMeshBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouse);

    // Check if dark mode
    const isDark = () => document.documentElement.classList.contains("dark");

    const blobs: Blob[] = [
      { x: 0.3, y: 0.3, vx: 0.0003, vy: 0.0002, radius: 0.35, color: [15, 85, 55] },   // primary orange
      { x: 0.7, y: 0.6, vx: -0.0002, vy: 0.0003, radius: 0.3, color: [350, 65, 52] },   // accent red
      { x: 0.5, y: 0.8, vx: 0.0002, vy: -0.0002, radius: 0.25, color: [45, 90, 60] },    // highlight yellow
      { x: 0.2, y: 0.7, vx: 0.0001, vy: -0.0003, radius: 0.28, color: [15, 85, 55] },    // primary
      { x: 0.8, y: 0.2, vx: -0.0003, vy: 0.0001, radius: 0.22, color: [350, 65, 58] },   // accent
    ];

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const dark = isDark();
      const baseAlpha = dark ? 0.06 : 0.045;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      blobs.forEach((blob) => {
        // Mouse influence
        const dx = mx - blob.x;
        const dy = my - blob.y;
        blob.x += blob.vx + dx * 0.0001;
        blob.y += blob.vy + dy * 0.0001;

        // Bounce
        if (blob.x < -0.1 || blob.x > 1.1) blob.vx *= -1;
        if (blob.y < -0.1 || blob.y > 1.1) blob.vy *= -1;

        const cx = blob.x * w;
        const cy = blob.y * h;
        const r = blob.radius * Math.max(w, h);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const [hue, sat, light] = blob.color;
        gradient.addColorStop(0, `hsla(${hue}, ${sat}%, ${light}%, ${baseAlpha})`);
        gradient.addColorStop(0.5, `hsla(${hue}, ${sat}%, ${light}%, ${baseAlpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${hue}, ${sat}%, ${light}%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "normal" }}
    />
  );
};

export default GradientMeshBg;
