'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function ChiSiamo() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white font-sans">
      
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-blue-950/40 backdrop-blur-xl border-b border-blue-400/20 shadow-[0_0_20px_rgba(0,0,80,0.3)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white drop-shadow-lg select-none">
            NVision Insights™
          </h1>

          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-10 text-lg font-light">
            <Link href="/" className="block text-white hover:text-blue-300">Home</Link>
            <Link href="/articoli" className="block text-white hover:text-blue-300">Articoli</Link>
            <Link href="/soluzioni" className="block text-white hover:text-blue-300">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white hover:text-blue-300">Chi siamo</Link>
            <Link href="/contatti" className="block text-white hover:text-blue-300">Contatti</Link>
          </nav>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <nav className="md:hidden bg-blue-950/95 backdrop-blur-xl px-6 py-7 space-y-4 shadow-xl border-t border-blue-400/20 animate-fade-in">
            <Link href="/" className="block text-white hover:text-blue-300">Home</Link>
            <Link href="/articoli" className="block text-white hover:text-blue-300">Articoli</Link>
            <Link href="/soluzioni" className="block text-white hover:text-blue-300">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white hover:text-blue-300">Chi siamo</Link>
            <Link href="/contatti" className="block text-white hover:text-blue-300">Contatti</Link>
          </nav>
        )}
      </header>

      {/* Hero Chi Siamo */}
      <section className="pt-32 pb-20 text-center bg-gradient-to-b from-blue-950 via-black to-blue-900 relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.25),transparent_70%)]"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative max-w-4xl mx-auto px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl">
            Chi Siamo
          </h2>
          <p className="text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            NVision Insights™ nasce dalla passione per la tecnologia, l’innovazione e la divulgazione. La nostra missione è portare conoscenza e soluzioni concrete alla nuova generazione di innovatori.
          </p>
        </motion.div>
      </section>

      {/* Team / Mission */}
      <section className="py-24 bg-gray-100 text-black flex-grow relative">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-blue-900">
            La Nostra Mission
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] transition-all"
            >
              <h4 className="text-2xl font-semibold mb-4 text-blue-900">Innovazione</h4>
              <p className="text-gray-700">
                Sviluppiamo soluzioni tecnologiche all’avanguardia per affrontare le sfide del futuro.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] transition-all"
            >
              <h4 className="text-2xl font-semibold mb-4 text-blue-900">Conoscenza</h4>
              <p className="text-gray-700">
                Condividiamo contenuti, approfondimenti e guide per rendere la tecnologia accessibile a tutti.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contatti" className="bg-blue-950 text-white py-10 border-t border-blue-400/20 shadow-[0_-5px_25px_rgba(0,0,80,0.3)]">
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