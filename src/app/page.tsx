/* eslint-disable @next/next/no-img-element */
'use client';

// IMPORTAZIONI
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {

  // STATI PER IL MENU MOBILE
  const [menuOpen, setMenuOpen] = useState(false);

  // ROUTER PER NAVIGAZIONE PROGRAMMATICA
  const router = useRouter();

  // ─── CAROSELLO HERO: LOOP INFINITO + DRAG ───────────────────────────────────
  const trackRef        = useRef<HTMLDivElement>(null);
  const positionRef     = useRef(0);           // posizione corrente in px
  const rafRef          = useRef<number | null>(null);
  const isDraggingHero  = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartPos    = useRef(0);
  const hasDragged      = useRef(false);
  const SPEED           = 0.8;                 // px per frame

  /** Avvia (o riprende) l'animazione automatica */
  const startAnimation = () => {
    const tick = () => {
      if (!trackRef.current) return;
      const halfWidth = trackRef.current.scrollWidth / 2;
      positionRef.current -= SPEED;
      // wrap seamless: quando si supera la metà, si salta indietro di halfWidth
      if (positionRef.current <= -halfWidth) {
        positionRef.current += halfWidth;
      }
      trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  /** Ferma l'animazione automatica */
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

  // Mousedown: inizia drag, ferma auto-scroll
  const onHeroMouseDown = (e: React.MouseEvent) => {
    stopAnimation();
    isDraggingHero.current = true;
    hasDragged.current     = false;
    dragStartX.current     = e.clientX;
    dragStartPos.current   = positionRef.current;
  };

  // Mousemove: sposta il track manualmente
  const onHeroMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingHero.current || !trackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) hasDragged.current = true;

    const halfWidth = trackRef.current.scrollWidth / 2;
    let newPos = dragStartPos.current + dx;

    // wrap in entrambe le direzioni
    if (newPos > 0)              newPos -= halfWidth;
    if (newPos <= -halfWidth)    newPos += halfWidth;

    positionRef.current = newPos;
    trackRef.current.style.transform = `translateX(${newPos}px)`;
  };

  // Mouseup / Mouseleave dal wrapper: riprende auto-scroll
  const onHeroMouseUpOrLeave = () => {
    if (isDraggingHero.current) {
      isDraggingHero.current = false;
      startAnimation();
    }
  };

  // Click su immagine: naviga solo se non era un drag
  const handleImageClick = () => {
    if (!hasDragged.current) {
      router.push('/articoli');
    }
  };
  // ────────────────────────────────────────────────────────────────────────────

  // STATI E REFERENZE PER IL CAROSELLO DRAGGABILE (articoli/soluzioni mobile)
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX]         = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const onMouseLeaveOrUp = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x    = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };


  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white font-sans">

      {/* ---------------------------------------------------------
          NAVBAR / HEADER
      --------------------------------------------------------- */}
      <header className="fixed top-0 w-full z-50 bg-blue-900/40 backdrop-blur-xl border-b border-blue-400/20 shadow-[0_0_20px_rgba(0,0,80,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white drop-shadow-lg select-none">
            NVision Insights™
          </h1>

          {/* MENU (MOBILE) */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* NAVIGAZIONE (DESKTOP) */}
          <nav className="hidden md:flex space-x-10 text-lg font-light">
            <Link href="/"          className="text-blue-300 font-medium">Home</Link>
            <Link href="/articoli"  className="hover:text-blue-300 transition">Articoli</Link>
            <Link href="/soluzioni" className="hover:text-blue-300 transition">Soluzioni</Link>
            <Link href="/chisiamo"  className="hover:text-blue-300 transition">Chi siamo</Link>
            <Link href="/contatti"  className="hover:text-blue-300 transition">Contatti</Link>
          </nav>
        </div>

        {/* MENU A DISCESA (MOBILE) */}
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-blue-950/95 backdrop-blur-xl px-6 py-8 space-y-4 border-t border-blue-400/20 shadow-xl z-40 rounded-b-2xl"
          >
            <Link href="/"          className="block text-blue-300 text-xl font-bold">Home</Link>
            <Link href="/articoli"  className="block text-white text-xl hover:text-blue-300 transition">Articoli</Link>
            <Link href="/soluzioni" className="block text-white text-xl hover:text-blue-300 transition">Soluzioni</Link>
            <Link href="/chisiamo"  className="block text-white text-xl hover:text-blue-300 transition">Chi siamo</Link>
            <Link href="/contatti"  className="block text-white text-xl hover:text-blue-300 transition">Contatti</Link>
          </motion.nav>
        )}
      </header>


      {/* ---------------------------------------------------------
          SEZIONE HERO
      --------------------------------------------------------- */}
      <section
        id="home"
        className="pt-28 sm:pt-32 pb-16 min-h-[60vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 from-blue-950 via-black to-blue-900 relative"
      >
        {/* TESTI INTRODUTTIVI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-center text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8">
            NVision Insights
          </h2>
          <p className="text-lg sm:text-xl md:text-xl text-blue-200 max-w-2xl mx-auto mb-5 sm:mb-7 leading-relaxed">
            Tecnologia, divulgazione e innovazione progettate per la prossima generazione.
          </p>
        </motion.div>

        {/* ── CAROSELLO HERO: LOOP INFINITO + DRAG + CLICK ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="overflow-hidden w-full max-w-full py-4 select-none"
          // eventi sul WRAPPER: gestiscono drag e ripresa auto-scroll
          onMouseDown={onHeroMouseDown}
          onMouseMove={onHeroMouseMove}
          onMouseUp={onHeroMouseUpOrLeave}
          onMouseLeave={onHeroMouseUpOrLeave}
          style={{ cursor: isDraggingHero.current ? 'grabbing' : 'grab' }}
        >
          {/*
            Track duplicato [1..5, 1..5].
            La posizione è gestita interamente via JS (translateX inline).
            will-change ottimizza il repaint.
          */}
          <div
            ref={trackRef}
            className="flex gap-4 w-max will-change-transform"
          >
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
              <div
                key={index}
                onClick={handleImageClick}
                className="min-w-[70vw] sm:min-w-[55vw] md:min-w-[33vw] rounded-3xl overflow-hidden shadow-2xl
                           transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
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


      {/* ---------------------------------------------------------
          SEZIONE ULTIMI ARTICOLI
      --------------------------------------------------------- */}
      <section id="articoli" className="py-14 sm:py-20 bg-gray-100 text-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6"
        >
          {/* INTESTAZIONE SEZIONE */}
          <h2 className="text-center text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-8">
            Ultimi Articoli
          </h2>
          <p className="text-center mb-8 sm:mb-12 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Approfondimenti tech e analisi essenziali.
          </p>

          {/* VISUALIZZAZIONE MOBILE (CAROSELLO) */}
          <div
            className="md:hidden overflow-x-auto w-full whitespace-nowrap py-4 flex gap-4 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {[1, 2, 3].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="inline-block min-w-[85%] rounded-2xl bg-white p-5 sm:p-8 shadow-lg border border-gray-200 relative overflow-hidden transition-all before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500 hover:before:bg-blue-700 before:transition-all before:duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              >
                <h4 className="text-xl sm:text-2xl font-semibold mb-3">Titolo Articolo {id}</h4>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Overview rapida dell&apos;articolo {id} con contenuti rilevanti.
                </p>
              </motion.div>
            ))}
          </div>

          {/* VISUALIZZAZIONE DESKTOP (GRIGLIA) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {[1, 2, 3].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="rounded-2xl bg-white p-5 sm:p-8 shadow-lg border border-gray-200 relative overflow-hidden transition-all before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500 hover:before:bg-blue-700 before:transition-all before:duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              >
                <h4 className="text-xl sm:text-2xl font-semibold mb-3">Titolo Articolo {id}</h4>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Overview rapida dell&apos;articolo {id} con contenuti rilevanti.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* ---------------------------------------------------------
          SEZIONE SOLUZIONI TECH
      --------------------------------------------------------- */}
      <section id="soluzioni" className="py-14 sm:py-24 bg-gradient-to-br from-blue-950 to-black text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,140,255,0.25),transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20"
        >
          {/* INTESTAZIONE SEZIONE */}
          <h2 className="text-center text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8">
            Soluzioni Tech
          </h2>
          <p className="text-center mb-8 sm:mb-12 text-blue-300 text-base sm:text-lg max-w-2xl mx-auto">
            Innovation pipelines progettate per creare impatto reale.
          </p>

          {/* VISUALIZZAZIONE MOBILE (CAROSELLO) */}
          <div
            className="md:hidden overflow-x-auto w-full whitespace-nowrap py-4 flex gap-4 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {[1, 2].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="inline-block min-w-[85%] rounded-2xl bg-white/10 backdrop-blur-md border border-blue-400/40 p-6 sm:p-8 shadow-2xl transition-all"
              >
                <h4 className="text-xl sm:text-2xl font-semibold mb-3">Soluzione {id}</h4>
                <p className="text-blue-200 leading-relaxed text-sm sm:text-base">
                  Panoramica essenziale della soluzione tech {id}.
                </p>
              </motion.div>
            ))}
          </div>

          {/* VISUALIZZAZIONE DESKTOP (GRIGLIA) */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 sm:gap-10">
            {[1, 2].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-blue-400/40 p-6 sm:p-8 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,120,255,0.35)] transition-all"
              >
                <h4 className="text-xl sm:text-2xl font-semibold mb-3">Soluzione {id}</h4>
                <p className="text-blue-200 leading-relaxed text-sm sm:text-base">
                  Panoramica essenziale della soluzione tech {id}.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* ---------------------------------------------------------
          FOOTER
      --------------------------------------------------------- */}
      <footer className="bg-blue-950 text-white py-10 border-t border-blue-400/20 shadow-[0_-5px_25px_rgba(0,0,80,0.3)]">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
          ©{new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
          <br />
          <a href="mailto:info@nvisioninsights.it" className="underline hover:text-blue-300">
            info@nvisioninsights.it
          </a>
        </div>
      </footer>

    </main>
  );
}