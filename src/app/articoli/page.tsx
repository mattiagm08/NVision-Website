'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Articoli() {
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
            <Link href="/" className="hover:text-blue-300">Home</Link>
            <Link href="/articoli" className="hover:text-blue-300">Articoli</Link>
            <Link href="/soluzioni" className="hover:text-blue-300">Soluzioni</Link>
            <a href="#chisiamo" className="hover:text-blue-300">Chi siamo</a>
            <a href="#contatti" className="hover:text-blue-300">Contatti</a>
          </nav>
        </div>

        {menuOpen && (
          <nav className="absolute top-full left-0 w-full bg-blue-800 px-6 py-6 space-y-4 shadow-xl z-40 md:hidden">
            <Link href="/" className="block text-white hover:text-blue-300">Home</Link>
            <Link href="/articoli" className="block text-white hover:text-blue-300">Articoli</Link>
            <Link href="/soluzioni" className="block text-white hover:text-blue-300">Soluzioni</Link>
            <a href="#chisiamo" className="block text-white hover:text-blue-300">Chi siamo</a>
            <a href="#contatti" className="block text-white hover:text-blue-300">Contatti</a>
          </nav>
        )}
      </header>

      {/* Hero Articoli */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-black text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">I Nostri Articoli</h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Esplora approfondimenti, novità scientifiche e le ultime dal mondo della tecnologia.
          </p>
        </motion.div>
      </section>

      {/* Articoli */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-300 text-blue-900 flex-grow">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-10">Esplora i Nostri Articoli</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Articolo 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">Innovazioni tecnologiche nel 2025</h4>
              <p className="text-gray-600 mb-4">Esplora le principali innovazioni tecnologiche che modelleranno il nostro futuro.</p>
              <Link href="/articolo/1" className="text-blue-600 hover:text-blue-800">Leggi di più</Link>
            </div>

            {/* Articolo 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">L'intelligenza artificiale nei business</h4>
              <p className="text-gray-600 mb-4">Come le aziende stanno adottando l'IA per ottimizzare i loro processi.</p>
              <Link href="/articolo/2" className="text-blue-600 hover:text-blue-800">Leggi di più</Link>
            </div>

            {/* Articolo 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">Cybersecurity: la battaglia contro gli hacker</h4>
              <p className="text-gray-600 mb-4">Le migliori pratiche per proteggere i dati aziendali in un mondo digitale.</p>
              <Link href="/articolo/3" className="text-blue-600 hover:text-blue-800">Leggi di più</Link>
            </div>

            {/* Aggiungi altri articoli qui */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contatti" className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          ©{new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
          <br />
          <a href="mailto:info@nomeazienda.it" className="underline">info@nomeazienda.it</a>
        </div>
      </footer>
    </main>
  );
}
