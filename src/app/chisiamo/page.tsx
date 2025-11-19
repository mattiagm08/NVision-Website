'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function ChiSiamo() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-800 via-black to-blue-600 text-white font-sans">
      {/* Navbar */}
      <header className="bg-blue-900 text-white shadow-lg relative z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
            NVision Insights™
          </h1>

          <button
            className="md:hidden text-white text-3xl z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={`hidden md:flex space-x-8 ${menuOpen ? 'hidden' : 'block'}`}>
            <Link href="/" className="block text-white hover:text-blue-300">Home</Link>
            <Link href="/articoli" className="block text-white hover:text-blue-300">Articoli</Link>
            <Link href="/soluzioni" className="block text-white hover:text-blue-300">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white hover:text-blue-300">Chi siamo</Link>
            <Link href="/contatti" className="block text-white hover:text-blue-300">Contatti</Link>
          </nav>
        </div>

        {menuOpen && (
          <nav className="absolute top-full left-0 w-full bg-blue-800 px-6 py-6 space-y-4 shadow-xl z-40 md:hidden">
            <Link href="/" className="block text-white hover:text-blue-300">Home</Link>
            <Link href="/articoli" className="block text-white hover:text-blue-300">Articoli</Link>
            <Link href="/soluzioni" className="block text-white hover:text-blue-300">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white hover:text-blue-300">Chi siamo</Link>
            <Link href="/contatti" className="block text-white hover:text-blue-300">Contatti</Link>
          </nav>
        )}
      </header>

      {/* Hero Chi Siamo */}
      <section className="pt-15 pb-16 text-center bg-gradient-to-b from-blue-700 to-black">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Chi Siamo</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            NVision Insights™ nasce dalla passione per la tecnologia, l’innovazione e la divulgazione. La nostra missione è portare conoscenza e soluzioni concrete alla nuova generazione di innovatori.
          </p>
        </motion.div>
      </section>

      {/* Team / Mission */}
      <section className="py-20 bg-gray-100 text-blue-900">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">La Nostra Mission</h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <h4 className="text-2xl font-semibold mb-4">Innovazione</h4>
              <p>
                Sviluppiamo soluzioni tecnologiche all’avanguardia per affrontare le sfide del futuro.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <h4 className="text-2xl font-semibold mb-4">Conoscenza</h4>
              <p>
                Condividiamo contenuti, approfondimenti e guide per rendere la tecnologia accessibile a tutti.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contatti" className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          ©{new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
          <br />
          <a href="mailto:info@nvisioninsights.it" className="underline">info@nvisioninsights.it</a>
        </div>
      </footer>
    </main>
  );
}
