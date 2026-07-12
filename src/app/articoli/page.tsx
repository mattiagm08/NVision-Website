/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Share2, ArrowRight, Facebook, Instagram, Mail, MapPin, Globe, Search, ListFilter, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import articlesData from '../../../resources/articles.json';
import { useRouter, usePathname } from 'next/navigation';

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

// Aggiunto "type" per poter agganciare la logica di condivisione corretta
// ad ogni icona (stesso pattern usato in homepage).
const footerSocials = [
  { Icon: Facebook, type: "facebook" },
  { Icon: Instagram, type: "instagram" },
  { Icon: Share2, type: "share" },
];

const searchFieldOptions = [
  { value: 'titolo', label: 'Titolo' },
  { value: 'categoria', label: 'Categoria' },
  { value: 'data', label: 'Data' },
];

const monthNames = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
];

const weekdayLabels = ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'];

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

export default function Articoli() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('titolo');

  // Pannello a comparsa: lista categorie oppure mini calendario, in base al campo selezionato
  const [panelOpen, setPanelOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear());

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
  

  const sortedArticles = useMemo(() => {
    return [...articlesData].sort((a, b) => {
      const [dayA, monthA, yearA] = a.publicationDate.split('/').map(Number);
      const [dayB, monthB, yearB] = b.publicationDate.split('/').map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA).getTime();
      const dateB = new Date(yearB, monthB - 1, dayB).getTime();

      return dateB - dateA;
    });
  }, []);

  // Lista delle categorie disponibili, generata ad ogni render da tutti gli articoli presenti
  const availableCategories = useMemo(() => {
    const categories = articlesData.map((a) => a.category).filter(Boolean);
    return Array.from(new Set(categories)).sort((a, b) => a.localeCompare(b));
  }, []);

  // Giorni del mese/anno attualmente mostrato nel mini calendario che contengono almeno un articolo
  const articleDaysInMonth = useMemo(() => {
    const set = new Set();
    articlesData.forEach((article) => {
      const [day, month, year] = article.publicationDate.split('/').map(Number);
      if (month - 1 === calendarMonth && year === calendarYear) {
        set.add(day);
      }
    });
    return set;
  }, [calendarMonth, calendarYear]);

  const daysInMonthCount = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstWeekday = new Date(calendarYear, calendarMonth, 1).getDay();
  const leadingBlanks = (firstWeekday + 6) % 7; // settimana che inizia di Lunedì

  const handlePrevMonth = () => {
    setCalendarMonth((prev) => {
      if (prev === 0) {
        setCalendarYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCalendarMonth((prev) => {
      if (prev === 11) {
        setCalendarYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleSelectDay = (day: number) => {
    const dd = String(day).padStart(2, '0');
    const mm = String(calendarMonth + 1).padStart(2, '0');
    setSearchQuery(`${dd}/${mm}/${calendarYear}`);
    setPanelOpen(false);
  };

  // Filtro di ricerca: per Titolo, Categoria o Data (in base al campo selezionato). Se la barra è vuota, mostra tutto.
  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return sortedArticles;

    return sortedArticles.filter((article) => {
      if (searchField === 'categoria') {
        const category = article.category?.toLowerCase() || '';
        return category.includes(query);
      }
      if (searchField === 'data') {
        const data = article.publicationDate?.toLowerCase() || '';
        return data.includes(query);
      }
      // default: titolo
      const title = article.title?.toLowerCase() || '';
      return title.includes(query);
    });
  }, [searchQuery, searchField, sortedArticles]);

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

          {/* ---------------------------------------------------------
              BARRA DI RICERCA (Titolo / Categoria / Data)
          --------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 flex justify-center"
          >
            <div className="relative w-full max-w-2xl group">
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-200/40 via-blue-100/30 to-blue-200/40 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="relative flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 bg-white border border-slate-300 rounded-2xl shadow-sm hover:shadow-md focus-within:shadow-lg focus-within:border-blue-400 transition-all duration-300 overflow-hidden">

                {/* Campo di input */}
                <div className="flex items-center flex-grow px-5 py-4">
                  <Search size={20} className="text-blue-500 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Cerca per ${searchField === 'titolo' ? 'titolo' : searchField === 'categoria' ? 'categoria' : 'data (gg/mm/aaaa)'}...`}
                    className="w-full bg-transparent outline-none border-none px-4 text-sm sm:text-base text-slate-800 placeholder-slate-400 font-light"
                  />

                  {/* Toggle lista categorie disponibili */}
                  {searchField === 'categoria' && (
                    <button
                      type="button"
                      onClick={() => setPanelOpen((prev) => !prev)}
                      className={`shrink-0 p-1.5 rounded-lg transition-colors duration-200 mr-1 ${
                        panelOpen ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-blue-600'
                      }`}
                      aria-label="Mostra categorie disponibili"
                    >
                      <ListFilter size={18} />
                    </button>
                  )}

                  {/* Toggle mini calendario */}
                  {searchField === 'data' && (
                    <button
                      type="button"
                      onClick={() => setPanelOpen((prev) => !prev)}
                      className={`shrink-0 p-1.5 rounded-lg transition-colors duration-200 mr-1 ${
                        panelOpen ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-blue-600'
                      }`}
                      aria-label="Apri calendario"
                    >
                      <CalendarDays size={18} />
                    </button>
                  )}

                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-blue-600 transition-colors duration-200 shrink-0"
                      aria-label="Cancella ricerca"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Separatore verticale (solo desktop) */}
                <div className="hidden sm:block w-px bg-slate-200 my-3" />

                {/* Selettore campo di ricerca: Titolo / Categoria / Data (pillole animate) */}
                <div className="flex items-center gap-1 px-2 py-2 sm:py-2 sm:pr-2">
                  <div className="relative flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                    {searchFieldOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSearchField(option.value);
                          setPanelOpen(false);
                        }}
                        className={`relative z-10 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors duration-300 ${
                          searchField === option.value
                            ? 'text-white'
                            : 'text-slate-500 hover:text-blue-600'
                        }`}
                      >
                        {searchField === option.value && (
                          <motion.div
                            layoutId="searchFieldPill"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="absolute inset-0 bg-blue-600 rounded-lg -z-10"
                          />
                        )}
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------
                  PANNELLO A COMPARSA: lista categorie o mini calendario
              --------------------------------------------------------- */}
              <AnimatePresence>
                {panelOpen && searchField === 'categoria' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 top-full mt-3 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-5"
                  >
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">
                      Categorie disponibili
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.length === 0 && (
                        <span className="text-sm text-slate-400 font-light">Nessuna categoria disponibile</span>
                      )}
                      {availableCategories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSearchQuery(cat);
                            setPanelOpen(false);
                          }}
                          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 border ${
                            searchQuery.toLowerCase() === cat.toLowerCase()
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {panelOpen && searchField === 'data' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 sm:right-auto top-full mt-3 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-5 w-full sm:w-80"
                  >
                    {/* Header mese/anno con navigazione */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors duration-200"
                        aria-label="Mese precedente"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                        {monthNames[calendarMonth]} {calendarYear}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors duration-200"
                        aria-label="Mese successivo"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    {/* Giorni della settimana */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {weekdayLabels.map((wd) => (
                        <span key={wd} className="text-[10px] font-bold text-slate-400 text-center uppercase">
                          {wd}
                        </span>
                      ))}
                    </div>

                    {/* Griglia giorni del mese */}
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: leadingBlanks }).map((_, i) => (
                        <div key={`blank-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonthCount }).map((_, i) => {
                        const day = i + 1;
                        const hasArticle = articleDaysInMonth.has(day);
                        const dd = String(day).padStart(2, '0');
                        const mm = String(calendarMonth + 1).padStart(2, '0');
                        const dateStr = `${dd}/${mm}/${calendarYear}`;
                        const isSelected = searchQuery === dateStr;

                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleSelectDay(day)}
                            className={`relative flex flex-col items-center justify-center h-9 rounded-lg text-xs font-medium transition-colors duration-200 ${
                              isSelected
                                ? 'bg-blue-600 text-white font-bold'
                                : 'text-slate-700 hover:bg-blue-50'
                            }`}
                          >
                            {day}
                            {hasArticle && (
                              <span
                                className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                                  isSelected ? 'bg-white' : 'bg-blue-500'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.map((article) => {
              // URL assoluto dell'articolo, usato da tutti e 3 i pulsanti di condivisione
              const shareUrl = `https://nvisioninsights.it/articoli/${article.slug}`;

              return (
                <motion.div
                  key={article.slug}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-slate-100"
                >
                  {/* Immagine con Overlay */}
                  <div className="relative h-56 overflow-hidden group">

                    <Link href={`/articoli/${article.slug}`} className="block h-full">
                      <img
                        src={article.images?.[0]?.src}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </Link>

                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent pointer-events-none" />

                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest shadow-lg">
                      {article.publicationDate}
                    </div>

                  </div>

                  {/* Contenuto Card */}
                  <div className="p-8 flex flex-col flex-grow">

                    {article.category && (
                      <span className="inline-block mb-3 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-100">
                        {article.category}
                      </span>
                    )}

                    <h4 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                      <Link href={`/articoli/${article.slug}`}>{article.title}</Link>
                    </h4>

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
                        {/* Facebook: apre il popup di condivisione di FB con l'URL dell'articolo */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-700 cursor-pointer transition-colors"
                          aria-label="Condividi su Facebook"
                        >
                          <Facebook size={18} />
                        </a>

                        {/* Instagram: non supporta link diretti di condivisione, quindi copiamo
                            il link negli appunti e apriamo Instagram così l'utente possa incollarlo */}
                        <button
                          type="button"
                          onClick={async () => {
                            await copyToClipboard(shareUrl);
                            window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
                          }}
                          className="hover:text-blue-700 cursor-pointer transition-colors"
                          aria-label="Condividi su Instagram"
                        >
                          <Instagram size={18} />
                        </button>

                        {/* Condivisione nativa del dispositivo (Web Share API), con fallback a copia link */}
                        <button
                          type="button"
                          onClick={() => handleShare(shareUrl, article.title)}
                          className="hover:text-blue-700 cursor-pointer transition-colors"
                          aria-label="Condividi"
                        >
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
                    className="p-3 bg-zinc-100 rounded-full hover:bg-blue-600 hover:text-white text-zinc-600 transition-all duration-200 shadow-sm"
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
                    {/* P.IVA IT 01234567890 */}
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
                  <button
                    onClick={() => router.push("/contatti")}
                    className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                  >
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
                    <span>Catania, Sicily, IT</span>
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