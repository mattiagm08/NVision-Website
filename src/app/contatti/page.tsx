'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Mail, MessageSquare, Phone, Tag, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Contatti() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white font-sans overflow-x-hidden">

      {/* ---------------------------------------------------------
          NAVBAR / HEADER
      --------------------------------------------------------- */}
      <header className="fixed top-0 w-full z-50 bg-blue-950/40 backdrop-blur-xl border-b border-blue-400/20 shadow-[0_0_20px_rgba(0,0,80,0.3)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white drop-shadow-lg select-none">
            NVision Insights™
          </h1>

          {/* MENU HAMBURGER (MOBILE) */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* NAVIGAZIONE (DESKTOP) */}
          <nav className="hidden md:flex space-x-10 text-lg font-light">
            <Link href="/" className="block text-white hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/articoli" className="block text-white hover:text-blue-300 transition-colors">Articoli</Link>
            <Link href="/soluzioni" className="block text-white hover:text-blue-300 transition-colors">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white hover:text-blue-300 transition-colors">Chi siamo</Link>
            <Link href="/contatti" className="text-blue-300 font-medium">Contatti</Link>
          </nav>
        </div>

        {/* MENU A DISCESA (MOBILE) */}
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


      {/* ---------------------------------------------------------
          SEZIONE HERO
      --------------------------------------------------------- */}
      <section className="pb-17 text-center bg-gradient-to-b from-blue-950 via-black to-blue-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.25),transparent_70%)] pointer-events-none"></div>
      </section>


      {/* ---------------------------------------------------------
          SEZIONE FORM
      --------------------------------------------------------- */}
      <section className="py-16 flex-grow relative bg-slate-50 text-slate-900 overflow-hidden">

        {/* DECORAZIONI BACKGROUND */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">

          {/* TITOLO SEZIONE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-tight mb-4">
              Invia una <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">richiesta</span>
            </h3>
            <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed">
              Hai domande o vuoi saperne di più? Compila il modulo sottostante con i tuoi dati e descrivici la tua esigenza.
            </p> 
          </motion.div>
          <div className="h-px bg-slate-100 mb-12"></div>
          {/* FORM CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-blue-100/40 overflow-hidden"
          >
            {/* OVERLAY SUCCESSO */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-20 bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center text-white p-6 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-3 tracking-tight">Messaggio Inviato!</h3>
                  <p className="text-blue-100/80 font-light text-lg max-w-sm leading-relaxed">
                    Ti risponderemo entro le prossime 24 ore lavorative.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* GRUPPO 1: ANAGRAFICA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Nome", placeholder: "Mario", type: "text" },
                    { label: "Cognome", placeholder: "Rossi", type: "text" },
                  ].map((field, i) => (
                    <div key={i} className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-blue-500 ml-1">{field.label}</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                          required
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* GRUPPO 2: CONTATTI */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-blue-500 ml-1">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        required
                        type="email"
                        placeholder="mario.rossi@email.it"
                        className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-blue-500 ml-1">Telefono</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        type="tel"
                        placeholder="+39 333 000 0000"
                        className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* GRUPPO 3: OGGETTO */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-blue-500 ml-1">Oggetto della richiesta</label>
                  <div className="relative group">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <select
                      required
                      className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none text-slate-600"
                    >
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
                  <label className="text-xs font-bold uppercase tracking-widest text-blue-500 ml-1">Il tuo messaggio</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <textarea
                      required
                      placeholder="Descrivi brevemente la tua richiesta..."
                      className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 h-40 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-slate-800 placeholder:text-slate-300"
                    />
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="h-px bg-slate-100"></div>

                {/* PRIVACY */}
                <div className="space-y-4">
                  {[
                    { required: true, text: "Accetto l'informativa sulla ", link: "Privacy Policy", extra: " e acconsento al trattamento dei dati." },
                    { required: false, text: "Desidero ricevere la newsletter e aggiornamenti esclusivi.", link: null, extra: null },
                  ].map((item, i) => (
                    <label key={i} className="flex items-start gap-4 cursor-pointer group">
                      <div className="flex-shrink-0 mt-0.5">
                        <input
                          required={item.required}
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 accent-blue-600"
                        />
                      </div>
                      <span className="text-sm text-slate-500 leading-snug group-hover:text-slate-700 transition-colors">
                        {item.text}
                        {item.link && <span className="text-blue-600 underline font-medium">{item.link}</span>}
                        {item.extra}
                      </span>
                    </label>
                  ))}
                </div>

                {/* PULSANTE INVIO */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all text-sm uppercase tracking-widest"
                  >
                    Invia Messaggio
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <span className="text-xs text-slate-400 font-light">
                    Risposta garantita entro 24 ore lavorative.
                  </span>
                </div>

              </form>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ---------------------------------------------------------
          FOOTER
      --------------------------------------------------------- */}
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