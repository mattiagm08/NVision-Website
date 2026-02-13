'use client';

// IMPORTAZIONI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Soluzioni() {

  // STATI PER IL MENU MOBILE
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white font-sans">
      
      {/* ---------------------------------------------------------
          NAVBAR / HEADER
      --------------------------------------------------------- */}
      <header className="fixed top-0 w-full z-50 bg-blue-950/40 backdrop-blur-xl border-b border-blue-400/20 shadow-[0_0_20px_rgba(0,0,80,0.3)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
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
            <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/articoli" className="hover:text-blue-300 transition-colors">Articoli</Link>
            <Link href="/soluzioni" className="text-blue-300 font-medium">Soluzioni</Link>
            <Link href="/chisiamo" className="hover:text-blue-300 transition-colors">Chi siamo</Link>
            <Link href="/contatti" className="hover:text-blue-300 transition-colors">Contatti</Link>
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
            <Link href="/" className="block text-white text-xl hover:text-blue-300 transition">Home</Link>
            <Link href="/articoli" className="block text-white text-xl hover:text-blue-300 transition">Articoli</Link>
            <Link href="/soluzioni" className="block text-blue-300 text-xl font-bold">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white text-xl hover:text-blue-300 transition">Chi siamo</Link>
            <Link href="/contatti" className="block text-white text-xl hover:text-blue-300 transition">Contatti</Link>
          </motion.nav>
        )}
      </header>


      {/* ---------------------------------------------------------
          SEZIONE HERO
      --------------------------------------------------------- */}

      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-950 via-black to-blue-900 text-center relative">
        {/* EFFETTO VISIVO BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.25),transparent_70%)] pointer-events-none"></div>
        
        {/* CONTENUTO HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto px-6 relative"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-xl">
            Le Nostre Soluzioni
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
            Scopri come le nostre soluzioni innovative possono migliorare la tua esperienza e semplificare i processi aziendali.
          </p>
        </motion.div>
      </section>


      {/* ---------------------------------------------------------
          SEZIONE GRIGLIA SOLUZIONI
      --------------------------------------------------------- */}
      <section className="py-20 bg-gray-100 text-black flex-grow">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* MAPPATURA CARD SOLUZIONI */}
          {[
            {
              title: "Soluzione 1: Ottimizzazione dei Processi",
              desc: "Migliora l'efficienza operativa con i nostri strumenti avanzati di gestione dei flussi di lavoro.",
              href: "/soluzioni/ottimizzazione"
            },
            {
              title: "Soluzione 2: Innovazione Tecnologica",
              desc: "Approfitta delle ultime innovazioni per migliorare i tuoi sistemi e raggiungere nuovi obiettivi aziendali.",
              href: "/soluzioni/innovazione"
            },
            {
              title: "Soluzione 3: Analisi dei Dati",
              desc: "Trasforma i tuoi dati in insights utili per prendere decisioni informate e strategiche.",
              href: "/soluzioni/analisi-dati"
            }
          ].map((sol, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-blue-950 mb-4">{sol.title}</h3>
              <p className="text-lg text-gray-700 mb-6">{sol.desc}</p>
              
              <Link href={sol.href} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Scopri di più
              </Link>
            </motion.div>
          ))}

        </div>
      </section>


      {/* ---------------------------------------------------------
          FOOTER
      --------------------------------------------------------- */}
      <footer id="contatti" className="bg-blue-950 text-white py-10 border-t border-blue-400/20 shadow-[0_-5px_25px_rgba(0,0,80,0.3)]">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm font-light">
          ©{new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
          <br />
          <a href="mailto:info@nvisioninsights.it" className="underline hover:text-blue-300 transition-colors">
            info@nvisioninsights.it
          </a>
        </div>
      </footer>

    </main>
  );
}