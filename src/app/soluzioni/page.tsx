'use client';

// IMPORTAZIONI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Facebook, Globe, Instagram, Mail, MapPin, Menu, Share2, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const vpS = { once: false, amount: 0.2 };

const footerNavLinks = [
  { href: "/", label: "Home" },
  { href: "/articoli", label: "Articoli" },
  { href: "/soluzioni", label: "Soluzioni" },
  { href: "/chisiamo", label: "Chi Siamo" },
];

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/articoli', label: 'Articoli' },
    { href: '/soluzioni', label: 'Soluzioni' },
    { href: '/chisiamo', label: 'Chi Siamo' },
    { href: '/contatti', label: 'Contattaci' },
  ];

  const mobileNavContainer = {
    hidden: { opacity: 0, y: -16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const mobileNavItem = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

// Aggiunto "type" per agganciare la logica di condivisione corretta ad ogni icona
const footerSocials = [
  { Icon: Facebook, type: "facebook" },
  { Icon: Instagram, type: "instagram" },
  { Icon: Share2, type: "share" },
];

/* ---------------------------------------------------------
    UTILITY DI CONDIVISIONE (stesse identiche della homepage)
--------------------------------------------------------- */
const copyToClipboard = async (text: string) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textarea);

    return success;
  } catch {
    return false;
  }
};

const handleShare = async (url: string, title?: string) => {
  const shareData = {
    title: title ?? "NVision Insights",
    text: title
      ? `Scopri questo articolo su NVision Insights`
      : "Scopri NVision Insights",
    url,
  };

  try {
    if ("share" in navigator && typeof navigator.share === "function") {
      await navigator.share(shareData);
      return;
    }

    const copied = await copyToClipboard(url);

    if (copied) {
      alert("Link copiato negli appunti!");
    }
  } catch (error) {
    console.log("Condivisione annullata", error);
  }
};

