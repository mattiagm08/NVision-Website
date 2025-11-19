'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Contatti() {
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

      {/* Hero Contatti */}
      <section className="pt-15 pb-16 text-center bg-gradient-to-b from-blue-700 to-black">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Contattaci</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Hai domande o vuoi saperne di più? Scrivici e ti risponderemo al più presto.
          </p>
        </motion.div>
      </section>

      {/* Form Contatti */}
      <section className="py-20 bg-gray-100 text-blue-900 flex justify-center">
        <div className="max-w-3xl w-full px-6">
          <form className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Nome</label>
              <input type="text" placeholder="Il tuo nome" className="w-full p-3 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Email</label>
              <input type="email" placeholder="La tua email" className="w-full p-3 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Messaggio</label>
              <textarea placeholder="Scrivi qui il tuo messaggio..." className="w-full p-3 rounded-lg border border-gray-300 h-32" />
            </div>
            <button type="submit" className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition">
              Invia Messaggio
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="contatti" className="bg-blue-900 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          ©{new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
          <br />
          <a href="mailto:info@nvisioninsights.it" className="underline">info@nvisioninsights.it</a>
        </div>
      </footer>
    </main>
  );
}
