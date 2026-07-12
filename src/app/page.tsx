/* eslint-disable @next/next/no-img-element */
'use client';

import articlesData from '../../resources/articles.json';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  BarChart3,
  Cpu,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Share2,
  ShieldCheck,
  X,
  Zap,
} from 'lucide-react';

/* ════════════════════════════════════════════════════════════════════════
   1. COSTANTI GLOBALI
   Tutto ciò che non dipende da state/props vive fuori dal componente:
   evita di essere ricreato ad ogni render (micro-ottimizzazione + codice
   più leggibile).
   ════════════════════════════════════════════════════════════════════════ */

// Config viewport per le animazioni whileInView (once:false = si ripetono)
const VP = { once: false, amount: 0.2 } as const;
const VP_SOFT = { once: false, amount: 0.4 } as const;

// Su mobile tutte le durate/i ritardi delle animazioni "decorative" vengono
// moltiplicati per questo fattore: risultato = animazioni ~2x più rapide,
// meno tempo con elementi in transizione => meno lavoro per il main thread
// => INP/FID più bassi. Su desktop il fattore resta 1 (nessuna modifica).
const MOBILE_ANIM_SCALE = 0.5;

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/articoli', label: 'Articoli' },
  { href: '/soluzioni', label: 'Soluzioni' },
  { href: '/chisiamo', label: 'Chi Siamo' },
  { href: '/contatti', label: 'Contattaci' },
] as const;

const FOOTER_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/articoli', label: 'Articoli' },
  { href: '/soluzioni', label: 'Soluzioni' },
  { href: '/chisiamo', label: 'Chi Siamo' },
] as const;

const FOOTER_POLICY_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/terms', label: 'Termini' },
] as const;

const FOOTER_SOCIALS = [
  { Icon: Facebook, type: "facebook" },
  { Icon: Instagram, type: "instagram" },
  { Icon: Share2, type: "share" },
] as const;

// Indici immagini del carosello hero (duplicati per l'effetto loop infinito)
const CAROUSEL_ITEMS = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5] as const;
const CAROUSEL_SPEED_PX_PER_FRAME = 0.8;

// Varianti animazione del menu mobile
const MOBILE_NAV_CONTAINER = {
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
} as const;

const MOBILE_NAV_ITEM = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
} as const;

/* ════════════════════════════════════════════════════════════════════════
   2. HOOK: RILEVAMENTO MOBILE
   Usa matchMedia invece del listener "resize": l'evento "change" scatta
   solo quando si attraversa la soglia dei 768px, non ad ogni pixel di
   ridimensionamento — molto più leggero per il main thread.
   ════════════════════════════════════════════════════════════════════════ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return isMobile;
}
const copyToClipboard = async (text: string) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textarea);

    return success;
  } catch {
    return false;
  }
};

const handleShare = async (url: string, title?: string) => {
  const shareData = {
    title: title ?? "NVision Insights",
    text: title 
      ? `Scopri questo articolo su NVision Insights`
      : "Scopri NVision Insights",
    url,
  };

  try {
    if ("share" in navigator && typeof navigator.share === "function") {
      await navigator.share(shareData);
      return;
    }

    const copied = await copyToClipboard(url);

    if (copied) {
      alert("Link copiato negli appunti!");
    }

  } catch (error) {
    console.log("Condivisione annullata", error);
  }
};

/* ════════════════════════════════════════════════════════════════════════
   3. TITOLI E PARAGRAFI ANIMATI
   Stessa identica animazione grafica di prima. L'unica differenza è che ora
   leggono isMobile internamente e scalano durata/delay con MOBILE_ANIM_SCALE
   quando siamo su mobile — su desktop il risultato è matematicamente
   identico all'originale (scale = 1).
   ════════════════════════════════════════════════════════════════════════ */
