'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Soluzioni() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-800 via-black to-green-600 text-white font-sans">
      {/* Navbar */}
      <header className="bg-green-900 text-white shadow-lg relative z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
            NVision Insights™
          </h1>

          <button
            className="md:hidden text-white text-3xl z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={`hidden md:flex space-x-8 ${menuOpen ? 'hidden' : 'block'}`}>
            <Link href="/" className="hover:text-green-300">Home</Link>
            <Link href="/articoli" className="hover:text-green-300">Articoli</Link>
            <Link href="/soluzioni" className="hover:text-green-300">Soluzioni</Link>
            <a href="#chisiamo" className="hover:text-green-300">Chi siamo</a>
            <a href="#contatti" className="hover:text-green-300">Contatti</a>
          </nav>
        </div>

        {menuOpen && (
          <nav className="absolute top-full left-0 w-full bg-green-800 px-6 py-6 space-y-4 shadow-xl z-40 md:hidden">
            <Link href="/" className="block text-white hover:text-green-300">Home</Link>
            <Link href="/articoli" className="block text-white hover:text-green-300">Articoli</Link>
            <Link href="/soluzioni" className="block text-white hover:text-green-300">Soluzioni</Link>
            <a href="#chisiamo" className="block text-white hover:text-green-300">Chi siamo</a>
            <a href="#contatti" className="block text-white hover:text-green-300">Contatti</a>
          </nav>
        )}
      </header>

      {/* Hero Soluzioni */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-black text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">Le Nostre Soluzioni</h2>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Scopri come le nostre soluzioni innovative possono migliorare la tua esperienza e semplificare i processi aziendali.
          </p>
        </motion.div>
      </section>

      {/* Sezione Soluzioni */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-300 text-green-900 flex-grow">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Soluzione 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Soluzione 1: Ottimizzazione dei Processi</h3>
              <p className="text-lg text-gray-700 mb-6">
                Migliora l'efficienza operativa con i nostri strumenti avanzati di gestione dei flussi di lavoro.
              </p>
              <Link href="/soluzioni/ottimizzazione" className="text-green-600 hover:text-green-800">Scopri di più</Link>
            </div>

            {/* Soluzione 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Soluzione 2: Innovazione Tecnologica</h3>
              <p className="text-lg text-gray-700 mb-6">
                Approfitta delle ultime innovazioni per migliorare i tuoi sistemi e raggiungere nuovi obiettivi aziendali.
              </p>
              <Link href="/soluzioni/innovazione" className="text-green-600 hover:text-green-800">Scopri di più</Link>
            </div>

            {/* Soluzione 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">Soluzione 3: Analisi dei Dati</h3>
              <p className="text-lg text-gray-700 mb-6">
                Trasforma i tuoi dati in insights utili per prendere decisioni informate e strategiche.
              </p>
              <Link href="/soluzioni/analisi-dati" className="text-green-600 hover:text-green-800">Scopri di più</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contatti" className="bg-green-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          ©{new Date().getFullYear()} NVision Solutions™ — Tutti i diritti riservati.
          <br />
          <a href="mailto:info@nomeazienda.it" className="underline">info@nomeazienda.it</a>
        </div>
      </footer>
    </main>
  );
}
