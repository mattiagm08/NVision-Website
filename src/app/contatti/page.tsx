'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Mail, MessageSquare, Phone, Tag, Send, CheckCircle2, Facebook, Youtube, Instagram, MapPin, ArrowRight, Globe, Share2 } from 'lucide-react';
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
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-950 via-black to-fuchsia-950 text-white font-sans overflow-x-hidden">

      {/* ---------------------------------------------------------
          NAVBAR / HEADER
      --------------------------------------------------------- */}
      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/8 shadow-[0_0_40px_rgba(139,92,246,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 select-none">
            <Link href="/" >NVision Insights™</Link>
          </h1>
          <button className="md:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className="hidden md:flex space-x-10 text-base font-light tracking-wide">
            <Link href="/" className="text-white/70 hover:text-white transition-colors duration-300">Home</Link>
            <Link href="/articoli" className="text-white/70 hover:text-white transition-colors duration-300">Articoli</Link>
            <Link href="/soluzioni" className="text-white/70 hover:text-white transition-colors duration-300">Soluzioni</Link>
            <Link href="/chisiamo" className="text-white/70 hover:text-white transition-colors duration-300">Chi Siamo</Link>
            <Link href="/contatti" className="text-white/90 font-semibold">Contatti</Link>
          </nav>
        </div>

        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-zinc-950/98 backdrop-blur-xl px-6 py-8 space-y-5 border-t border-white/10 shadow-2xl z-40 rounded-b-2xl"
          >
            <Link href="/" className="block text-white text-xl hover:text-violet-300 transition">Home</Link>
            <Link href="/articoli" className="block text-white text-xl hover:text-violet-300 transition">Articoli</Link>
            <Link href="/soluzioni" className="block text-white text-xl hover:text-violet-300 transition">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white text-xl hover:text-violet-300 transition">Chi Siamo</Link>
            <Link href="/contatti" className="block text-violet-400 text-xl font-bold">Contatti</Link>
          </motion.nav>
        )}
      </header>


      {/* ---------------------------------------------------------
          SEZIONE HERO
      --------------------------------------------------------- */}
      <section className="pb-17 text-center bg-gradient-to-b from-purple-950 via-black to-purple-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,38,211,0.15),transparent_70%)] pointer-events-none"></div>
      </section>


      {/* ---------------------------------------------------------
          SEZIONE FORM
      --------------------------------------------------------- */}
      <section className="py-16 flex-grow relative bg-slate-50 text-slate-900 overflow-hidden">

        {/* DECORAZIONI BACKGROUND */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7e22ce 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-fuchsia-200/30 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">

          {/* TITOLO SEZIONE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-tight mb-4">
              Invia una <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">richiesta</span>
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
            className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-purple-100/40 overflow-hidden"
          >
            {/* OVERLAY SUCCESSO */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-20 bg-gradient-to-br from-purple-600 to-fuchsia-700 flex flex-col items-center justify-center text-white p-6 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-3 tracking-tight">Messaggio Inviato!</h3>
                  <p className="text-purple-100/80 font-light text-lg max-w-sm leading-relaxed">
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
                      <label className="text-xs font-bold uppercase tracking-widest text-purple-500 ml-1">{field.label}</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors" size={18} />
                        <input
                          required
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* GRUPPO 2: CONTATTI */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-purple-500 ml-1">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors" size={18} />
                      <input
                        required
                        type="email"
                        placeholder="mario.rossi@email.it"
                        className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-purple-500 ml-1">Telefono</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors" size={18} />
                      <input
                        type="tel"
                        placeholder="+39 333 000 0000"
                        className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* GRUPPO 3: OGGETTO */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-purple-500 ml-1">Oggetto della richiesta</label>
                  <div className="relative group">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors" size={18} />
                    <select
                      required
                      className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all appearance-none text-slate-600"
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
                  <label className="text-xs font-bold uppercase tracking-widest text-purple-500 ml-1">Il tuo messaggio</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-5 text-slate-300 group-focus-within:text-purple-500 transition-colors" size={18} />
                    <textarea
                      required
                      placeholder="Descrivi brevemente la tua richiesta..."
                      className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 h-40 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none text-slate-800 placeholder:text-slate-300"
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
                          className="w-4 h-4 rounded border-slate-300 accent-purple-600"
                        />
                      </div>
                      <span className="text-sm text-slate-500 leading-snug group-hover:text-slate-700 transition-colors">
                        {item.text}
                        {item.link && <span className="text-purple-600 underline font-medium">{item.link}</span>}
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
                    className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-purple-200 transition-all text-sm uppercase tracking-widest"
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
      <footer className="relative mt-auto border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-5 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600">
                NVision Insights™
              </h3>

              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-zinc-100 rounded-full hover:bg-violet-600 hover:text-white text-zinc-500 transition-all duration-200">
                  <Facebook size={18} />
                </a>
                <a href="#" className="p-2 bg-zinc-100 rounded-full hover:bg-violet-600 hover:text-white text-zinc-500 transition-all duration-200">
                  <Instagram size={18} />
                </a>
                <a href="#" className="p-2 bg-zinc-100 rounded-full hover:bg-violet-600 hover:text-white text-zinc-500 transition-all duration-200">
                  <Share2 size={18} />
                </a>
              </div>
            </div>

            {/* Navigazione */}
            <div>
              <h4 className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]">
                Navigazione
              </h4>

              <ul className="space-y-4 text-sm text-zinc-400 font-light">
                <li><Link href="/" className="text-black hover:text-violet-600 transition-colors duration-200">Home</Link></li>
                <li><Link href="/articoli" className="text-black hover:text-violet-600 transition-colors duration-200">Articoli</Link></li>
                <li><Link href="/soluzioni" className="text-black hover:text-violet-600 transition-colors duration-200">Soluzioni</Link></li>
                <li><Link href="/chisiamo" className="text-black hover:text-violet-600 transition-colors duration-200">Chi Siamo</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]">
                Policy & Cookies
              </h4>

              <ul className="space-y-4 text-sm text-zinc-400 font-light">
                <li><Link href="/privacy" className="text-black hover:text-violet-600 transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-black hover:text-violet-600 transition-colors duration-200">Cookie Policy</Link></li>
                <li><Link href="/terms" className="text-black hover:text-violet-600 transition-colors duration-200">Termini</Link></li>
                <li className="text-black pt-2 text-xs font-mono">P.IVA IT 01234567890</li>
              </ul>
            </div>

            {/* Contatti */}
            <div className="space-y-6">
              <h4 className="text-black font-bold text-xs uppercase tracking-[0.15em]">
                Contattaci
              </h4>

              <div className="relative">
                <input
                  type="email"
                  placeholder="La tua email"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                />
                <button className="absolute right-2 top-2 bg-violet-600 hover:bg-violet-500 p-1.5 rounded-lg transition-colors duration-200 text-white">
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center space-x-3 text-sm text-black font-light">
                  <Mail size={15} className="text-violet-600 shrink-0" />
                  <span>info@nvisioninsights.it</span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-black font-light">
                  <MapPin size={15} className="text-violet-600 shrink-0" />
                  <span>Innovations Hub, Milano, IT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent mb-8" />

          {/* Bottom bar FIXED */}
          <div className="grid grid-cols-3 items-center text-xs text-black font-light mb-4">

            {/* left spacer */}
            <div />

            {/* center copyright */}
            <p className="text-center">
              © {new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
            </p>

            {/* right controls */}
            <div className="flex justify-end items-center space-x-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Globe size={12} className="text-violet-500" />
                Italiano
              </span>

              <span className="hover:text-violet-600 transition-colors duration-200 cursor-pointer">
                Supporto
              </span>
            </div>

          </div>

        </div>
      </footer>

    </main>
  );
}