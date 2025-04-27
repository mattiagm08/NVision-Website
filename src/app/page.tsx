'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-800 via-black to-blue-600 text-white font-sans">
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

          {/* Desktop nav: visibile solo se menu mobile chiuso */}
          <nav className={`hidden md:flex space-x-8 ${menuOpen ? 'hidden' : 'block'}`}>
            <a href="#home" className="hover:text-blue-300">Home</a>
            <a href="/articoli" className="hover:text-blue-300">Articoli</a>
            <a href="/soluzioni" className="hover:text-blue-300">Soluzioni</a> {/* Link aggiornato */}
            <a href="#chisiamo" className="hover:text-blue-300">Chi siamo</a>
            <a href="#contatti" className="hover:text-blue-300">Contatti</a>
          </nav>
        </div>

        {/* Mobile nav: menu a schermo intero se attivo */}
        {menuOpen && (
          <nav className="absolute top-full left-0 w-full bg-blue-800 px-6 py-6 space-y-4 shadow-xl z-40 md:hidden">
            <a href="#home" className="block text-white hover:text-blue-300">Home</a>
            <a href="/articoli" className="block text-white hover:text-blue-300">Articoli</a>
            <a href="/soluzioni" className="block text-white hover:text-blue-300">Soluzioni</a> {/* Link aggiornato */}
            <a href="#chisiamo" className="block text-white hover:text-blue-300">Chi siamo</a>
            <a href="#contatti" className="block text-white hover:text-blue-300">Contatti</a>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="py-16 bg-gradient-to-r from-blue-700 to-black text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">NVision Insights</h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">Dove tecnologia, divulgazione e conoscenza sono alla base della nostra crescita.</p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto whitespace-nowrap px-4"
        >
          <div className="flex space-x-4 pb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`/carousel/img${i}.jpg`}
                alt={`Immagine ${i}`}
                className="h-40 sm:h-48 md:h-64 w-auto rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105 hover:shadow-lg"
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Articoli */}
      <section id="articoli" className="py-20 bg-gradient-to-b from-gray-100 to-gray-300 text-blue-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-black-700 mb-6">Ultimi Articoli</h3>
          <p className="text-center mb-12 text-black-700 text-lg">Scopri i nostri articoli scientifici, tecnologici, di attualità e molto altro.</p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-4">
            {[1, 2, 3].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl bg-white p-8 shadow-md hover:shadow-2xl transition-all"
              >
                <h4 className="text-xl sm:text-2xl font-semibold text-black-700 mb-4">Titolo Articolo {id}</h4>
                <p className="text-black-700 text-base leading-relaxed">
                  Descrizione breve dell’articolo numero {id} con informazioni utili e interessanti.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Soluzioni */}
      <section id="soluzioni" className="py-20 bg-gradient-to-br from-blue-800 to-black text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-blue-300 mb-6">Soluzioni Tech</h3>
          <p className="text-center mb-12 text-blue-200 text-lg">Le nostre invenzioni e sistemi per innovare e dare vita alle nostre visioni.</p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-4">
            {[1, 2].map((id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl bg-white/5 backdrop-blur-md border border-blue-400 p-8 shadow-md hover:shadow-2xl transition-all"
              >
                <h4 className="text-xl sm:text-2xl font-semibold text-white mb-4">Soluzione {id}</h4>
                <p className="text-blue-200 text-base leading-relaxed">
                  Descrizione dettagliata della soluzione tecnologica {id} che abbiamo sviluppato con passione.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
