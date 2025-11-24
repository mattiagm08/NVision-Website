'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// MODIFICA: Importa le icone che useremo nel form
import { Menu, X, User, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Contatti() {
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

      {/* Hero Contatti */}
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
            Contattaci
          </h2>
          <p className="text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Hai domande o vuoi saperne di più? Scrivici e ti risponderemo al più presto.
          </p>
        </motion.div>
      </section>

      {/* MODIFICA: Form Contatti Moderno */}
      <section className="py-24 bg-gradient-to-br from-blue-950 to-black text-white flex-grow relative flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl w-full px-6"
        >
          {/* Card con effetto "Glassmorphism" */}
          <form className="bg-white/5 backdrop-blur-xl border border-blue-400/30 p-8 md:p-10 rounded-2xl shadow-2xl space-y-6">
            
            {/* Campo Nome con Icona */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-blue-200">Nome</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300" />
                <input 
                  type="text" 
                  placeholder="Il tuo nome" 
                  className="w-full p-3 pl-12 rounded-lg bg-white/5 border border-blue-400/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
            </div>
            
            {/* Campo Email con Icona */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-blue-200">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300" />
                <input 
                  type="email" 
                  placeholder="La tua email" 
                  className="w-full p-3 pl-12 rounded-lg bg-white/5 border border-blue-400/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
            </div>
            
            {/* Campo Messaggio con Icona */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-blue-200">Messaggio</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-blue-300" />
                <textarea 
                  placeholder="Scrivi qui il tuo messaggio..." 
                  className="w-full p-3 pl-12 rounded-lg border border-blue-400/50 bg-white/5 h-36 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
            </div>
            
            {/* Pulsante Aggiornato */}
            <button 
              type="submit" 
              className="bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-400 transition-colors w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-950"
            >
              Invia Messaggio
            </button>
          </form>
        </motion.div>
      </section>
      {/* --- Fine Modifica --- */}


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