const AnimatedTitle = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isMobile = useIsMobile();
  const s = isMobile ? MOBILE_ANIM_SCALE : 1;

  return (
    <div className="relative overflow-visible">
      {/* ① Grande cerchio viola — esplode dalla sinistra */}
      <motion.div
        className="absolute -left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-violet-600 pointer-events-none"
        initial={{ x: -130, scale: 0, opacity: 0 }}
        whileInView={{ x: 0, scale: 1, opacity: [0, 0.9, 0.9, 0] }}
        viewport={VP}
        transition={{ duration: 1.1 * s, times: [0, 0.22, 0.65, 1] }}
      />

      {/* ② Cerchio fuchsia — scende diagonale da destra */}
      <motion.div
        className="absolute right-1/3 -top-5 w-9 h-9 rounded-full bg-fuchsia-500 pointer-events-none"
        initial={{ x: 80, y: -80, scale: 0, opacity: 0 }}
        whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
        viewport={VP}
        transition={{ duration: 1.0 * s, delay: 0.08 * s, times: [0, 0.25, 0.65, 1] }}
      />

      {/* ③ Quadrato viola che ruota piombando dall'alto */}
      <motion.div
        className="absolute left-[44%] -top-4 w-7 h-7 bg-violet-800 pointer-events-none"
        initial={{ y: -100, rotate: -200, scale: 0, opacity: 0 }}
        whileInView={{ y: 0, rotate: 45, scale: 1, opacity: [0, 1, 1, 0] }}
        viewport={VP}
        transition={{ duration: 1.0 * s, delay: 0.14 * s, times: [0, 0.28, 0.65, 1] }}
      />

      {/* ④ Linea di scansione orizzontale */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-400 to-transparent pointer-events-none"
        initial={{ scaleX: 0, originX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: [0, 0.85, 0.85, 0] }}
        viewport={VP}
        transition={{ duration: 0.85 * s, delay: 0.05 * s, times: [0, 0.18, 0.7, 1] }}
      />

      {/* ⑤ Punto bianco — scatta dall'angolo in alto a sinistra */}
      <motion.div
        className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-white pointer-events-none"
        initial={{ x: -50, y: -50, scale: 0, opacity: 0 }}
        whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
        viewport={VP}
        transition={{ duration: 0.8 * s, delay: 0.04 * s, times: [0, 0.3, 0.6, 1] }}
      />

      {/* ⑥ Triangolo — sale dal basso ruotando */}
      <motion.div
        className="absolute right-[26%] bottom-1 w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[20px] border-b-violet-400 pointer-events-none"
        initial={{ y: 70, scale: 0, opacity: 0, rotate: 180 }}
        whileInView={{ y: 0, scale: 1, opacity: [0, 1, 1, 0], rotate: 0 }}
        viewport={VP}
        transition={{ duration: 1.0 * s, delay: 0.18 * s, times: [0, 0.3, 0.65, 1] }}
      />

      {/* ⑦ Orb glow fuchsia — pulsa a destra */}
      <motion.div
        className="absolute -right-10 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-fuchsia-600 blur-3xl pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: [0, 0.45, 0.45, 0] }}
        viewport={VP}
        transition={{ duration: 1.2 * s, times: [0, 0.2, 0.6, 1] }}
      />

      {/* ⑧ Piccolo quadrato viola — scivola da basso-destra */}
      <motion.div
        className="absolute right-16 bottom-0 w-5 h-5 bg-violet-500 pointer-events-none"
        initial={{ x: 40, y: 40, scale: 0, opacity: 0 }}
        whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
        viewport={VP}
        transition={{ duration: 0.8 * s, delay: 0.12 * s, times: [0, 0.3, 0.6, 1] }}
      />

      {/* ⑨ Linea verticale accent */}
      <motion.div
        className="absolute left-[30%] top-0 w-[2px] h-full bg-gradient-to-b from-violet-400 to-transparent pointer-events-none"
        initial={{ scaleY: 0, originY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: [0, 0.6, 0.6, 0] }}
        viewport={VP}
        transition={{ duration: 0.7 * s, delay: 0.1 * s, times: [0, 0.2, 0.7, 1] }}
      />

      {/* ⑩ Micro-cerchio fuchsia basso-sinistra */}
      <motion.div
        className="absolute left-[38%] bottom-0 w-3 h-3 rounded-full bg-fuchsia-400 pointer-events-none"
        initial={{ scale: 0, opacity: 0, y: 20 }}
        whileInView={{ scale: 1, opacity: [0, 1, 1, 0], y: 0 }}
        viewport={VP}
        transition={{ duration: 0.7 * s, delay: 0.22 * s, times: [0, 0.3, 0.65, 1] }}
      />

      {/* ─── TESTO EMERGENTE ───────────────────────────────────────────── */}
      <motion.div
        className={`relative z-10 ${className}`}
        initial={{ opacity: 0, y: 36, filter: 'blur(14px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={VP}
        transition={{ duration: 0.9 * s, delay: 0.52 * s, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const AnimatedParagraph = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isMobile = useIsMobile();
  const s = isMobile ? MOBILE_ANIM_SCALE : 1;

  return (
    <div className="relative overflow-visible">
      {/* ① Dot viola da sinistra */}
      <motion.div
        className="absolute -left-3 top-2 w-3 h-3 rounded-full bg-violet-500 pointer-events-none"
        initial={{ x: -30, scale: 0, opacity: 0 }}
        whileInView={{ x: 0, scale: 1, opacity: [0, 1, 1, 0] }}
        viewport={VP}
        transition={{ duration: 0.7 * s, times: [0, 0.3, 0.65, 1] }}
      />

      {/* ② Dot fuchsia dall'alto-destra */}
      <motion.div
        className="absolute right-1/4 -top-1 w-2.5 h-2.5 rounded-full bg-fuchsia-400 pointer-events-none"
        initial={{ x: 25, y: -20, scale: 0, opacity: 0 }}
        whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
        viewport={VP}
        transition={{ duration: 0.6 * s, delay: 0.06 * s, times: [0, 0.3, 0.65, 1] }}
      />

      {/* ③ Mini quadrato che si srotola */}
      <motion.div
        className="absolute left-1/4 bottom-1 w-2.5 h-2.5 bg-violet-700 pointer-events-none"
        initial={{ scale: 0, opacity: 0, rotate: -45 }}
        whileInView={{ scale: 1, opacity: [0, 0.8, 0.8, 0], rotate: 0 }}
        viewport={VP}
        transition={{ duration: 0.6 * s, delay: 0.1 * s, times: [0, 0.3, 0.65, 1] }}
      />

      {/* ④ Sottile sottolineatura che si disegna da sinistra */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-violet-400/40 to-transparent pointer-events-none"
        initial={{ scaleX: 0, originX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: [0, 0.7, 0.7, 0] }}
        viewport={VP}
        transition={{ duration: 0.8 * s, delay: 0.08 * s, times: [0, 0.2, 0.7, 1] }}
      />

      {/* ⑤ Soft glow */}
      <motion.div
        className="absolute right-1/3 bottom-0 w-8 h-8 rounded-full bg-violet-500 blur-lg pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: [0, 0.4, 0.4, 0] }}
        viewport={VP}
        transition={{ duration: 0.8 * s, delay: 0.15 * s, times: [0, 0.3, 0.65, 1] }}
      />

      {/* ─── TESTO EMERGENTE ───────────────────────────────────────────── */}
      <motion.div
        className={`relative z-10 ${className}`}
        initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={VP}
        transition={{ duration: 0.8 * s, delay: 0.38 * s, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   4. SFONDO "RETE NEURALE" (canvas)
   Questo era il principale colpevole del lag: 100 punti => fino a 4950
   coppie testate ad ogni frame, 60 volte al secondo, anche quando la
   sezione non era visibile. Ottimizzazioni (tutte "invisibili": il
   risultato visivo su desktop resta identico):
     - meno punti su mobile (40 invece di 100)
     - distanza confrontata al quadrato (niente Math.sqrt finché non serve)
     - animazione in pausa quando il canvas non è in viewport
     - su mobile il canvas disegna a ~30fps invece che ~60fps
   ════════════════════════════════════════════════════════════════════════ */
const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobileView = window.innerWidth < 768;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Meno nodi su mobile: riduce drasticamente il costo O(n²) dei collegamenti
    const POINT_COUNT = isMobileView ? 40 : 100;
    const CONNECT_DIST = 120;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
    const LINE_WIDTH = isMobileView ? 0.9 : 0.6;

    const points = Array.from({ length: POINT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    let animFrameId: number;
    let isRunning = true;
    let frameCounter = 0;

    const draw = () => {
      if (!isRunning) return;

      frameCounter++;
      // Su mobile disegniamo solo 1 frame su 2 (~30fps): dimezza il carico
      // sulla CPU senza che l'occhio percepisca differenze significative.
      if (!isMobileView || frameCounter % 2 === 0) {
        ctx.clearRect(0, 0, width, height);

        points.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(139,92,246,0.9)';
          ctx.fill();
        });

        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distSq = dx * dx + dy * dy;

            // Confronto al quadrato: evita Math.sqrt per le coppie troppo
            // lontane, che sono la stragrande maggioranza.
            if (distSq < CONNECT_DIST_SQ) {
              const dist = Math.sqrt(distSq);
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              const alpha = 1 - dist / CONNECT_DIST;
              ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
              ctx.lineWidth = LINE_WIDTH;
              ctx.stroke();
            }
          }
        }
      }

      animFrameId = requestAnimationFrame(draw);
    };

    animFrameId = requestAnimationFrame(draw);

    // Mette in pausa il canvas quando esce dal viewport (es. utente ha
    // scrollato oltre l'hero): stesso identico aspetto quando è visibile,
    // ma zero consumo CPU/batteria quando non lo è.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isRunning = entry.isIntersecting;
        if (isRunning) {
          animFrameId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animFrameId);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

/* ════════════════════════════════════════════════════════════════════════
   5. UTILITY
   ════════════════════════════════════════════════════════════════════════ */
const parseItalianDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

/* ════════════════════════════════════════════════════════════════════════
   6. COMPONENTE PRINCIPALE
   ════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // Fattore di velocità applicato alle animazioni della hero: su desktop
  // vale 1 (nessun cambiamento rispetto all'originale), su mobile dimezza
  // durate e ritardi così il contenuto (incluso il testo dell'LCP) appare
  // prima e con meno lavoro di animazione in corso.
  const heroScale = isMobile ? 0.5 : 1;

  /* ── Carosello hero (drag mouse + touch, loop infinito via rAF) ───────── */
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isDraggingHero = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const hasDragged = useRef(false);
  const touchStartX = useRef(0);
  const touchStartPos = useRef(0);

  const startAnimation = () => {
    const tick = () => {
      if (!trackRef.current) return;
      const halfWidth = trackRef.current.scrollWidth / 2;
      positionRef.current -= CAROUSEL_SPEED_PX_PER_FRAME;
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
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartPos.current = positionRef.current;
  };

  const onHeroMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingHero.current || !trackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let newPos = dragStartPos.current + dx;
    if (newPos > 0) newPos -= halfWidth;
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
    hasDragged.current = false;
    touchStartX.current = e.touches[0].clientX;
    touchStartPos.current = positionRef.current;
  };

  const onHeroTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let newPos = touchStartPos.current + dx;
    if (newPos > 0) newPos -= halfWidth;
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

  /* ── Dati: ultimi 3 articoli pubblicati da resources/articles.json ───── */
  const articoli = useMemo(
    () =>
      [...articlesData]
        .sort((a, b) => parseItalianDate(b.publicationDate) - parseItalianDate(a.publicationDate))
        .slice(0, 3),
    []
  );

  /* ── Dati: card "Soluzioni" (dipendono da isMobile per la direzione
     d'ingresso dell'animazione, quindi restano memoizzate su quella dep) ── */
  const soluzioni = useMemo(
    () => [
      {
        id: 1,
        title: 'AI & Machine Learning',
        desc: 'Sviluppiamo algoritmi predittivi per trasformare i dati in decisioni automatizzate.',
        icon: <Cpu className="text-violet-400" size={28} />,
        size: 'md:col-span-2',
        enterFrom: { x: isMobile ? 0 : -40, y: isMobile ? 40 : 0 },
      },
      {
        id: 2,
        title: 'Data Analytics',
        desc: 'Visualizzazione avanzata dei flussi informativi aziendali.',
        icon: <BarChart3 className="text-violet-400" size={28} />,
        size: 'md:col-span-1',
        enterFrom: { x: isMobile ? 0 : 20, y: isMobile ? 40 : 0 },
      },
      {
        id: 3,
        title: 'Cloud Strategy',
        desc: 'Infrastrutture scalabili e resilienti per il business moderno.',
        icon: <Zap className="text-violet-400" size={28} />,
        size: 'md:col-span-1',
        enterFrom: { x: isMobile ? 0 : -30, y: isMobile ? 40 : 0 },
      },
      {
        id: 4,
        title: 'Cyber Security',
        desc: 'Protezione end-to-end degli asset digitali e conformità normativa.',
        icon: <ShieldCheck className="text-violet-400" size={28} />,
        size: 'md:col-span-2',
        enterFrom: { x: 0, y: 40 },
      },
    ],
    [isMobile]
  );

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans">
      {/* ────────────────────────────────────────────────────────────────
          BLOCCO ASPETTO FISSO (light/dark mode di sistema ignorato)
          "color-scheme: dark" dice esplicitamente al browser/OS di NON
          reinterpretare i colori nativi (input, scrollbar, select, ecc.)
          in base al tema chiaro/scuro del telefono: il sito resta sempre
          uguale a se stesso, indipendentemente dal tema di Android/iOS.
          Nota: per un blocco ancora più robusto a livello di intera app,
          aggiungi anche in app/layout.tsx:
            export const metadata = { colorScheme: 'dark', themeColor: '#000000' }
          ──────────────────────────────────────────────────────────────── */}
      <style
        // Nota: usiamo un <style> "puro" (dangerouslySetInnerHTML) e NON
        // <style jsx>, perché styled-jsx riscrive tutti i className del file
        // in stringhe JS normali — e i className multi-riga già presenti nel
        // file (es. il pannello del menu mobile) diventano stringhe con
        // newline non escapati, causando un errore di build ("Unterminated
        // string constant"). Questo tag equivalente evita il problema.
        dangerouslySetInnerHTML={{
          __html: `
            :root { color-scheme: dark; }
            html, body { background-color: #000; color-scheme: dark; }
          `,
        }}
      />

      {/* ─── NAVBAR ────────────────────────────────────────────────────── */}
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
            <Link href="/contatti" className="text-white/70 hover:text-white transition-colors duration-300">Contattaci</Link>
          </nav>
        </div>

        {/* ─── MOBILE NAV — vetro nero opaco, stato attivo bianco ─────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              variants={MOBILE_NAV_CONTAINER}
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
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);

                    return (
                      <motion.li key={link.href} variants={MOBILE_NAV_ITEM}>
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
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-center" />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
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
          transition={{ duration: 0.9 * heroScale }}
          className="max-w-4xl mx-auto z-10"
        >
          {/* ── TITOLO ANIMATO ── */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2 * heroScale, delay: 0.9 * heroScale, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.5 * heroScale, delay: 1.2 * heroScale }}
            className="text-[1.12rem] sm:text-xl text-white max-w-2xl mx-auto mb-20 leading-relaxed font-light"
          >
            Tecnologia, divulgazione e innovazione progettate per la <b>prossima generazione di leader digitali.</b>
          </motion.p>
        </motion.div>

        {/* ── CAROSELLO — MOBILE: più grande, touch drag funzionante ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 * heroScale, delay: 1 * heroScale }}
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

      {/* ─── SEZIONE ARTICOLI ──────────────────────────────────────────── */}
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

          {/* Cards — identiche a quelle della pagina /articoli */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articoli.map((article) => {
              const shareUrl = `https://nvisioninsights.it/articoli/${article.slug}`;

              return (
                <motion.div
                  key={article.slug}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-slate-100"
                >
                  {/* Immagine con Overlay */}
                  <div className="relative h-56 overflow-hidden group">
                    <Link href={`/articoli/${article.slug}`} className="block h-full">
                      <img
                        src={article.images?.[0]?.src}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </Link>

                    <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent pointer-events-none" />

                    <div className="absolute top-4 right-4 bg-violet-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest shadow-lg">
                      {article.publicationDate}
                    </div>
                  </div>

                  {/* Contenuto Card */}
                  <div className="p-8 flex flex-col flex-grow">
                    {article.category && (
                      <span className="inline-block mb-3 bg-violet-50 text-violet-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-violet-100">
                        {article.category}
                      </span>
                    )}

                    <h4 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-violet-600 transition-colors leading-tight tracking-tight">
                      <Link href={`/articoli/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                      {article.excerpt}
                    </p>

                    {/* Footer Card */}
                    <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-100">
                      <Link
                        href={`/articoli/${article.slug}`}
                        className="flex items-center gap-2 text-violet-600 hover:text-violet-800 font-bold text-sm uppercase tracking-wider transition-all group/link"
                      >
                        Leggi di più{" "}
                        <ArrowRight
                          size={16}
                          className="group-hover/link:translate-x-1 transition-transform"
                        />
                      </Link>

                      <div className="flex items-center gap-4 text-slate-400">
                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-violet-700 cursor-pointer transition-colors"
                        >
                          <Facebook size={18} />
                        </a>


                        {/* Instagram */}
                        <button
                          onClick={async () => {
                            await copyToClipboard(shareUrl);
                            window.open(
                              "https://www.instagram.com/",
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                          className="hover:text-violet-700 cursor-pointer transition-colors"
                        >
                          <Instagram size={18} />
                        </button>


                        {/* Condivisione nativa */}
                        <button
                          onClick={() => handleShare(shareUrl, article.title)}
                          className="hover:text-violet-700 cursor-pointer transition-colors"
                        >
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-zinc-950 text-white font-bold text-sm hover:bg-violet-500 transition-all duration-300 shadow-xl hover:shadow-violet-400/30 hover:shadow-2xl"
            >
              Tutti Gli Articoli <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── SEZIONE SOLUZIONI ─────────────────────────────────────────── */}
      <section id="soluzioni" className="py-24 bg-zinc-950 relative overflow-hidden">
        {/* Sfondi sfumati dinamici con animazione float continua per una maggiore profondità visiva */}
        <motion.div 
          animate={{ y: [0, -25, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-700/15 rounded-full blur-[140px] pointer-events-none" 
        />
        <motion.div 
          animate={{ y: [0, 25, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-700/10 rounded-full blur-[120px] pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header + pulsante */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-3xl">
              <AnimatedTitle className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6 whitespace-nowrap">
                Le Nostre{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400">
                    Soluzioni
                  </span>
                </span>
              </AnimatedTitle>

              <AnimatedParagraph className="text-white/80 md:text-xl leading-relaxed font-light balance max-w-2xl">
                Risolviamo la complessità trasformandola in opportunità concrete. Uniamo visione strategica, ecosistemi digitali evoluti e una conoscenza tecnica d&apos;eccellenza per guidare la crescita del tuo business verso il futuro.
              </AnimatedParagraph>
            </div>

            {/* Il pulsante vola da destra con micro-interazioni potenziate */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn bg-white text-black px-12 py-4 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center h-fit w-fit shadow-lg relative overflow-hidden"
            >
              <Link href="/soluzioni" className="text-black group-hover/btn:text-white transition-colors duration-300 flex items-center">
                Tutte Le Soluzioni
              </Link>
              <ArrowRight className="ml-2 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" size={20} />
            </motion.button>
          </div>

          {/* Badge "Tecnologia & Innovazione" — pop con spring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 0.25, duration: 0.6, type: 'spring', stiffness: 260, damping: 14 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Tecnologia &amp; Innovazione
          </motion.div>

          {/* Grid soluzioni — MOBILE: animazioni sempre dal basso */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {soluzioni.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: item.enterFrom.x, y: item.enterFrom.y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.015, y: -4 }}
                className={`group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/8 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-violet-500/40 hover:shadow-[0_25px_60px_rgba(139,92,246,0.15)] ${item.size || ''}`}
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
                    {/* Icona con anello espandente reattivo */}
                    <div className="relative mb-6 w-fit">
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-violet-500 pointer-events-none"
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: [0.5, 1.6, 2.2], opacity: [0, 0.7, 0] }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{ duration: 1.1, delay: i * 0.1 + 0.35 }}
                      />
                      <div className="p-3 bg-violet-500/10 w-fit rounded-2xl border border-violet-500/20 group-hover:scale-110 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all duration-300 ease-out">
                        {item.icon}
                      </div>
                    </div>

                    {/* Titolo e Descrizione con transizioni cromatiche coordinate */}
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-violet-300 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-white/70 leading-relaxed text-base font-light group-hover:text-white/90 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>

                  {/* Link di approfondimento con comparsa fluida e slittamento sull'asse Y */}
                  <div className="mt-8 flex items-center text-xs font-bold text-violet-400 tracking-widest uppercase opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <Link href="/soluzioni" className="flex items-center group/link">
                      Scopri di più
                      <ArrowRight className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" size={14} />
                    </Link>
                  </div>
                </div>

                {/* Sfera luminosa d'angolo che si espande e si accende all'hover */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl group-hover:bg-violet-500/20 group-hover:scale-125 transition-all duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ─── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="relative mt-auto border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-6 relative z-10">
          {/*
            ─── MOBILE FOOTER: layout completamente ridisegnato ────────────
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
                viewport={VP_SOFT}
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
                {FOOTER_SOCIALS.map(({ Icon, type }, i) => (
                  <motion.button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();

                      const siteUrl = "https://nvisioninsights.it/";

                      if (type === "facebook") {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            siteUrl
                          )}`,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }

                      if (type === "instagram") {
                        copyToClipboard(siteUrl);

                        window.open(
                          "https://www.instagram.com/",
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }

                      if (type === "share") {
                        handleShare(siteUrl);
                      }
                    }}
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={VP_SOFT}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 13,
                    }}
                    className="p-3 bg-zinc-100 rounded-full hover:bg-purple-600 hover:text-white text-zinc-600 transition-all duration-200 shadow-sm"
                  >
                    <Icon size={20} />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Navigazione + Policy su due colonne affiancate */}
            <div className="grid grid-cols-2 gap-8 pb-8 border-b border-zinc-200">
              <div>
                <h4 className="text-black font-bold mb-4 text-xs uppercase tracking-[0.15em]">Navigazione</h4>
                <ul className="space-y-3 text-sm">
                  {FOOTER_NAV_LINKS.map((item) => (
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
                  {FOOTER_POLICY_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-zinc-600 hover:text-purple-600 transition-colors duration-200 font-light">
                        {item.label}
                      </Link>
                    </li>
                  ))}

                  {/* <li className="text-zinc-400 text-xs font-mono pt-1">P.IVA IT 01234567890</li> */}
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
                  onClick={() => router.push('/contatti')}
                  className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <Mail size={15} className="text-purple-600 shrink-0" />
                  <span>info.nvisioninsights@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <MapPin size={15} className="text-purple-600 shrink-0" />
                  <span>Catania, Sicily, IT</span>
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
                  viewport={VP_SOFT}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600"
                >
                  NVision Insights™
                </motion.h3>

                <div className="flex space-x-3">
                  {FOOTER_SOCIALS.map(({ Icon, type }, i) => (
                    <motion.a
                      key={i}
                      href={
                        type === "facebook"
                          ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              "https://nvisioninsights.it/"
                            )}`
                          : "#"
                      }
                      target={type === "facebook" ? "_blank" : undefined}
                      rel={type === "facebook" ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (type === "instagram") {
                          e.preventDefault();

                          navigator.clipboard.writeText("https://nvisioninsights.it/");
                          window.open("https://www.instagram.com/", "_blank");
                        }

                        if (type === "share") {
                          e.preventDefault();

                          handleShare("https://nvisioninsights.it/");
                        }
                      }}
                      initial={{ scale: 0, opacity: 0, rotate: -180 }}
                      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                      viewport={VP_SOFT}
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
                  viewport={VP_SOFT}
                  transition={{ duration: 0.4 }}
                  className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]"
                >
                  Navigazione
                </motion.h4>

                <ul className="space-y-4 text-sm text-zinc-400 font-light">
                  {FOOTER_NAV_LINKS.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VP_SOFT}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <Link href={item.href} className="text-black hover:text-violet-600 transition-colors duration-200">
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
                  viewport={VP_SOFT}
                  transition={{ duration: 0.4 }}
                  className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]"
                >
                  Policy &amp; Cookies
                </motion.h4>

                <ul className="space-y-4 text-sm text-zinc-400 font-light">
                  {FOOTER_POLICY_LINKS.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VP_SOFT}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <Link href={item.href} className="text-black hover:text-purple-600 transition-colors duration-200">
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}

                  <motion.li
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VP_SOFT}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-black pt-2 text-xs font-mono"
                  >
                    {/* P.IVA IT 01234567890 */}
                  </motion.li>
                </ul>
              </div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP_SOFT}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h4 className="text-black font-bold text-xs uppercase tracking-[0.15em]">Contattaci</h4>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="La tua email"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                  />
                  <button
                    onClick={() => router.push('/contatti')}
                    className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <Mail size={15} className="text-purple-600 shrink-0" />
                    <span>info.nvisioninsights@gmail.com</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <MapPin size={15} className="text-purple-600 shrink-0" />
                    <span>Catania, Sicily, IT</span>
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