/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Instagram,
  ArrowRight,
  Mail,
  MapPin,
  Globe,
  Cpu,
  BarChart3,
  Zap,
  ShieldCheck,
  Facebook,
  Share2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// ─── VIEWPORT CONFIG (once: false = re-triggers ogni volta) ──────────────────
const vp  = { once: false, amount: 0.2 } as const;
const vpS = { once: false, amount: 0.4 } as const;

// ─── HOOK PER RILEVARE SE SIAMO SU MOBILE ────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ─── ANIMATED TITLE ──────────────────────────────────────────────────────────
const AnimatedTitle = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="relative overflow-visible">

    {/* ① Grande cerchio viola — esplode dalla sinistra */}
    <motion.div
      className="absolute -left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-violet-600 pointer-events-none"
      initial={{ x: -130, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, scale: 1, opacity: [0, 0.9, 0.9, 0] }}
      viewport={vp}
      transition={{ duration: 1.1, times: [0, 0.22, 0.65, 1] }}
    />

    {/* ② Cerchio fuchsia — scende diagonale da destra */}
    <motion.div
      className="absolute right-1/3 -top-5 w-9 h-9 rounded-full bg-fuchsia-500 pointer-events-none"
      initial={{ x: 80, y: -80, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 1.0, delay: 0.08, times: [0, 0.25, 0.65, 1] }}
    />

    {/* ③ Quadrato viola che ruota piombando dall'alto */}
    <motion.div
      className="absolute left-[44%] -top-4 w-7 h-7 bg-violet-800 pointer-events-none"
      initial={{ y: -100, rotate: -200, scale: 0, opacity: 0 }}
      whileInView={{ y: 0, rotate: 45, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 1.0, delay: 0.14, times: [0, 0.28, 0.65, 1] }}
    />

    {/* ④ Linea di scansione orizzontale */}
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-400 to-transparent pointer-events-none"
      initial={{ scaleX: 0, originX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: [0, 0.85, 0.85, 0] }}
      viewport={vp}
      transition={{ duration: 0.85, delay: 0.05, times: [0, 0.18, 0.7, 1] }}
    />

    {/* ⑤ Punto bianco — scatta dall'angolo in alto a sinistra */}
    <motion.div
      className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-white pointer-events-none"
      initial={{ x: -50, y: -50, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.04, times: [0, 0.3, 0.6, 1] }}
    />

    {/* ⑥ Triangolo — sale dal basso ruotando */}
    <motion.div
      className="absolute right-[26%] bottom-1 w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[20px] border-b-violet-400 pointer-events-none"
      initial={{ y: 70, scale: 0, opacity: 0, rotate: 180 }}
      whileInView={{ y: 0, scale: 1, opacity: [0, 1, 1, 0], rotate: 0 }}
      viewport={vp}
      transition={{ duration: 1.0, delay: 0.18, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ⑦ Orb glow fuchsia — pulsa a destra */}
    <motion.div
      className="absolute -right-10 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-fuchsia-600 blur-3xl pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: [0, 0.45, 0.45, 0] }}
      viewport={vp}
      transition={{ duration: 1.2, times: [0, 0.2, 0.6, 1] }}
    />

    {/* ⑧ Piccolo quadrato viola — scivola da basso-destra */}
    <motion.div
      className="absolute right-16 bottom-0 w-5 h-5 bg-violet-500 pointer-events-none"
      initial={{ x: 40, y: 40, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.12, times: [0, 0.3, 0.6, 1] }}
    />

    {/* ⑨ Linea verticale accent */}
    <motion.div
      className="absolute left-[30%] top-0 w-[2px] h-full bg-gradient-to-b from-violet-400 to-transparent pointer-events-none"
      initial={{ scaleY: 0, originY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: [0, 0.6, 0.6, 0] }}
      viewport={vp}
      transition={{ duration: 0.7, delay: 0.1, times: [0, 0.2, 0.7, 1] }}
    />

    {/* ⑩ Micro-cerchio fuchsia basso-sinistra */}
    <motion.div
      className="absolute left-[38%] bottom-0 w-3 h-3 rounded-full bg-fuchsia-400 pointer-events-none"
      initial={{ scale: 0, opacity: 0, y: 20 }}
      whileInView={{ scale: 1, opacity: [0, 1, 1, 0], y: 0 }}
      viewport={vp}
      transition={{ duration: 0.7, delay: 0.22, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ─── TESTO EMERGENTE ───────────────────────────────────────────── */}
    <motion.div
      className={`relative z-10 ${className}`}
      initial={{ opacity: 0, y: 36, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={vp}
      transition={{ duration: 0.9, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

// ─── ANIMATED PARAGRAPH ──────────────────────────────────────────────────────
const AnimatedParagraph = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="relative overflow-visible">

    {/* ① Dot viola da sinistra */}
    <motion.div
      className="absolute -left-3 top-2 w-3 h-3 rounded-full bg-violet-500 pointer-events-none"
      initial={{ x: -30, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 0.7, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ② Dot fuchsia dall'alto-destra */}
    <motion.div
      className="absolute right-1/4 -top-1 w-2.5 h-2.5 rounded-full bg-fuchsia-400 pointer-events-none"
      initial={{ x: 25, y: -20, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 0.6, delay: 0.06, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ③ Mini quadrato che si srotola */}
    <motion.div
      className="absolute left-1/4 bottom-1 w-2.5 h-2.5 bg-violet-700 pointer-events-none"
      initial={{ scale: 0, opacity: 0, rotate: -45 }}
      whileInView={{ scale: 1, opacity: [0, 0.8, 0.8, 0], rotate: 0 }}
      viewport={vp}
      transition={{ duration: 0.6, delay: 0.1, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ④ Sottile sottolineatura che si disegna da sinistra */}
    <motion.div
      className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-violet-400/40 to-transparent pointer-events-none"
      initial={{ scaleX: 0, originX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: [0, 0.7, 0.7, 0] }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.08, times: [0, 0.2, 0.7, 1] }}
    />

    {/* ⑤ Soft glow */}
    <motion.div
      className="absolute right-1/3 bottom-0 w-8 h-8 rounded-full bg-violet-500 blur-lg pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: [0, 0.4, 0.4, 0] }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.15, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ─── TESTO EMERGENTE ───────────────────────────────────────────── */}
    <motion.div
      className={`relative z-10 ${className}`}
      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.38, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

// ─── COMPONENTE PRINCIPALE ───────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // ─── LINK DI NAVIGAZIONE (mobile, con stato attivo) ──────────────────────────
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/articoli', label: 'Articoli' },
    { href: '/soluzioni', label: 'Soluzioni' },
    { href: '/chisiamo', label: 'Chi Siamo' },
    { href: '/contatti', label: 'Contatti' },
  ];

  // ─── VARIANTI ANIMAZIONE NAVBAR MOBILE ──────────────────────────────────────
  const mobileNavContainer = {
    hidden: { opacity: 0, y: -16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const mobileNavItem = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  // ─── CAROSELLO HERO ─────────────────────────────────────────────────────────
  const trackRef       = useRef<HTMLDivElement>(null);
  const positionRef    = useRef(0);
  const rafRef         = useRef<number | null>(null);
  const isDraggingHero = useRef(false);
  const dragStartX     = useRef(0);
  const dragStartPos   = useRef(0);
  const hasDragged     = useRef(false);
  // Touch support refs
  const touchStartX    = useRef(0);
  const touchStartPos  = useRef(0);
  const SPEED          = 0.8;

  // ─── INDICI IMMAGINI CAROSELLO ───────────────────────────────────────────────
  const CAROUSEL_ITEMS = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

  const startAnimation = () => {
    const tick = () => {
      if (!trackRef.current) return;
      const halfWidth = trackRef.current.scrollWidth / 2;
      positionRef.current -= SPEED;
      if (positionRef.current <= -halfWidth) positionRef.current += halfWidth;
      trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const stopAnimation = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  useEffect(() => {
    startAnimation();
    return () => stopAnimation();
  }, []);

  // ── Mouse handlers ──
  const onHeroMouseDown = (e: React.MouseEvent) => {
    stopAnimation();
    isDraggingHero.current = true;
    hasDragged.current     = false;
    dragStartX.current     = e.clientX;
    dragStartPos.current   = positionRef.current;
  };

  const onHeroMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingHero.current || !trackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let newPos = dragStartPos.current + dx;
    if (newPos > 0)           newPos -= halfWidth;
    if (newPos <= -halfWidth) newPos += halfWidth;
    positionRef.current = newPos;
    trackRef.current.style.transform = `translateX(${newPos}px)`;
  };

  const onHeroMouseUpOrLeave = () => {
    if (isDraggingHero.current) {
      isDraggingHero.current = false;
      startAnimation();
    }
  };

  // ── Touch handlers (mobile drag fix) ──
  const onHeroTouchStart = (e: React.TouchEvent) => {
    stopAnimation();
    hasDragged.current    = false;
    touchStartX.current   = e.touches[0].clientX;
    touchStartPos.current = positionRef.current;
  };

  const onHeroTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let newPos = touchStartPos.current + dx;
    if (newPos > 0)           newPos -= halfWidth;
    if (newPos <= -halfWidth) newPos += halfWidth;
    positionRef.current = newPos;
    trackRef.current.style.transform = `translateX(${newPos}px)`;
  };

  const onHeroTouchEnd = () => {
    startAnimation();
  };

  const handleImageClick = () => {
    if (!hasDragged.current) router.push('/articoli');
  };

  const NetworkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      const points = Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      }));

      let animFrameId: number;

      const draw = () => {
        ctx.clearRect(0, 0, width, height);

        points.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          // MOBILE: nodi più visibili su mobile (opacità aumentata)
          ctx.fillStyle = "rgba(139,92,246,0.9)";
          ctx.fill();
        });

        for (let i = 0; i < points.length; i++) {
          for (let j = i; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              // MOBILE: linee più visibili (opacità aumentata)
              const alpha = (1 - dist / 120) * (window.innerWidth < 768 ? 1.0 : 1.0);
              ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
              ctx.lineWidth = window.innerWidth < 768 ? 0.9 : 0.6;
              ctx.stroke();
            }
          }
        }

        animFrameId = requestAnimationFrame(draw);
      };

      draw();

      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', resize);
      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animFrameId);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    );
  };

  // ─── DATI ───────────────────────────────────────────────────────────────────
  const articoli = [
    {
      id: 1,
      anno: 2025,
      categoria: 'Intelligenza Artificiale',
      titolo: "L'evoluzione dell'AI nel 2025",
      desc: "Un'analisi dettagliata su come le nuove architetture trasformeranno il lavoro creativo.",
      gradientFrom: 'from-fuchsia-600',
      gradientTo: 'to-violet-800',
      accent: 'bg-fuchsia-100 text-fuchsia-700',
      tag: '#AI',
      delay: 0,
      // MOBILE: always from bottom; DESKTOP: from left
      enterFrom: { x: 0, y: 40 },
    },
    {
      id: 2,
      anno: 2026,
      categoria: 'Quantum Computing',
      titolo: "L'evoluzione dell'AI nel 2026",
      desc: 'Quantum computing e modelli neurali: la convergenza che ridefinirà ogni settore industriale.',
      gradientFrom: 'from-fuchsia-600',
      gradientTo: 'to-violet-800',
      accent: 'bg-fuchsia-100 text-fuchsia-700',
      tag: '#Quantum',
      delay: 0.12,
      // MOBILE: always from bottom; DESKTOP: from bottom (same)
      enterFrom: { x: 0, y: 40 },
    },
    {
      id: 3,
      anno: 2027,
      categoria: 'Future Tech',
      titolo: "L'evoluzione dell'AI nel 2027",
      desc: 'Scenari futuri e paradigmi emergenti: come prepararsi alla prossima rivoluzione tecnologica.',
      gradientFrom: 'from-fuchsia-600',
      gradientTo: 'to-violet-800',
      accent: 'bg-fuchsia-100 text-fuchsia-700',
      tag: '#Future',
      delay: 0.24,
      // MOBILE: always from bottom; DESKTOP: from right
      enterFrom: { x: 0, y: 40 },
    },
  ];

  const soluzioni = [
    {
      id: 1,
      title: 'AI & Machine Learning',
      desc: 'Sviluppiamo algoritmi predittivi per trasformare i dati in decisioni automatizzate.',
      icon: <Cpu className="text-violet-400" size={28} />,
      size: 'md:col-span-2',
      // MOBILE: always from bottom; DESKTOP: from left
      enterFrom: { x: isMobile ? 0 : -40, y: isMobile ? 40 : 0 },
    },
    {
      id: 2,
      title: 'Data Analytics',
      desc: 'Visualizzazione avanzata dei flussi informativi aziendali.',
      icon: <BarChart3 className="text-violet-400" size={28} />,
      size: 'md:col-span-1',
      // MOBILE: always from bottom; DESKTOP: from right
      enterFrom: { x: isMobile ? 0 : 20, y: isMobile ? 40 : 0 },
    },
    {
      id: 3,
      title: 'Cloud Strategy',
      desc: 'Infrastrutture scalabili e resilienti per il business moderno.',
      icon: <Zap className="text-violet-400" size={28} />,
      size: 'md:col-span-1',
      // MOBILE: always from bottom; DESKTOP: from left
      enterFrom: { x: isMobile ? 0 : -30, y: isMobile ? 40 : 0 },
    },
    {
      id: 4,
      title: 'Cyber Security',
      desc: 'Protezione end-to-end degli asset digitali e conformità normativa.',
      icon: <ShieldCheck className="text-violet-400" size={28} />,
      size: 'md:col-span-2',
      // MOBILE: always from bottom; DESKTOP: from bottom (same)
      enterFrom: { x: 0, y: 40 },
    },
  ];

  const footerNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/articoli', label: 'Articoli' },
    { href: '/soluzioni', label: 'Soluzioni' },
    { href: '/chisiamo', label: 'Chi Siamo' },
  ];

  const footerSocials = [
    { Icon: Facebook },
    { Icon: Instagram },
    { Icon: Share2 },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans">

      {/* ─── NAVBAR ────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/8 shadow-[0_0_40px_rgba(139,92,246,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 select-none">
            <Link href="/">NVision Insights™</Link>
          </h1>
          <button className="md:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className="hidden md:flex space-x-10 text-base font-light tracking-wide">
            <Link href="/" className="text-white/90 font-semibold">Home</Link>
            <Link href="/articoli" className="text-white/70 hover:text-white transition-colors duration-300">Articoli</Link>
            <Link href="/soluzioni" className="text-white/70 hover:text-white transition-colors duration-300">Soluzioni</Link>
            <Link href="/chisiamo" className="text-white/70 hover:text-white transition-colors duration-300">Chi Siamo</Link>
            <Link href="/contatti" className="text-white/70 hover:text-white transition-colors duration-300">Contatti</Link>
          </nav>
        </div>

        {/* ─── MOBILE NAV — vetro nero opaco, stato attivo bianco ─────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              variants={mobileNavContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden absolute top-full left-0 w-full px-3 pb-3 z-40"
            >
              <div
                className="
                  relative overflow-hidden
                  bg-black/95 backdrop-blur-2xl backdrop-saturate-100
                  border border-white/10
                  rounded-3xl
                  shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]
                  px-3 py-4 mt-2
                "
              >
                {/* glow di sfondo sottile, in tema col resto della pagina */}
                <div className="pointer-events-none absolute -top-20 -right-16 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 w-48 h-48 bg-fuchsia-600/10 rounded-full blur-3xl" />

                <ul className="relative flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === '/'
                        ? pathname === '/'
                        : pathname?.startsWith(link.href);

                    return (
                      <motion.li key={link.href} variants={mobileNavItem}>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`
                            relative flex items-center justify-between
                            px-4 py-3.5 rounded-2xl
                            text-lg font-medium
                            transition-colors duration-300
                            ${
                              isActive
                                ? 'bg-white text-black shadow-lg shadow-white/10'
                                : 'text-white/70 hover:text-white hover:bg-white/5'
                            }
                          `}
                        >
                          <span>{link.label}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* linea decorativa in basso */}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-center">
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="pt-45 sm:pt-32 pb-[6rem] min-h-[60vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 relative overflow-hidden bg-black">

        {/* Glow background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-700/25 blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-fuchsia-800/10 blur-[120px] pointer-events-none" />

        {/* MOBILE: overlay viola più visibile sul network background */}
        <div className="absolute inset-0 z-[1] pointer-events-none md:hidden bg-violet-900/10" />

        {/* NETWORK LAYER */}
        <div className="absolute inset-0 z-0 opacity-90">
          <NetworkBackground />
        </div>

        {/* ── CONTENUTO HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl mx-auto z-10"
        >

          {/* ── TITOLO ANIMATO ── */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-[12vw] sm:text-7xl font-black text-white tracking-tighter leading-none mb-8 whitespace-nowrap"
          >
            NVision{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-violet-500 to-violet-300">
              Insights
            </span>
          </motion.h2>

          {/* ── PARAGRAFO — MOBILE: testo leggermente più piccolo ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-[1.12rem] sm:text-xl text-white max-w-2xl mx-auto mb-20 leading-relaxed font-light"
          >
            Tecnologia, divulgazione e innovazione progettate per la <b>prossima generazione di leader digitali.</b>
          </motion.p>
        </motion.div>

        {/* ── CAROSELLO — MOBILE: più grande, touch drag funzionante ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          // MOBILE: w-full con overflow hidden per evitare scroll orizzontale della pagina
          className="overflow-hidden w-full max-w-full py-6 select-none z-10"
          // Mouse events (desktop)
          onMouseDown={onHeroMouseDown}
          onMouseMove={onHeroMouseMove}
          onMouseUp={onHeroMouseUpOrLeave}
          onMouseLeave={onHeroMouseUpOrLeave}
          // Touch events (mobile)
          onTouchStart={onHeroTouchStart}
          onTouchMove={onHeroTouchMove}
          onTouchEnd={onHeroTouchEnd}
          style={{ cursor: isDraggingHero.current ? 'grabbing' : 'grab' }}
        >
          <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
            {CAROUSEL_ITEMS.map((i, index) => (
              <div
                key={index}
                onClick={handleImageClick}
                // MOBILE: min-w aumentato da 70vw a 80vw per card più grandi su mobile
                className="min-w-[0vw] sm:min-w-[55vw] md:min-w-[33vw] rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(139,92,246,0.22)] transition-all duration-300 hover:scale-[1.03] hover:shadow-violet-700/80 cursor-pointer ring-1 ring-white/5"
              >
                <img
                  src={`/carousel/img${i}.jpg`}
                  alt={`Immagine ${i}`}
                  draggable={false}
                  // MOBILE: altezza leggermente aumentata (h-52 su mobile)
                  className="w-full h-72 sm:h-56 md:h-75 object-cover pointer-events-none"
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding={index === 0 ? 'sync' : 'async'}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── SEZIONE ARTICOLI ──────────────────────────────────────────────────── */}
      <section id="articoli" className="py-24 bg-white text-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-violet-100 opacity-70 blur-3xl" />
          <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full bg-fuchsia-100 opacity-50 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-purple-100 opacity-40 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="text-center mb-16">
            <AnimatedTitle className="text-5xl md:text-7xl font-black text-zinc-950 tracking-tighter mb-4 leading-none whitespace-nowrap">
              Ultimi{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
                  Articoli
                </span>
              </span>
            </AnimatedTitle>
            <AnimatedParagraph className="text-black/70 max-w-xl mx-auto text-lg leading-relaxed font-light">
              Approfondimenti tech e analisi essenziali per restare al passo con il mondo che cambia.
            </AnimatedParagraph>
          </div>

          {/* Cards — MOBILE: animazioni sempre dal basso */}
          <div className="grid md:grid-cols-3 gap-8">
            {articoli.map((art) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, x: art.enterFrom.x, y: art.enterFrom.y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.75, delay: art.delay, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-violet-200/60 transition-all duration-500 bg-white border border-zinc-100 flex flex-col"
              >
                {/* ── Angoli-reticolo che appaiono poi svaniscono (targeting brackets) */}
                <motion.div
                  className="absolute top-3 left-3 w-6 h-6 pointer-events-none z-20"
                  style={{ borderTop: '2px solid rgba(139,92,246,0.85)', borderLeft: '2px solid rgba(139,92,246,0.85)', borderTopLeftRadius: 4 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.8, delay: art.delay + 0.25, times: [0, 0.1, 0.6, 1] }}
                />
                <motion.div
                  className="absolute top-3 right-3 w-6 h-6 pointer-events-none z-20"
                  style={{ borderTop: '2px solid rgba(232,121,249,0.85)', borderRight: '2px solid rgba(232,121,249,0.85)', borderTopRightRadius: 4 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.8, delay: art.delay + 0.3, times: [0, 0.1, 0.6, 1] }}
                />
                <motion.div
                  className="absolute bottom-3 left-3 w-6 h-6 pointer-events-none z-20"
                  style={{ borderBottom: '2px solid rgba(139,92,246,0.6)', borderLeft: '2px solid rgba(139,92,246,0.6)', borderBottomLeftRadius: 4 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.8, delay: art.delay + 0.32, times: [0, 0.1, 0.6, 1] }}
                />
                <motion.div
                  className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none z-20"
                  style={{ borderBottom: '2px solid rgba(167,139,250,0.6)', borderRight: '2px solid rgba(167,139,250,0.6)', borderBottomRightRadius: 4 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.8, delay: art.delay + 0.35, times: [0, 0.1, 0.6, 1] }}
                />

                {/* ── Linea di scansione sul banner */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-30`}
                  initial={{ scaleX: 0, originX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: [0, 0.8, 0.8, 0] }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.0, delay: art.delay + 0.1, times: [0, 0.15, 0.6, 1] }}
                />

                {/* Banner superiore */}
                <div className={`relative h-36 bg-gradient-to-br ${art.gradientFrom} ${art.gradientTo} flex items-end px-6 pb-5 overflow-hidden`}>
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
                  <div className="absolute top-4 right-16 w-16 h-16 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 left-1/2 w-24 h-24 rounded-full bg-black/10" />
                  <span className="absolute top-3 right-4 text-white/15 font-black text-6xl leading-none select-none">
                    {art.anno}
                  </span>
                  <span className="relative z-10 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold tracking-wider border border-white/25">
                    {art.categoria}
                  </span>
                </div>

                {/* Corpo */}
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${art.accent}`}>
                      {art.tag}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">Tecnologia</span>
                  </div>
                  <h4 className="text-xl font-black text-zinc-900 mb-3 leading-tight group-hover:text-fuchsia-600 transition-colors duration-300">
                    {art.titolo}
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-6 font-light">
                    {art.desc}
                  </p>
                  <Link
                    href="/articoli"
                    className={`inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${art.gradientFrom} ${art.gradientTo} bg-clip-text text-transparent group/link`}
                  >
                    Scopri di più
                    <ArrowRight size={16} className="text-violet-600 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>

                <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${art.gradientFrom} ${art.gradientTo} transition-all duration-500`} />
              </motion.div>
            ))}
          </div>

          {/* CTA — rimbalza con spring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 220, damping: 14 }}
            className="text-center mt-14"
          >
            <Link
              href="/articoli"
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-zinc-950 text-white font-bold text-sm hover:bg-purple-500 transition-all duration-300 shadow-xl hover:shadow-violet-400/30 hover:shadow-2xl"
            >
              Tutti Gli Articoli <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── SEZIONE SOLUZIONI ─────────────────────────────────────────────────── */}
      <section id="soluzioni" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-700/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-700/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header + pulsante */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <AnimatedTitle className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6 whitespace-nowrap">
                Le Nostre{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400">
                    Soluzioni
                  </span>
                </span>
              </AnimatedTitle>

              <AnimatedParagraph className="text-white/90 md:text-xl leading-relaxed font-light">
                Uniamo visione strategica e conoscenza tecnica d&apos;eccellenza.
              </AnimatedParagraph>
            </div>

            {/* Il pulsante vola da destra */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white text-black px-12 py-4 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center h-fit w-fit shadow-lg"
            >
              <Link href="/soluzioni" className="text-black hover:text-white">
                Tutte Le Soluzioni
              </Link>
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </div>

          {/* Badge "Tecnologia & Innovazione" — pop con spring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 0.25, duration: 0.6, type: 'spring', stiffness: 260, damping: 14 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Tecnologia &amp; Innovazione
          </motion.div>

          {/* Grid soluzioni — MOBILE: animazioni sempre dal basso */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {soluzioni.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: item.enterFrom.x, y: item.enterFrom.y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 0.985 }}
                className={`group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/8 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/[0.07] hover:border-violet-500/40 hover:shadow-[0_0_60px_rgba(139,92,246,0.12)] ${item.size}`}
              >
                {/* ── Linea di scansione sul bordo superiore */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent pointer-events-none"
                  initial={{ scaleX: 0, originX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.4, delay: i * 0.1 + 0.2, times: [0, 0.1, 0.6, 1] }}
                />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    {/* Icona con anello espandente */}
                    <div className="relative mb-6 w-fit">
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-violet-500 pointer-events-none"
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: [0.5, 1.6, 2.2], opacity: [0, 0.7, 0] }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{ duration: 1.1, delay: i * 0.1 + 0.35 }}
                      />
                      <div className="p-3 bg-violet-500/10 w-fit rounded-2xl border border-violet-500/20 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
                        {item.icon}
                      </div>
                    </div>

                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">{item.title}</h4>
                    <p className="text-white/90 leading-relaxed text-base font-light">{item.desc}</p>
                  </div>
                  <div className="mt-8 flex items-center text-xs font-bold text-violet-400 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href="/soluzioni" className="flex items-center">
                      Scopri di più
                      <ArrowRight className="ml-2" size={14} />
                    </Link>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-violet-500/8 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="relative mt-auto border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-6 relative z-10">

          {/*
            ─── MOBILE FOOTER: layout completamente ridisegnato ────────────────
            Su mobile: stack verticale con separatori chiari, spaziatura generosa,
            testo leggibile, social ben visibili, newsletter in fondo.
            Su desktop: grid a 4 colonne identico a prima.
          */}

          {/* ── MOBILE LAYOUT (block md:hidden) ── */}
          <div className="md:hidden space-y-10">

            {/* Brand */}
            <div className="text-center space-y-4 pb-8 border-b border-zinc-200">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vpS}
                transition={{ duration: 0.5 }}
                className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600"
              >
                NVision Insights™
              </motion.h3>
              <p className="text-zinc-500 text-sm font-light max-w-xs mx-auto">
                Tecnologia, divulgazione e innovazione per la prossima generazione di leader digitali.
              </p>
              {/* Socials centrati e grandi su mobile */}
              <div className="flex justify-center space-x-4 pt-2">
                {footerSocials.map(({ Icon }, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={vpS}
                    transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 260, damping: 13 }}
                    className="p-3 bg-zinc-100 rounded-full hover:bg-purple-600 hover:text-white text-zinc-600 transition-all duration-200 shadow-sm"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigazione + Policy su due colonne affiancate */}
            <div className="grid grid-cols-2 gap-8 pb-8 border-b border-zinc-200">
              <div>
                <h4 className="text-black font-bold mb-4 text-xs uppercase tracking-[0.15em]">Navigazione</h4>
                <ul className="space-y-3 text-sm">
                  {footerNavLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-zinc-600 hover:text-violet-600 transition-colors duration-200 font-light">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-black font-bold mb-4 text-xs uppercase tracking-[0.15em]">Policy</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { href: "/privacy", label: "Privacy Policy" },
                    { href: "/cookies", label: "Cookie Policy" },
                    { href: "/terms", label: "Termini" },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-zinc-600 hover:text-purple-600 transition-colors duration-200 font-light">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className="text-zinc-400 text-xs font-mono pt-1">P.IVA IT 01234567890</li>
                </ul>
              </div>
            </div>

            {/* Contatti + Newsletter */}
            <div className="space-y-5 pb-8 border-b border-zinc-200">
              <h4 className="text-black font-bold text-xs uppercase tracking-[0.15em]">Contattaci</h4>
              <div className="relative">
                <input
                  type="email"
                  placeholder="La tua email"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                />
                <button
                  onClick={() => router.push("/contatti")}
                  className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <Mail size={15} className="text-purple-600 shrink-0" />
                  <span>info@nvisioninsights.it</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <MapPin size={15} className="text-purple-600 shrink-0" />
                  <span>Innovations Hub, Milano, IT</span>
                </div>
              </div>
            </div>

            {/* Copyright mobile */}
            <div className="flex flex-col items-center gap-3 text-xs text-zinc-500">
              <p className="text-center font-light">
                © {new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
              </p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Globe size={12} className="text-violet-500" />
                  Italiano
                </span>
                <span className="hover:text-violet-600 transition-colors duration-200 cursor-pointer">
                  Supporto
                </span>
              </div>
            </div>
          </div>

          {/* ── DESKTOP LAYOUT (hidden md:block) — IDENTICO ALL'ORIGINALE ── */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

              {/* Brand + Socials */}
              <div className="space-y-6">
                <motion.h3
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vpS}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600"
                >
                  NVision Insights™
                </motion.h3>

                <div className="flex space-x-3">
                  {footerSocials.map(({ Icon }, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      initial={{ scale: 0, opacity: 0, rotate: -180 }}
                      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                      viewport={vpS}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 260,
                        damping: 13,
                      }}
                      className="p-2 bg-zinc-100 rounded-full hover:bg-purple-600 hover:text-white text-zinc-500 transition-all duration-200"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Navigazione */}
              <div>
                <motion.h4
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vpS}
                  transition={{ duration: 0.4 }}
                  className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]"
                >
                  Navigazione
                </motion.h4>

                <ul className="space-y-4 text-sm text-zinc-400 font-light">
                  {footerNavLinks.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={vpS}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        className="text-black hover:text-violet-600 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <motion.h4
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vpS}
                  transition={{ duration: 0.4 }}
                  className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]"
                >
                  Policy &amp; Cookies
                </motion.h4>

                <ul className="space-y-4 text-sm text-zinc-400 font-light">
                  {[
                    { href: "/privacy", label: "Privacy Policy" },
                    { href: "/cookies", label: "Cookie Policy" },
                    { href: "/terms", label: "Termini" },
                  ].map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={vpS}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        className="text-black hover:text-purple-600 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}

                  <motion.li
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={vpS}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-black pt-2 text-xs font-mono"
                  >
                    P.IVA IT 01234567890
                  </motion.li>
                </ul>
              </div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vpS}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h4 className="text-black font-bold text-xs uppercase tracking-[0.15em]">
                  Contattaci
                </h4>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="La tua email"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                  />
                  <button
                    onClick={() => router.push("/contatti")}
                    className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <Mail size={15} className="text-purple-600 shrink-0" />
                    <span>info@nvisioninsights.it</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <MapPin size={15} className="text-purple-600 shrink-0" />
                    <span>Innovations Hub, Milano, IT</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent mb-8" />

            {/* Copyright centrato */}
            <div className="grid grid-cols-3 items-center text-xs text-black font-light mb-4">
              <div />

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                © {new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
              </motion.p>

              <div className="flex justify-end items-center space-x-6 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Globe size={12} className="text-violet-500" />
                  Italiano
                </span>
                <span className="hover:text-violet-600 transition-colors duration-200 cursor-pointer">
                  Supporto
                </span>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}