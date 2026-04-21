'use client';

// IMPORTAZIONI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu, X, Rocket, ShieldCheck, Target,
  Zap, Globe, Cpu, ArrowRight, CheckCircle2,
  LineChart, Users, Award, Briefcase, Linkedin, Twitter, Mail
} from 'lucide-react';
import Link from 'next/link';

export default function ChiSiamo() {

  // STATI PER IL MENU MOBILE
  const [menuOpen, setMenuOpen] = useState(false);

  // DATI MISSION
  const missionCards = [
    { icon: Rocket, title: "Innovazione", bg: "from-blue-600 to-blue-700", text: "Non seguiamo i trend, li definiamo attraverso analisi critiche e R&D costante." },
    { icon: Target, title: "Strategia", bg: "from-blue-900 to-slate-900", text: "Ogni pixel e ogni riga di codice hanno lo scopo di generare un vantaggio reale." },
    { icon: Zap, title: "Agilità", bg: "from-indigo-600 to-blue-800", text: "Risposte rapide e adattamento fluido in mercati che evolvono in millisecondi." },
    { icon: ShieldCheck, title: "Affidabilità", bg: "from-slate-800 to-blue-950", text: "In un mondo di rumore digitale, offriamo la chiarezza di dati verificati." }
  ];

  // DATI TEAM
  const team = [
    {
      name: "Alessandro Ferretti",
      role: "Founder & Chief Strategy Officer",
      bio: "Oltre 12 anni di esperienza tra consulenza strategica, venture capital e digital transformation. Ha guidato progetti per istituzioni finanziarie e scale-up tecnologiche in tutta Europa.",
      tags: ["Digital Strategy", "Venture Capital", "AI Policy"],
      initials: "AF",
      gradient: "from-blue-600 to-indigo-700",
    },
    {
      name: "Martina Conti",
      role: "Head of Research & Analytics",
      bio: "Specializzata in data science applicata ai mercati emergenti. Ha collaborato con centri di ricerca europei e pubblicato studi sull'impatto dell'intelligenza artificiale nei modelli di business B2B.",
      tags: ["Data Science", "Market Research", "AI Ethics"],
      initials: "MC",
      gradient: "from-indigo-700 to-slate-800",
    },
    {
      name: "Lorenzo Bianchi",
      role: "Lead Engineer & CTO",
      bio: "Architetto software con background in sistemi distribuiti e cloud-native. Ha progettato infrastrutture ad alta disponibilità per piattaforme con milioni di utenti attivi.",
      tags: ["Cloud Architecture", "MLOps", "Web3"],
      initials: "LB",
      gradient: "from-slate-700 to-blue-900",
    },
    {
      name: "Sofia Marchetti",
      role: "Editorial Director",
      bio: "Giornalista e content strategist con radici nel tech journalism internazionale. Coordina la produzione editoriale di NVision garantendo rigore informativo e accessibilità della conoscenza.",
      tags: ["Content Strategy", "Tech Journalism", "Brand Voice"],
      initials: "SM",
      gradient: "from-blue-900 to-indigo-900",
    },
  ];

  // DATI NUMERI / STATS
  const stats = [
    { value: "150+", label: "Analisi pubblicate", icon: LineChart },
    { value: "40+", label: "Partner strategici", icon: Briefcase },
    { value: "12k+", label: "Lettori mensili", icon: Users },
    { value: "4", label: "Anni di eccellenza", icon: Award },
  ];

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
            <Link href="/chisiamo" className="text-blue-300 font-medium">Chi siamo</Link>
            <Link href="/contatti" className="block text-white hover:text-blue-300 transition-colors">Contatti</Link>
          </nav>
        </div>

        {/* MENU A DISCESA (MOBILE) */}
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
            <Link href="/chisiamo" className="block text-blue-300 text-xl font-bold">Chi siamo</Link>
            <Link href="/contatti" className="block text-white text-xl hover:text-blue-300 transition">Contatti</Link>
          </motion.nav>
        )}
      </header>


      {/* ---------------------------------------------------------
          SEZIONE HERO
      --------------------------------------------------------- */}
      <section className="pb-17 text-center bg-gradient-to-b from-blue-950 via-black to-blue-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.25),transparent_70%)] pointer-events-none"></div>
      </section>


      {/* ---------------------------------------------------------
          SEZIONE CORE & MISSION
      --------------------------------------------------------- */}
      <section className="pt-24 pb-10 bg-slate-50 text-slate-900 relative overflow-hidden">
        {/* DECORAZIONI */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* TITOLO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h3 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-8">
              Definiamo il <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Futuro Digitale</span>
            </h3>
            <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed">
              NVision Insights™ nasce dalla passione per la tecnologia, l&apos;innovazione e la divulgazione. La nostra missione è portare conoscenza e soluzioni concrete alla nuova generazione di innovatori.
            </p>
          </motion.div>

          {/* GRID MISSION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {missionCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -12 }}
                  className={`relative group bg-gradient-to-br ${item.bg} p-1 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-blue-200/50`}
                >
                  <div className="bg-slate-900/10 backdrop-blur-sm h-full w-full rounded-[2.4rem] p-10 flex flex-col items-start overflow-hidden relative">
                    <Icon className="absolute -right-6 -bottom-6 text-white opacity-[0.07] group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700" size={160} />
                    <div className="mb-8 relative">
                      <div className="absolute inset-0 bg-white/20 blur-xl rounded-full group-hover:bg-white/40 transition-colors"></div>
                      <div className="relative p-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md text-white shadow-inner">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform">{item.title}</h4>
                    <p className="text-blue-50/70 font-light leading-relaxed text-sm relative z-10">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ---------------------------------------------------------
              SEZIONE MANIFESTO PROFESSIONALE
          --------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-16">

            {/* TESTO */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-10"
            >
              <div className="space-y-6">
                <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-blue-500 border border-blue-200 bg-blue-50 px-4 py-1.5 rounded-full">
                  Il nostro approccio
                </span>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.15]">
                  Rigore analitico.<br />
                  <span className="text-blue-600">Impatto misurabile.</span>
                </h3>
                <p className="text-xl text-slate-500 font-light leading-relaxed">
                  In NVision Insights™ crediamo che la conoscenza tecnologica, per essere davvero utile, debba essere <strong className="text-slate-800 font-semibold">accessibile, verificata e orientata all&apos;azione</strong>. Non produciamo contenuto per il volume: ogni analisi, ogni report, ogni soluzione che proponiamo è il risultato di un processo rigoroso che unisce dati, esperienza sul campo e visione strategica.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Globe, label: "Prospettiva Globale", desc: "Analisi di mercati e tendenze internazionali, con focus sull'ecosistema europeo e mediterraneo." },
                  { icon: Cpu, label: "AI & Tech Intelligence", desc: "Monitoraggio continuativo delle frontiere tecnologiche con valutazione critica dell'impatto reale." }
                ].map((feature, i) => (
                  <div key={i} className="group flex flex-col gap-4 p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 mb-1 tracking-tight">{feature.label}</h5>
                      <p className="text-sm text-slate-400 font-light leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* STANDARD CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="relative z-10 overflow-hidden bg-slate-950 rounded-[3rem] p-1 shadow-[0_35px_60px_-15px_rgba(30,58,138,0.4)]">
                <div className="bg-slate-900 rounded-[2.9rem] p-8 md:p-12 border border-white/5">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h4 className="text-white text-3xl font-black tracking-tight mb-2 italic">Standard</h4>
                      <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-[10px] text-blue-400 font-black uppercase tracking-widest">
                      v.2.6 — 2025
                    </div>
                  </div>

                  <ul className="space-y-8">
                    {[
                      { t: "Analisi Evidence-Based", d: "Ogni affermazione è supportata da dati verificabili e fonti primarie." },
                      { t: "Indipendenza Editoriale", d: "Nessun conflitto d'interesse. Solo prospettive genuine e senza filtri commerciali." },
                      { t: "Aggiornamento Continuo", d: "I nostri contenuti evolvono con il mercato: nessun report rimane statico." }
                    ].map((list, i) => (
                      <li key={i} className="flex gap-5 items-start group">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 size={20} className="text-blue-500 group-hover:scale-125 transition-transform" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-white font-bold text-lg tracking-tight leading-none group-hover:text-blue-400 transition-colors">{list.t}</p>
                          <p className="text-slate-400 text-sm font-light leading-snug">{list.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12">
                    <Link href="/soluzioni" className="group relative flex items-center justify-center w-full py-4 bg-white text-slate-950 font-black rounded-2xl overflow-hidden transition-all hover:pr-8 active:scale-[0.98]">
                      <span className="relative z-10 flex items-center gap-3 text-sm uppercase tracking-widest">
                        Esplora le Soluzioni <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------------
          SEZIONE NUMERI / STATS
      --------------------------------------------------------- */}
      <section className="py-14 bg-gradient-to-br from-blue-950 via-slate-950 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,80,255,0.15),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-3 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mb-2">
                    <Icon size={24} />
                  </div>
                  <span className="text-5xl font-black text-white tracking-tight">{s.value}</span>
                  <span className="text-blue-300/70 text-sm uppercase tracking-widest font-medium">{s.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------------
          SEZIONE TEAM / CHI SIAMO
      --------------------------------------------------------- */}
      <section className="pt-14 pb-28 bg-slate-50 text-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* HEADER SEZIONE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-blue-500 border border-blue-200 bg-blue-50 px-4 py-1.5 rounded-full mb-5">
              Le Menti Dietro la Visione
            </span>

            <h3 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter leading-tight mb-6">
              Il Nostro Team
            </h3>

            <p className="text-slate-700 font-light text-lg leading-relaxed">
              Un collettivo di strateghi, ricercatori, ingegneri e comunicatori uniti da una visione comune: <strong className="text-slate-800 font-semibold">rendere l&apos;innovazione comprensibile e accessibile.</strong>
            </p>
          </div>
          </motion.div>

          {/* GRID TEAM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white border border-slate-100 hover:border-blue-200 rounded-[2.5rem] p-8 shadow-md hover:shadow-2xl hover:shadow-blue-100/60 transition-all duration-500 overflow-hidden flex gap-7 items-start"
              >
                {/* GLOW BG */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-50/60 to-indigo-50/30 pointer-events-none rounded-[2.5rem]"></div>

                {/* AVATAR */}
                <div className={`flex-shrink-0 w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-black shadow-lg`}>
                  {member.initials}
                </div>

                {/* CONTENT */}
                <div className="relative z-10 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-700 transition-colors">{member.name}</h4>
                    {/* SOCIAL ICONS PLACEHOLDER */}
                    <div className="flex gap-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors">
                        <Linkedin size={13} />
                      </span>
                      <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors">
                        <Twitter size={13} />
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-blue-500 mb-4">{member.role}</p>
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-5">{member.bio}</p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2">
                    {member.tags.map((tag, t) => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* COLLABORAZIONI CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-blue-300/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none"></div>
            <div className="relative z-10">
              <h4 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Collabora con noi.</h4>
              <p className="text-blue-100/80 font-light text-lg max-w-lg leading-relaxed">
                Siamo sempre aperti a nuove collaborazioni con professionisti, ricercatori e aziende che condividono la nostra visione. Costruiamo insieme qualcosa di significativo.
              </p>
            </div>
            <Link
              href="/contatti"
              className="flex-shrink-0 relative z-10 flex items-center gap-3 bg-white text-blue-700 font-black text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-blue-50 active:scale-[0.97] transition-all duration-200 shadow-xl group whitespace-nowrap"
            >
              <Mail size={16} />
              Scrivici ora
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
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