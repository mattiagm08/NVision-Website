'use client';

// IMPORTAZIONI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Facebook, Globe, Instagram, Mail, MapPin, Menu, Share2, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";


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

export default function Soluzioni() {

  // STATI PER IL MENU MOBILE
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-950 via-black to-green-950 text-white font-sans">
      
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
            <Link href="/soluzioni" className="text-white/90 font-semibold">Soluzioni</Link>
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
            <Link href="/articoli" className="block text-white text-xl hover:text-violet-300 transition">Articoli</Link>
            <Link href="/soluzioni" className="block text-violet-400 text-xl font-bold">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-white text-xl hover:text-violet-300 transition">Chi Siamo</Link>
            <Link href="/contatti" className="block text-white text-xl hover:text-violet-300 transition">Contatti</Link>
          </motion.nav>
        )}
      </header>


      {/* ---------------------------------------------------------
          SEZIONE HERO
      --------------------------------------------------------- */}

      <section className="pt-32 pb-20 bg-gradient-to-b from-green-950 via-black/20 to-green-900 text-center relative overflow-hidden">
        {/* EFFETTO VISIVO BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0, 255, 89, 0.15),transparent_70%)] pointer-events-none"></div>
        
        {/* CONTENUTO HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto px-6 relative"
        >
          <h2 className="text-center text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8">
            Le Nostre Soluzioni
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto">
            Scopri come le nostre soluzioni innovative possono migliorare la tua esperienza e semplificare i processi aziendali.
          </p>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------
          SEZIONE GRIGLIA SOLUZIONI
      --------------------------------------------------------- 
      <section className="py-20 bg-slate-50 text-black flex-grow relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7e22ce 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="max-w-6xl mx-auto px-6 relative">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-900/10 transition-all group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                   <span className="font-bold text-xl">{i + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-purple-700 transition-colors">{sol.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed font-light">{sol.desc}</p>
                
                <Link href={sol.href} className="inline-flex items-center text-purple-600 hover:text-fuchsia-600 font-bold transition-all gap-2 group/link">
                  Scopri di più
                  <motion.span className="group-hover/link:translate-x-1 transition-transform">→</motion.span>
                </Link>
              </motion.div>
            ))}

          </div>
        </div>
      </section> */}

      <section className="py-20 text-black flex-grow relative bg-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7e22ce 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <h2 className="text-3xl text-slate-700 mb-8 text-center">Nessuna Soluzione Disponibile.</h2>
      </section>


      {/* ---------------------------------------------------------
          FOOTER
      --------------------------------------------------------- */}
      <footer className="relative mt-auto border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-5 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand + Socials */}
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vpS}
                transition={{ duration: 0.6 }}
                className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-600"
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
                    className="p-2 bg-zinc-100 rounded-full hover:bg-green-600 hover:text-white text-zinc-500 transition-all duration-200"
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
                      className="text-black hover:text-green-600 transition-colors duration-200"
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
                      className="text-black hover:text-green-600 transition-colors duration-200"
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

            {/* Contattaci */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200"
                />
                return (
                                                    <button
                                                      onClick={() => router.push("/contatti")}
                                                      className="absolute right-2 top-2 bg-green-600 hover:bg-green-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                                                    >
                                                      <ArrowRight size={16} />
                                                    </button>
                                                  );
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center space-x-3 text-sm text-black font-light">
                  <Mail size={15} className="text-green-600 shrink-0" />
                  <span>info@nvisioninsights.it</span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-black font-light">
                  <MapPin size={15} className="text-green-600 shrink-0" />
                  <span>Innovations Hub, Milano, IT</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent mb-8" />

          {/* Bottom bar perfettamente bilanciata */}
          <div className="grid grid-cols-3 items-center text-xs text-black font-light mb-4">

            {/* left spacer */}
            <div />

            {/* center copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              © {new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
            </motion.p>

            {/* right controls */}
            <div className="flex justify-end items-center space-x-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Globe size={12} className="text-green-500" />
                Italiano
              </span>

              <span className="hover:text-green-600 transition-colors duration-200 cursor-pointer">
                Supporto
              </span>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}
