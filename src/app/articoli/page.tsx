/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Share2, ArrowRight, Facebook, Instagram, Mail, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';
import articlesData from '../../../resources/articles.json';
import { useRouter } from "next/navigation";
{/* ---------------------------------------------------------
    FOOTER (tema blu + animazioni da footer viola)
--------------------------------------------------------- */}

const vpS = { once: false, amount: 0.2 };

const footerNavLinks = [
  { href: "/", label: "Home" },
  { href: "/articoli", label: "Articoli" },
  { href: "/soluzioni", label: "Soluzioni" },
  { href: "/chisiamo", label: "Chi Siamo" },
];

const footerSocials = [
  { Icon: Facebook },
  { Icon: Instagram },
  { Icon: Share2 },
];

export default function Articoli() {
  const router = useRouter();
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
                      <Facebook size={18} className="hover:text-blue-700 cursor-pointer transition-colors" />
                      <Instagram size={18} className="hover:text-blue-700 cursor-pointer transition-colors" />
                      <Share2 size={18} className="hover:text-blue-700 cursor-pointer transition-colors" />
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
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-6 relative z-10">

          {/*
            ─── MOBILE FOOTER: layout completamente ridisegnato ────────────────
            Su mobile: stack verticale con separatori chiari, spaziatura generosa,
            testo leggibile, social ben visibili, newsletter in fondo.
            Su desktop: grid a 4 colonne identico a prima.
          */}

          {/* ── MOBILE LAYOUT (block md:hidden) ── */}
          <div className="md:hidden space-y-10">

            {/* Brand */}
            <div className="text-center space-y-4 pb-8 border-b border-zinc-200">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vpS}
                transition={{ duration: 0.5 }}
                className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
              >
                NVision Insights™
              </motion.h3>
              <p className="text-zinc-500 text-sm font-light max-w-xs mx-auto">
                Tecnologia, divulgazione e innovazione per la prossima generazione di leader digitali.
              </p>
              {/* Socials centrati e grandi su mobile */}
              <div className="flex justify-center space-x-4 pt-2">
                {footerSocials.map(({ Icon }, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={vpS}
                    transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 260, damping: 13 }}
                    className="p-3 bg-zinc-100 rounded-full hover:bg-blue-600 hover:text-white text-zinc-600 transition-all duration-200 shadow-sm"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigazione + Policy su due colonne affiancate */}
            <div className="grid grid-cols-2 gap-8 pb-8 border-b border-zinc-200">
              <div>
                <h4 className="text-black font-bold mb-4 text-xs uppercase tracking-[0.15em]">Navigazione</h4>
                <ul className="space-y-3 text-sm">
                  {footerNavLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-zinc-600 hover:text-blue-600 transition-colors duration-200 font-light">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-black font-bold mb-4 text-xs uppercase tracking-[0.15em]">Policy</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { href: "/privacy", label: "Privacy Policy" },
                    { href: "/cookies", label: "Cookie Policy" },
                    { href: "/terms", label: "Termini" },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-zinc-600 hover:text-blue-600 transition-colors duration-200 font-light">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className="text-zinc-400 text-xs font-mono pt-1">P.IVA IT 01234567890</li>
                </ul>
              </div>
            </div>

            {/* Contatti + Newsletter */}
            <div className="space-y-5 pb-8 border-b border-zinc-200">
              <h4 className="text-black font-bold text-xs uppercase tracking-[0.15em]">Contattaci</h4>
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
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <Mail size={15} className="text-blue-600 shrink-0" />
                  <span>info@nvisioninsights.it</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <MapPin size={15} className="text-blue-600 shrink-0" />
                  <span>Innovations Hub, Milano, IT</span>
                </div>
              </div>
            </div>

            {/* Copyright mobile */}
            <div className="flex flex-col items-center gap-3 text-xs text-zinc-500">
              <p className="text-center font-light">
                © {new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
              </p>
              <div className="flex items-center gap-4">
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

          {/* ── DESKTOP LAYOUT (hidden md:block) — IDENTICO ALL'ORIGINALE ── */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

              {/* Brand + Socials */}
              <div className="space-y-6">
                <motion.h3
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vpS}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
                >
                  NVision Insights™
                </motion.h3>

                <div className="flex space-x-3">
                  {footerSocials.map(({ Icon }, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      initial={{ scale: 0, opacity: 0, rotate: -180 }}
                      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                      viewport={vpS}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 260,
                        damping: 13,
                      }}
                      className="p-2 bg-zinc-100 rounded-full hover:bg-blue-600 hover:text-white text-zinc-500 transition-all duration-200"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Navigazione */}
              <div>
                <motion.h4
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vpS}
                  transition={{ duration: 0.4 }}
                  className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]"
                >
                  Navigazione
                </motion.h4>

                <ul className="space-y-4 text-sm text-zinc-400 font-light">
                  {footerNavLinks.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={vpS}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        className="text-black hover:text-blue-600 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <motion.h4
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vpS}
                  transition={{ duration: 0.4 }}
                  className="text-black font-bold mb-6 text-xs uppercase tracking-[0.15em]"
                >
                  Policy &amp; Cookies
                </motion.h4>

                <ul className="space-y-4 text-sm text-zinc-400 font-light">
                  {[
                    { href: "/privacy", label: "Privacy Policy" },
                    { href: "/cookies", label: "Cookie Policy" },
                    { href: "/terms", label: "Termini" },
                  ].map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={vpS}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        className="text-black hover:text-blue-600 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}

                  <motion.li
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={vpS}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-black pt-2 text-xs font-mono"
                  >
                    P.IVA IT 01234567890
                  </motion.li>
                </ul>
              </div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vpS}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h4 className="text-black font-bold text-xs uppercase tracking-[0.15em]">
                  Contattaci
                </h4>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="La tua email"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  />
                  return (
                    <button
                      onClick={() => router.push("/contatti")}
                      className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                    >
                      <ArrowRight size={16} />
                    </button>
                  );
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
              </motion.div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-8" />

            {/* Copyright centrato */}
            <div className="grid grid-cols-3 items-center text-xs text-black font-light mb-4">
              <div />

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                © {new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
              </motion.p>

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

        </div>
      </footer>
    </main>
  );
}
