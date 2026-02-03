'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Twitter, Linkedin, Share2, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import articles from '../../../resources/articles.json';

export default function Articoli() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white font-sans">

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-blue-950/40 backdrop-blur-xl border-b border-blue-400/20 shadow-[0_0_20px_rgba(0,0,80,0.3)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* LOGO CON GRADIENTE SFUMATO */}
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white drop-shadow-lg select-none">
            NVision Insights™
          </h1>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-10 text-lg font-light">
            <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/articoli" className="hover:text-blue-300 transition-colors">Articoli</Link>
            <Link href="/soluzioni" className="hover:text-blue-300 transition-colors">Soluzioni</Link>
            <Link href="/chisiamo" className="hover:text-blue-300 transition-colors">Chi siamo</Link>
            <Link href="/contatti" className="hover:text-blue-300 transition-colors">Contatti</Link>
          </nav>
        </div>

        {/* MOBILE NAV CON ANIMAZIONE */}
        <AnimatePresence>
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
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 text-center bg-gradient-to-b from-blue-950 via-black to-blue-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.25),transparent_70%)]"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative max-w-4xl mx-auto px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl">
            I Nostri Articoli
          </h2>
          <p className="text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed font-light">
            Approfondimenti tech, scenari futuri e analisi pensate per una nuova generazione di innovatori.
          </p>
        </motion.div>
      </section>

      {/* GRID ARTICOLI */}
      <section className="py-24 bg-gray-100 text-black flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-6 text-blue-900">
            Esplora i Nostri Contenuti
          </h3>
          <p className="text-center mb-16 text-lg text-gray-700 max-w-3xl mx-auto">
            Una raccolta di contenuti progettati per alimentare competenze, visione e consapevolezza.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article) => (
              <motion.div
                key={article.slug}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-200"
              >
                {/* IMMAGINE ARTICOLO */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* CONTENUTO CARD */}
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-bold mb-4 text-blue-950 group-hover:text-blue-600 transition-colors leading-tight">
                    {article.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto flex justify-between items-center pt-6 border-t border-gray-100">
                    <Link
                      href={`/articoli/${article.slug}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-sm uppercase tracking-wider transition-all"
                    >
                      Leggi di più <ArrowRight size={16} />
                    </Link>

                    <div className="flex items-center gap-4 text-gray-400">
                      <Twitter size={18} className="hover:text-blue-400 cursor-pointer transition-colors" />
                      <Linkedin size={18} className="hover:text-blue-700 cursor-pointer transition-colors" />
                      <Share2 size={18} className="hover:text-gray-600 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-white py-10 border-t border-blue-400/20 shadow-[0_-5px_25px_rgba(0,0,80,0.3)]">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm font-light">
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