export default function Soluzioni() {

  // STATI PER IL MENU MOBILE
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
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
            <Link href="/contatti" className="text-white/70 hover:text-white transition-colors duration-300">Contattaci</Link>
          </nav>
        </div>

        {menuOpen && (
          <motion.nav
              variants={mobileNavContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden absolute top-full left-0 w-full px-3 pb-3 z-40"
            >
              <div
                className="
                  relative overflow-hidden
                  bg-black/95 backdrop-blur-2xl backdrop-saturate-100
                  border border-white/10
                  rounded-3xl
                  shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]
                  px-3 py-4 mt-2
                "
              >
                {/* glow di sfondo sottile, in tema col resto della pagina */}
                <div className="pointer-events-none absolute -top-20 -right-16 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 w-48 h-48 bg-fuchsia-600/10 rounded-full blur-3xl" />

                <ul className="relative flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === '/'
                        ? pathname === '/'
                        : pathname?.startsWith(link.href);

                    return (
                      <motion.li key={link.href} variants={mobileNavItem}>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`
                            relative flex items-center justify-between
                            px-4 py-3.5 rounded-2xl
                            text-lg font-medium
                            transition-colors duration-300
                            ${
                              isActive
                                ? 'bg-white text-black shadow-lg shadow-white/10'
                                : 'text-white/70 hover:text-white hover:bg-white/5'
                            }
                          `}
                        >
                          <span>{link.label}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* linea decorativa in basso */}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-center">
                </div>
              </div>
            </motion.nav>
        )}
      </header>

      {/* ---------------------------------------------------------
          SEZIONE HERO
      --------------------------------------------------------- */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-green-950 via-black/20 to-green-900 text-center relative overflow-hidden">
        {/* EFFETTO VISIVO BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,89,0.15),transparent_70%)] pointer-events-none"></div>
        
        {/* CONTENUTO HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto px-6 relative"
        >
          <h2 className="text-center text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8 whitespace-nowrap">
            Le Nostre Soluzioni
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto">
            Scopri come le nostre soluzioni innovative possono migliorare la tua esperienza e semplificare i processi aziendali.
          </p>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------
          SEZIONE CONTENUTO
      --------------------------------------------------------- */}
      <section className="py-20 text-black flex-grow relative bg-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7e22ce 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <h2 className="text-3xl text-slate-700 mb-8 text-center">Nessuna Soluzione Disponibile.</h2>
      </section>

      {/* ---------------------------------------------------------
          FOOTER AGGIORNATO E CORRETTO (VERDE)
      --------------------------------------------------------- */}
      <footer className="relative mt-auto border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-6 relative z-10">

          {/* ── MOBILE LAYOUT (block md:hidden) ── */}
          <div className="md:hidden space-y-10">

            {/* Brand */}
            <div className="text-center space-y-4 pb-8 border-b border-zinc-200">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vpS}
                transition={{ duration: 0.5 }}
                className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-600"
              >
                NVision Insights™
              </motion.h3>
              <p className="text-zinc-500 text-sm font-light max-w-xs mx-auto">
                Tecnologia, divulgazione e innovazione per la prossima generazione di leader digitali.
              </p>
              {/* Socials centrati e grandi su mobile */}
              <div className="flex justify-center space-x-4 pt-2">
                {footerSocials.map(({ Icon, type }, i) => (
                  <motion.button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();

                      const siteUrl = "https://nvisioninsights.it/";

                      if (type === "facebook") {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }

                      if (type === "instagram") {
                        copyToClipboard(siteUrl);
                        window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
                      }

                      if (type === "share") {
                        handleShare(siteUrl);
                      }
                    }}
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={vpS}
                    transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 260, damping: 13 }}
                    className="p-3 bg-zinc-100 rounded-full hover:bg-green-600 hover:text-white text-zinc-600 transition-all duration-200 shadow-sm"
                  >
                    <Icon size={20} />
                  </motion.button>
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
                      <Link href={item.href} className="text-zinc-600 hover:text-green-600 transition-colors duration-200 font-light">
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
                      <Link href={item.href} className="text-zinc-600 hover:text-green-600 transition-colors duration-200 font-light">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {/* <li className="text-zinc-400 text-xs font-mono pt-1">P.IVA IT 01234567890</li> */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200"
                />
                <button className="absolute right-2 top-2 bg-green-600 hover:bg-green-500 p-1.5 rounded-lg transition-colors duration-200 text-white">
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <Mail size={15} className="text-green-600 shrink-0" />
                  <span>info.nvisioninsights@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <MapPin size={15} className="text-green-600 shrink-0" />
                  <span>Catania, Sicily, IT</span>
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
                  <Globe size={12} className="text-green-500" />
                  Italiano
                </span>
                <span className="hover:text-green-600 transition-colors duration-200 cursor-pointer">
                  Supporto
                </span>
              </div>
            </div>
          </div>

          {/* ── DESKTOP LAYOUT (hidden md:block) ── */}
          <div className="hidden md:block">
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
                  {footerSocials.map(({ Icon, type }, i) => (
                    <motion.a
                      key={i}
                      href={
                        type === "facebook"
                          ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              "https://nvisioninsights.it/"
                            )}`
                          : "#"
                      }
                      target={type === "facebook" ? "_blank" : undefined}
                      rel={type === "facebook" ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (type === "instagram") {
                          e.preventDefault();
                          copyToClipboard("https://nvisioninsights.it/");
                          window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
                        }

                        if (type === "share") {
                          e.preventDefault();
                          handleShare("https://nvisioninsights.it/");
                        }
                      }}
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
                    {/* P.IVA IT 01234567890 */}
                  </motion.li>
                </ul>
              </div>

              {/* Newsletter / Contattaci */}
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
                  <button
                    onClick={() => router.push("/contatti")}
                    className="absolute right-2 top-2 bg-green-600 hover:bg-green-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <Mail size={15} className="text-green-600 shrink-0" />
                    <span>info.nvisioninsights@gmail.com</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <MapPin size={15} className="text-green-600 shrink-0" />
                    <span>Catania, Sicily, IT</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent mb-8" />

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
                  <Globe size={12} className="text-green-500" />
                  Italiano
                </span>
                <span className="hover:text-green-600 transition-colors duration-200 cursor-pointer">
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