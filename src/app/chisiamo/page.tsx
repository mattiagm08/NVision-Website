'use client';

// IMPORTAZIONI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu, X, Rocket, ShieldCheck, Target,
  Zap, Globe, Cpu, ArrowRight, CheckCircle2,
  LineChart, Users, Award, Briefcase, Linkedin, Twitter, Mail,
  Sparkles, Code2
} from 'lucide-react';
import Link from 'next/link';
import NBold from '../components/NBold';

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
              <NBold>NVision Insights™</NBold> nasce dalla <NBold>passione per la tecnologia, l&apos;innovazione e la divulgazione. </NBold>La nostra missione è <NBold>portare conoscenza</NBold> e soluzioni concrete alla <NBold>nuova generazione di innovatori.</NBold>
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
                <p className="text-xl ext-slatte-500 font-light leading-relaxed">
                  <NBold>In NVision Insights™</NBold> crediamo che <NBold>la conoscenza tecnologica</NBold>, per essere davvero utile, <NBold>debba essere accessibile, verificata e orientata all&apos;azione</NBold>. Non produciamo contenuto per il volume: ogni analisi, ogni report, ogni soluzione che proponiamo <NBold>è il risultato di un processo rigoroso che unisce dati, esperienza sul campo e visione strategica.</NBold>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    icon: Globe, 
                    label: "Prospettiva Globale", 
                    desc: "Analisi di mercati e tendenze internazionali, con focus sull'ecosistema europeo e mediterraneo." 
                  },
                  { 
                    icon: Cpu, 
                    label: "AI & Tech Intelligence", 
                    desc: "Monitoraggio continuativo delle frontiere tecnologiche con valutazione critica dell'impatto reale." 
                  },
                  { 
                    icon: Sparkles, 
                    label: "Impatto Positivo sulla Società", 
                    desc: "Valutiamo ogni innovazione in base al valore generato per persone, comunità e sostenibilità a lungo termine." 
                  },
                  { 
                    icon: Rocket, 
                    label: "Progresso Tecnologico", 
                    desc: "Individuiamo tecnologie emergenti con reale potenziale di scalabilità e trasformazione nei prossimi anni." 
                  }
                ].map((feature, i) => (
                  <div 
                    key={i} 
                    className="group flex flex-col gap-4 p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold mb-1 tracking-tight">
                        {feature.label}
                      </h5>
                      <p className="text-sm font-light leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── PLATFORM 2026 CARD ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div
                className="relative z-10 overflow-hidden rounded-[3rem] p-[1px] shadow-[0_35px_80px_-10px_rgba(30,58,138,0.5)]"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(15,23,42,1) 40%, rgba(99,102,241,0.3) 100%)' }}
              >
                <div className="bg-slate-950 rounded-[3rem] p-8 md:p-12">

                  {/* FEATURE LIST */}
                  <ul className="space-y-6">
                    {[
                      {
                        icon: <Sparkles size={18} />,
                        color: 'text-violet-400',
                        bg: 'bg-violet-500/10 border-violet-500/20',
                        dot: 'bg-violet-500',
                        domain: 'Content Creation',
                        t: 'Creator Monetization & AI Production Suite',
                        d: "Tool avanzati per influencer e creator: massimizza revenue, analizza le performance dei tuoi contenuti e sfrutta pipeline AI-driven per produrre output di qualità in un ecosistema dove l'intelligenza artificiale detta le regole.",
                      },
                      {
                        icon: <Code2 size={18} />,
                        color: 'text-blue-400',
                        bg: 'bg-blue-500/10 border-blue-500/20',
                        dot: 'bg-blue-500',
                        domain: 'Software Development',
                        t: 'Applicazioni con Impatto Reale sulla Società',
                        d: "Progetti software sviluppati per generare valore tangibile: dalle utility quotidiane allo sviluppo di videogiochi e piattaforme di intrattenimento, ogni riga di codice è scritta per migliorare concretamente la vita delle persone.",
                      },
                      {
                        icon: <Globe size={18} />,
                        color: 'text-emerald-400',
                        bg: 'bg-emerald-500/10 border-emerald-500/20',
                        dot: 'bg-emerald-500',
                        domain: 'Advantages through Knowledge',
                        t: 'Vantaggio Competitivo attraverso la Conoscenza Condivisa',
                        d: "Ogni contenuto su NVision è costruito per darti un vantaggio reale: conoscenza selezionata, validata e condivisa da milioni di esperti globali, perché informarsi bene non è un'opzione, è il tuo asset più prezioso.",
                      },
                    ].map((item, i) => (
                      <li key={i} className="group flex gap-4 items-start">

                        {/* ICON BADGE */}
                        <div className={`flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center border ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                          {item.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* DOMAIN TAG + TITLE */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${item.color}`}>{item.domain}</span>
                          </div>
                          <p className="text-white font-bold text-base tracking-tight leading-snug group-hover:text-blue-300 transition-colors duration-200 mb-1">
                            {item.t}
                          </p>
                          <p className="text-slate-400 text-sm font-light leading-snug">
                            {item.d}
                          </p>
                        </div>

                      </li>
                    ))}
                  </ul>

                  {/* STATS STRIP */}
                  <div className="mt-10 grid grid-cols-3 gap-3">
                    {[
                      { val: '500+', label: 'Tool testati' },
                      { val: '120+', label: 'App rilasciate' },
                      { val: '2M+',  label: 'Persone avvantaggiate' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-3 text-center">
                        <p className="text-white font-black text-xl tracking-tight">{s.val}</p>
                        <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <Link
                      href="/soluzioni"
                      className="group relative flex items-center justify-center w-full py-4 rounded-2xl overflow-hidden font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
                    >
                      <span className="relative z-10 flex items-center gap-3 text-white">
                        Esplora le Soluzioni
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-200" />
                      </span>
                      {/* SHIMMER ON HOVER */}
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-all duration-700" />
                    </Link>
                  </div>

                </div>
              </div>

              {/* GLOW BLOBS */}
              <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-600/25 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-indigo-500/20 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute top-1/2 -right-8 w-32 h-32 bg-violet-600/15 rounded-full blur-[60px] pointer-events-none" />
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
              Un collettivo di <NBold>strateghi, ricercatori, ingegneri e comunicatori</NBold> uniti da una visione comune: <strong className="text-slate-800 font-semibold">rendere l&apos;innovazione comprensibile e accessibile.</strong>
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
                    <h4 className="text-xl font-black tracking-tight leading-tight group-hover:text-blue-700 transition-colors">{member.name}</h4>
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
                  <p className="text-sm font-light leading-relaxed mb-5">{member.bio}</p>

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