'use client';
import React, { useState, useRef } from 'react'; 
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // --- Logica per il Drag-to-Scroll ---

  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => { 
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const onMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => { 
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault(); 
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  // --- Fine Logica Drag-to-Scroll ---

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white font-sans">

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-blue-900/40 backdrop-blur-xl border-b border-blue-400/20 shadow-[0_0_20px_rgba(0,0,80,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white drop-shadow-lg select-none">
            NVision Insights™
          </h1>

          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className="hidden md:flex space-x-10 text-lg font-light">
            <Link href="/" className="hover:text-blue-300 transition">Home</Link>
            <Link href="/articoli" className="hover:text-blue-300 transition">Articoli</Link>
            <Link href="/soluzioni" className="hover:text-blue-300 transition">Soluzioni</Link>
            <Link href="/chisiamo" className="hover:text-blue-300 transition">Chi siamo</Link>
            <Link href="/contatti" className="hover:text-blue-300 transition">Contatti</Link>
          </nav>
        </div>

        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-blue-950/95 backdrop-blur-xl px-6 py-8 space-y-4 border-t border-blue-400/20 shadow-xl z-40 rounded-b-2xl"
          >
            <Link href="/" className="block text-white text-xl hover:text-blue-300 transition">Home</Link>
            <Link href="/articoli" className="block text-white text-xl hover:text-blue-300 transition">Articoli</Link>
            <Link href="/soluzioni" className="block text-white text-xl hover:text-blue-300 transition">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white text-xl hover:text-blue-300 transition">Chi siamo</Link>
            <Link href="/contatti" className="block text-white text-xl hover:text-blue-300 transition">Contatti</Link>
          </motion.nav>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="pt-28 sm:pt-32 pb-16 min-h-[60vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 bg-gradient-to-b from-blue-950 via-black to-blue-900 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-xl">
            NVision Insights
          </h2>
          <p className="text-lg sm:text-xl md:text-xl text-blue-200 max-w-2xl mx-auto mb-5 sm:mb-7 leading-relaxed">
            Tecnologia, divulgazione e innovazione progettate per la prossima generazione.
          </p>
        </motion.div>

        {/* HERO CAROUSEL MOBILE */}
        <motion.div
          // Aggiunta Ref e gestori eventi
          ref={carouselRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeaveOrUp}
          onMouseUp={onMouseLeaveOrUp}
          onMouseMove={onMouseMove}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          // Aggiunto cursor-grab e classi per nascondere scrollbar
          className="overflow-x-auto w-full max-w-full whitespace-nowrap py-4 flex gap-4 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              // Aumentata la larghezza minima delle card
              className="inline-block min-w-[70%] sm:min-w-[55%] md:min-w-[33%] rounded-3xl overflow-hidden shadow-2xl transition-transform pointer-events-none"
            >
              <img
                src={`/carousel/img${i}.jpg`}
                alt={`Immagine ${i}`}
                className="w-full h-44 sm:h-52 md:h-72 object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ARTICOLI (MOBILE COMPACT) - MODIFICATO CON CAROSELLO SU MOBILE */}
      <section id="articoli" className="py-14 sm:py-20 bg-gray-100 text-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6"
        >
          <h3 className="text-4xl sm:text-5xl font-bold text-center mb-4 sm:mb-6">Ultimi Articoli</h3>
          <p className="text-center mb-8 sm:mb-12 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Approfondimenti tech e analisi essenziali.
          </p>
          
          {/* CAROUSELLO MOBILE (visibile fino a md) */}
          <div 
            className="md:hidden overflow-x-auto w-full whitespace-nowrap py-4 flex gap-4 cursor-grab active:cursor-grabbing 
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {[1, 2, 3].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                // min-w-[85%] forza lo scroll orizzontale su mobile
                className="inline-block min-w-[85%] rounded-2xl bg-white p-5 sm:p-8 shadow-lg border border-gray-200 relative overflow-hidden transition-all 
                                 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 
                                 before:bg-blue-500 hover:before:bg-blue-700 before:transition-all before:duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              >
                <h4 className="text-xl sm:text-2xl font-semibold mb-3">Titolo Articolo {id}</h4>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Overview rapida dell'articolo {id} con contenuti rilevanti.
                </p>
              </motion.div>
            ))}
          </div>

          {/* GRIGLIA DESKTOP (visibile solo su schermi md e superiori) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {[1, 2, 3].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="rounded-2xl bg-white p-5 sm:p-8 shadow-lg border border-gray-200 relative overflow-hidden transition-all 
                                 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 
                                 before:bg-blue-500 hover:before:bg-blue-700 before:transition-all before:duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              >
                <h4 className="text-xl sm:text-2xl font-semibold mb-3">Titolo Articolo {id}</h4>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Overview rapida dell'articolo {id} con contenuti rilevanti.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SOLUZIONI - GIA' MODIFICATO CON CAROSELLO SU MOBILE */}
      <section id="soluzioni" className="py-14 sm:py-24 bg-gradient-to-br from-blue-950 to-black text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,140,255,0.25),transparent_70%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20"
        >
          <h3 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 sm:mb-6 text-blue-200">
            Soluzioni Tech
          </h3>
          <p className="text-center mb-8 sm:mb-12 text-blue-300 text-base sm:text-lg max-w-2xl mx-auto">
            Innovation pipelines progettate per creare impatto reale.
          </p>
          
          {/* CAROUSEL MOBILE (visibile fino a md) */}
          <div 
            className="md:hidden overflow-x-auto w-full whitespace-nowrap py-4 flex gap-4 cursor-grab active:cursor-grabbing 
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {[1, 2].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                // min-w-[85%] forza lo scroll orizzontale su mobile
                className="inline-block min-w-[85%] rounded-2xl bg-white/10 backdrop-blur-md border border-blue-400/40 p-6 sm:p-8 shadow-2xl transition-all"
              >
                <h4 className="text-xl sm:text-2xl font-semibold mb-3">Soluzione {id}</h4>
                <p className="text-blue-200 leading-relaxed text-sm sm:text-base">
                  Panoramica essenziale della soluzione tech {id}.
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* GRIGLIA DESKTOP (visibile solo su schermi md e superiori) */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 sm:gap-10">
            {[1, 2].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
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

      {/* FOOTER */}
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