/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  Linkedin,
  Twitter,
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
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // ─── CAROSELLO HERO ───────────────────────────────────────────────────────────
  const trackRef       = useRef<HTMLDivElement>(null);
  const positionRef    = useRef(0);
  const rafRef         = useRef<number | null>(null);
  const isDraggingHero = useRef(false);
  const dragStartX     = useRef(0);
  const dragStartPos   = useRef(0);
  const hasDragged     = useRef(false);
  const SPEED          = 0.8;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleImageClick = () => {
    if (!hasDragged.current) router.push('/articoli');
  };

  // ─── DATI ARTICOLI ────────────────────────────────────────────────────────────
  const articoli = [
    {
      id: 1,
      anno: 2025,
      categoria: 'Intelligenza Artificiale',
      titolo: "L'evoluzione dell'AI nel 2025",
      desc: "Un'analisi dettagliata su come le nuove architetture trasformeranno il lavoro creativo.",
      gradientFrom: 'from-violet-600',
      gradientTo: 'to-purple-900',
      accent: 'bg-violet-100 text-violet-700',
      tag: '#AI',
      delay: 0,
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
    },
    {
      id: 3,
      anno: 2027,
      categoria: 'Future Tech',
      titolo: "L'evoluzione dell'AI nel 2027",
      desc: 'Scenari futuri e paradigmi emergenti: come prepararsi alla prossima rivoluzione tecnologica.',
      gradientFrom: 'from-purple-700',
      gradientTo: 'to-violet-950',
      accent: 'bg-purple-100 text-purple-700',
      tag: '#Future',
      delay: 0.24,
    },
  ];

  // ─── DATI SOLUZIONI ───────────────────────────────────────────────────────────
  const soluzioni = [
    {
      id: 1,
      title: 'AI & Machine Learning',
      desc: 'Sviluppiamo algoritmi predittivi per trasformare i dati in decisioni automatizzate.',
      icon: <Cpu className="text-violet-400" size={28} />,
      size: 'md:col-span-2',
    },
    {
      id: 2,
      title: 'Data Analytics',
      desc: 'Visualizzazione avanzata dei flussi informativi aziendali.',
      icon: <BarChart3 className="text-violet-400" size={28} />,
      size: 'md:col-span-1',
    },
    {
      id: 3,
      title: 'Cloud Strategy',
      desc: 'Infrastrutture scalabili e resilienti per il business moderno.',
      icon: <Zap className="text-violet-400" size={28} />,
      size: 'md:col-span-1',
    },
    {
      id: 4,
      title: 'Cyber Security',
      desc: 'Protezione end-to-end degli asset digitali e conformità normativa.',
      icon: <ShieldCheck className="text-violet-400" size={28} />,
      size: 'md:col-span-2',
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans">

      {/* ─── NAVBAR ──────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/8 shadow-[0_0_40px_rgba(139,92,246,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 select-none">
            <Link href="/" >NVision Insights™</Link>
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

        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-zinc-950/98 backdrop-blur-xl px-6 py-8 space-y-5 border-t border-white/10 shadow-2xl z-40 rounded-b-2xl"
          >
            <Link href="/" className="block text-violet-400 text-xl font-bold">Home</Link>
            <Link href="/articoli" className="block text-white text-xl hover:text-violet-300 transition">Articoli</Link>
            <Link href="/soluzioni" className="block text-white text-xl hover:text-violet-300 transition">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white text-xl hover:text-violet-300 transition">Chi Siamo</Link>
            <Link href="/contatti" className="block text-white text-xl hover:text-violet-300 transition">Contatti</Link>
          </motion.nav>
        )}
      </header>

      {/* ─── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 pb-16 min-h-[60vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 relative overflow-hidden bg-black">
        {/* Luci ambientali violette */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-700/25 blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-fuchsia-800/10 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl mx-auto z-10"
        >

          <h2 className="text-center text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-8">
            NVision{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-violet-500 to-violet-300">
              Insights
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Tecnologia, divulgazione e innovazione progettate per la prossima generazione di leader digitali.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="overflow-hidden w-full max-w-full py-4 select-none"
          onMouseDown={onHeroMouseDown}
          onMouseMove={onHeroMouseMove}
          onMouseUp={onHeroMouseUpOrLeave}
          onMouseLeave={onHeroMouseUpOrLeave}
          style={{ cursor: isDraggingHero.current ? 'grabbing' : 'grab' }}
        >
          <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
              <div
                key={index}
                onClick={handleImageClick}
                className="min-w-[70vw] sm:min-w-[55vw] md:min-w-[33vw] rounded-3xl overflow-hidden shadow-2xl shadow-violet-900/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-violet-700/40 cursor-pointer ring-1 ring-white/5"
              >
                <img
                  src={`/carousel/img${i}.jpg`}
                  alt={`Immagine ${i}`}
                  draggable={false}
                  className="w-full h-44 sm:h-52 md:h-72 object-cover pointer-events-none"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── SEZIONE ARTICOLI ─────────────────────────────────────────────────────── */}
      <section id="articoli" className="py-24 bg-white text-black relative overflow-hidden">
        {/* Blob decorativi */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-violet-100 opacity-70 blur-3xl" />
          <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full bg-fuchsia-100 opacity-50 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-purple-100 opacity-40 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header sezione */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black text-zinc-950 tracking-tighter mb-4 leading-none">
              Ultimi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
                Articoli
              </span>
            </h2>
            <p className="text-black/70 max-w-xl mx-auto text-lg leading-relaxed font-light">
              Approfondimenti tech e analisi essenziali per restare al passo con il mondo che cambia.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {articoli.map((art) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: art.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-violet-200/60 transition-all duration-500 bg-white border border-zinc-100 flex flex-col"
              >
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
                  <h4 className="text-xl font-black text-zinc-900 mb-3 leading-tight group-hover:text-violet-700 transition-colors duration-300">
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

                {/* Bordo inferiore animato */}
                <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${art.gradientFrom} ${art.gradientTo} transition-all duration-500`} />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-14"
          >
            <Link
              href="/articoli"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-950 text-white font-bold text-sm hover:bg-violet-700 transition-all duration-300 shadow-xl hover:shadow-violet-400/30 hover:shadow-2xl"
            >
              Tutti gli articoli <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── SEZIONE SOLUZIONI ───────────────────────────────────────────────────── */}
      <section id="soluzioni" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-700/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-700/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
                Le Nostre{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400">
                  Soluzioni
                </span>
              </h2>
              
              <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light">
                Uniamo visione strategica e conoscenza tecnica d&apos;eccellenza.
              </p>
              
            </div>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-violet-500 hover:text-white transition-all duration-300 flex items-center h-fit w-fit shadow-lg">
              Tutte le soluzioni <ArrowRight className="ml-2" size={20} />
            </button>
          </div>

          {/* Pillola badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Tecnologia & Innovazione
              </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {soluzioni.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 0.985 }}
                className={`group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/8 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/[0.07] hover:border-violet-500/40 hover:shadow-[0_0_60px_rgba(139,92,246,0.12)] ${item.size}`}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6 p-3 bg-violet-500/10 w-fit rounded-2xl border border-violet-500/20 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">{item.title}</h4>
                    <p className="text-white/90 leading-relaxed text-base font-light">{item.desc}</p>
                  </div>
                  <div className="mt-8 flex items-center text-xs font-bold text-violet-400 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Scopri di più <ArrowRight className="ml-2" size={14} />
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-violet-500/8 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER BIANCO ───────────────────────────────────────────────────────── */}
      <footer className="relative mt-auto border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-5 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600">
                NVision Insights™
              </h3>

              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-zinc-100 rounded-full hover:bg-violet-600 hover:text-white text-zinc-500 transition-all duration-200">
                  <Facebook size={18} />
                </a>
                <a href="#" className="p-2 bg-zinc-100 rounded-full hover:bg-violet-600 hover:text-white text-zinc-500 transition-all duration-200">
                  <Youtube size={18} />
                </a>
                <a href="#" className="p-2 bg-zinc-100 rounded-full hover:bg-violet-600 hover:text-white text-zinc-500 transition-all duration-200">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Navigazione */}
            <div>
              <h4 className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]">Navigazione</h4>
              <ul className="space-y-4 text-sm text-zinc-400 font-light">
                <li><Link href="/" className="text-black hover:text-violet-600 transition-colors duration-200">Home</Link></li>
                <li><Link href="/articoli" className="text-black hover:text-violet-600 transition-colors duration-200">Articoli</Link></li>
                <li><Link href="/soluzioni" className="text-black hover:text-violet-600 transition-colors duration-200">Soluzioni</Link></li>
                <li><Link href="/chisiamo" className="text-black hover:text-violet-600 transition-colors duration-200">Chi Siamo</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]">Policy & Cookies</h4>
              <ul className="space-y-4 text-sm text-zinc-400 font-light">
                <li><Link href="/privacy" className="text-black hover:text-violet-600 transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-black hover:text-violet-600 transition-colors duration-200">Cookie Policy</Link></li>
                <li><Link href="/terms" className="text-black hover:text-violet-600 transition-colors duration-200">Termini</Link></li>
                <li className="text-black pt-2 text-xs font-mono">P.IVA IT 01234567890</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h4 className="text-black font-bold text-xs uppercase tracking-[0.15em]">Contattaci</h4>
              <div className="relative">
                <input
                  type="email"
                  placeholder="La tua email"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                />
                <button className="absolute right-2 top-2 bg-violet-600 hover:bg-violet-500 p-1.5 rounded-lg transition-colors duration-200 text-white">
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="space-y-3 pt-1">
                <div className="flex items-center space-x-3 text-sm text-black font-light">
                  <Mail size={15} className="text-violet-600 shrink-0" />

                  <span>info@nvisioninsights.it</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-black font-light">
                  <MapPin size={15} className="text-violet-600 shrink-0" />
                  <span>Innovations Hub, Milano, IT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divisore con accento violetto */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent mb-8" />
          <p className="text-xs text-black font-light text-center">
              © {new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
            </p>
          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            <div className="flex items-center justify-end ml-auto space-x-6 text-xs text-zinc-400">
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
      </footer>

    </main>
  );
}