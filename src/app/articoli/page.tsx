/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Twitter, Linkedin, Share2, ArrowRight, Facebook, Youtube, Instagram, Mail, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';
import articlesData from '../../../resources/articles.json';

export default function Articoli() {
  const [menuOpen, setMenuOpen] = useState(false);

  const sortedArticles = useMemo(() => {
    return [...articlesData].sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number);
      const [dayB, monthB, yearB] = b.date.split('/').map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA).getTime();
      const dateB = new Date(yearB, monthB - 1, dayB).getTime();

      return dateB - dateA;
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white font-sans">

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
            <Link href="/articoli" className="text-white/90 font-semibold">Articoli</Link>
            <Link href="/soluzioni" className="text-white/70 hover:text-white transition-colors duration-300">Soluzioni</Link>
            <Link href="/chisiamo" className="text-white/70 hover:text-white transition-colors duration-300">Chi Siamo</Link>
            <Link href="/contatti" className="text-white/70 hover:text-white transition-colors duration-300">Contatti</Link>
          </nav>
        </div>

        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-zinc-950/98 backdrop-blur-xl px-6 py-8 space-y-5 border-t border-white/10 shadow-2xl z-40 rounded-b-2xl"
          >
            <Link href="/" className="block text-white text-xl hover:text-violet-300 transition">Home</Link>
            <Link href="/articoli" className="block text-violet-400 text-xl font-bold">Articoli</Link>
            <Link href="/soluzioni" className="block text-white text-xl hover:text-violet-300 transition">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white text-xl hover:text-violet-300 transition">Chi Siamo</Link>
            <Link href="/contatti" className="block text-white text-xl hover:text-violet-300 transition">Contatti</Link>
          </motion.nav>
        )}
      </header>

      {/* ---------------------------------------------------------
          SEZIONE HERO
      --------------------------------------------------------- */}
      <section className="pt-32 pb-20 text-center bg-gradient-to-b from-blue-950 via-black to-blue-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_70%)]"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative max-w-4xl mx-auto px-6"
        >
          <h2 className="text-center text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8">
            I Nostri Articoli
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Approfondimenti tech, scenari futuri e analisi pensate per una nuova generazione di innovatori.
          </p>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------
          SEZIONE GRID ARTICOLI
      --------------------------------------------------------- */}
      <section className="py-24 bg-slate-50 text-black flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortedArticles.map((article) => (
              <motion.div
                key={article.slug}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-slate-100"
              >
                {/* Immagine con Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest shadow-lg">
                    {article.date}
                  </div>
                </div>

                {/* Contenuto Card */}
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                    <Link href={`/articoli/${article.slug}`}>{article.title}</Link>
                  </h4>

                  <Link
                      href={`/articoli/${article.title}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-sm uppercase tracking-wider transition-all group/link"
                    ></Link>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                    {article.excerpt}
                  </p>

                  {/* Footer Card */}
                  <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-100">
                    <Link
                      href={`/articoli/${article.slug}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-sm uppercase tracking-wider transition-all group/link"
                    >
                      Leggi di più <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-4 text-slate-400">
                      <Facebook size={18} className="hover:text-purple-400 cursor-pointer transition-colors" />
                      <Instagram size={18} className="hover:text-purple-700 cursor-pointer transition-colors" />
                      <Share2 size={18} className="hover:text-slate-600 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------
          FOOTER
      --------------------------------------------------------- */}
      <footer className="relative mt-auto border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-5 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                NVision Insights™
              </h3>

              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-zinc-100 rounded-full hover:bg-blue-600 hover:text-white text-zinc-500 transition-all duration-200">
                  <Facebook size={18} />
                </a>
                <a href="#" className="p-2 bg-zinc-100 rounded-full hover:bg-blue-600 hover:text-white text-zinc-500 transition-all duration-200">
                  <Instagram size={18} />
                </a>
                <a href="#" className="p-2 bg-zinc-100 rounded-full hover:bg-blue-600 hover:text-white text-zinc-500 transition-all duration-200">
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
                <li><Link href="/" className="text-black hover:text-blue-600 transition-colors duration-200">Home</Link></li>
                <li><Link href="/articoli" className="text-black hover:text-blue-600 transition-colors duration-200">Articoli</Link></li>
                <li><Link href="/soluzioni" className="text-black hover:text-blue-600 transition-colors duration-200">Soluzioni</Link></li>
                <li><Link href="/chisiamo" className="text-black hover:text-blue-600 transition-colors duration-200">Chi Siamo</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]">
                Policy & Cookies
              </h4>

              <ul className="space-y-4 text-sm text-zinc-400 font-light">
                <li><Link href="/privacy" className="text-black hover:text-blue-600 transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-black hover:text-blue-600 transition-colors duration-200">Cookie Policy</Link></li>
                <li><Link href="/terms" className="text-black hover:text-blue-600 transition-colors duration-200">Termini</Link></li>
                <li className="text-black pt-2 text-xs font-mono">
                  P.IVA IT 01234567890
                </li>
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
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
                <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-500 p-1.5 rounded-lg transition-colors duration-200 text-white">
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center space-x-3 text-sm text-black font-light">
                  <Mail size={15} className="text-blue-600 shrink-0" />
                  <span>info@nvisioninsights.it</span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-black font-light">
                  <MapPin size={15} className="text-blue-600 shrink-0" />
                  <span>Innovations Hub, Milano, IT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent mb-8" />

          {/* Copyright + Bottom bar perfettamente allineata */}
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
                <Globe size={12} className="text-blue-500" />
                Italiano
              </span>

              <span className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                Supporto
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}