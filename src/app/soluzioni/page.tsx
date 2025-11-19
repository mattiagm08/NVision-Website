'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Soluzioni() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-800 via-black to-green-600 text-white font-sans">
      
      {/* NAVBAR */}
      <header className="bg-blue-900 text-white shadow-lg relative z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* LOGO */}
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
            NVision Insights™
          </h1>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/articoli" className="hover:text-blue-300 transition-colors">Articoli</Link>
            <Link href="/soluzioni" className="hover:text-blue-300 transition-colors">Soluzioni</Link>
            <Link href="/chisiamo" className="hover:text-blue-300 transition-colors">Chi siamo</Link>
            <Link href="/contatti" className="hover:text-blue-300 transition-colors">Contatti</Link>
          </nav>
        </div>

        {/* MOBILE NAV */}
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-blue-800 px-6 py-6 space-y-4 shadow-xl z-40"
          >
            <Link href="/" className="block hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/articoli" className="block hover:text-blue-300 transition-colors">Articoli</Link>
            <Link href="/soluzioni" className="block hover:text-blue-300 transition-colors">Soluzioni</Link>
            <Link href="/chisiamo" className="block hover:text-blue-300 transition-colors">Chi siamo</Link>
            <Link href="/contatti" className="block hover:text-blue-300 transition-colors">Contatti</Link>
          </motion.nav>
        )}
      </header>


      {/* HERO SECTION */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-black text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Le Nostre Soluzioni
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
            Scopri come le nostre soluzioni innovative possono migliorare la tua esperienza e semplificare i processi aziendali.
          </p>
        </motion.div>
      </section>

      {/* SOLUZIONI GRID */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-300 text-green-900 flex-grow">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* CARD TEMPLATE */}
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
              <h3 className="text-2xl font-semibold text-green-700 mb-4">{sol.title}</h3>
              <p className="text-lg text-gray-700 mb-6">{sol.desc}</p>
              <Link href={sol.href} className="text-green-600 hover:text-green-800 font-semibold transition-colors">
                Scopri di più
              </Link>
            </motion.div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer id="contatti" className="bg-green-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          ©{new Date().getFullYear()} NVision Solutions™ — Tutti i diritti riservati.
          <br />
          <a href="mailto:info@nomeazienda.it" className="underline hover:text-green-300 transition-colors">
            info@nomeazienda.it
          </a>
        </div>
      </footer>
    </main>
  );
}
