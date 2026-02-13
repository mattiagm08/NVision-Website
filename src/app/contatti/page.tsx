'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Mail, MessageSquare, Phone, Tag, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Contatti() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Logica per gestire l'invio del form professionale
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset dello stato dopo 5 secondi
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white font-sans">

      {/* NAVBAR / HEADER (ORIGINALE) */}
      <header className="fixed top-0 w-full z-50 bg-blue-950/40 backdrop-blur-xl border-b border-blue-400/20 shadow-[0_0_20px_rgba(0,0,80,0.3)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white drop-shadow-lg select-none">
            NVision Insights™
          </h1>
          <button className="md:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className="hidden md:flex space-x-10 text-lg font-light">
            <Link href="/" className="block text-white hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/articoli" className="block text-white hover:text-blue-300 transition-colors">Articoli</Link>
            <Link href="/soluzioni" className="block text-white hover:text-blue-300 transition-colors">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white hover:text-blue-300 transition-colors">Chi siamo</Link>
            <Link href="/contatti" className="text-blue-300 font-medium">Contatti</Link>
          </nav>
        </div>

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
              <Link href="/contatti" className="block text-blue-300 text-xl font-bold">Contatti</Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* HERO (ORIGINALE) */}
      <section className="pt-32 pb-20 text-center bg-gradient-to-b from-blue-950 via-black to-blue-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.25),transparent_70%)] pointer-events-none"></div>
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

      {/* SEZIONE FORM PROFESSIONALE (INTEGRATA) */}
      <section className="py-24 flex-grow relative flex justify-center items-center bg-gray-50 text-gray-900">
        <div className="max-w-4xl w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            {/* Overlay di Successo Animato */}
            <AnimatePresence>
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-blue-600 flex flex-col items-center justify-center text-white p-6 text-center"
                >
                  <CheckCircle2 size={64} className="mb-4 animate-bounce" />
                  <h3 className="text-3xl font-bold mb-2">Messaggio Inviato!</h3>
                  <p className="text-blue-100">Ti risponderemo entro le prossime 24 ore lavorative.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* GRUPPO 1: ANAGRAFICA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Nome</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input required type="text" placeholder="Mario" className="w-full bg-white p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Cognome</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input required type="text" placeholder="Rossi" className="w-full bg-white p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm" />
                  </div>
                </div>
              </div>

              {/* GRUPPO 2: CONTATTI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input required type="email" placeholder="mario.rossi@email.it" className="w-full bg-white p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Telefono</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input type="tel" placeholder="+39 333 000 0000" className="w-full bg-white p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm" />
                  </div>
                </div>
              </div>

              {/* GRUPPO 3: OGGETTO */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Oggetto della richiesta</label>
                <div className="relative group">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <select required className="w-full bg-white p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm appearance-none">
                    <option value="">Seleziona un&apos;opzione</option>
                    <option value="consulenza">Consulenza Strategica</option>
                    <option value="tech">Supporto Tecnico</option>
                    <option value="partnership">Proposta di Partnership</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
              </div>

              {/* GRUPPO 4: MESSAGGIO */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Il tuo messaggio</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <textarea required placeholder="Descrivi brevemente la tua richiesta..." className="w-full bg-white p-4 pl-12 rounded-2xl border border-slate-200 h-40 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm resize-none" />
                </div>
              </div>

              {/* PRIVACY E PREFERENZE */}
              <div className="bg-slate-100 p-6 rounded-2xl space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input required type="checkbox" className="mt-1.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600" />
                  <span className="text-sm text-slate-600 leading-snug">
                    Accetto l&apos;informativa sulla <span className="text-blue-600 underline font-medium">Privacy Policy</span> e acconsento al trattamento dei dati.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" className="mt-1.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600" />
                  <span className="text-sm text-slate-600 leading-snug font-medium">
                    Desidero ricevere la newsletter e aggiornamenti.
                  </span>
                </label>
              </div>

              {/* PULSANTE INVIO (PROFESSIONALE) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 text-lg"
              >
                Invia Messaggio <Send size={20} />
              </motion.button>

            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER (ORIGINALE) */}
      <footer id="contatti" className="bg-blue-950 text-white py-10 border-t border-blue-400/20 shadow-[0_-5px_25px_rgba(0,0,80,0.3)]">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
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