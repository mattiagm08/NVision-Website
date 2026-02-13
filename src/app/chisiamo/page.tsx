'use client';

// IMPORTAZIONI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, X, Rocket, ShieldCheck, Target, 
  Zap, Globe, Cpu, ArrowRight, CheckCircle2 
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
      <section className="pt-32 pb-20 text-center bg-gradient-to-b from-blue-950 via-black to-blue-900 relative">
        {/* EFFETTO VISIVO BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.25),transparent_70%)] pointer-events-none"></div>
        
        {/* CONTENUTO HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative max-w-4xl mx-auto px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-xl text-white">
            Chi Siamo
          </h2>
          <p className="text-lg sm:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            NVision Insights™ nasce dalla passione per la tecnologia, l’innovazione e la divulgazione. La nostra missione è portare conoscenza e soluzioni concrete alla nuova generazione di innovatori.
          </p>
        </motion.div>
      </section>


      {/* ---------------------------------------------------------
          SEZIONE CORE & BEYOND (AREA DI LAVORO)
      --------------------------------------------------------- */}
      <section className="py-24 bg-slate-50 text-slate-900 flex-grow relative overflow-hidden">
        {/* DECORAZIONI BACKGROUND */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* TITOLO SEZIONE */}
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
              Andiamo oltre la superficie per costruire architetture di valore che resistono alla prova del tempo.
            </p>
          </motion.div>

          {/* GRID MISSION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
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
                    <p className="text-blue-50/70 font-light leading-relaxed text-sm relative z-10">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* SEZIONE NARRATIVA: DIGITAL HUMANISM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* TESTO A SINISTRA */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-10"
            >
              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.15]">
                  &quot;La tecnologia è il mezzo, <br />
                  <span className="text-blue-600">l&apos;uomo è il fine.&quot;</span>
                </h3>
                <p className="text-xl text-slate-500 font-light leading-relaxed">
                  Sosteniamo il <strong className="text-slate-900 font-semibold underline decoration-blue-500/30 underline-offset-4">Digital Humanism</strong>: un approccio dove l&apos;innovazione non sovrasta l&apos;individuo, ma ne potenzia le capacità creative e decisionali.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Globe, label: "Eco-sistema Globale", desc: "Soluzioni senza confini geografici." },
                  { icon: Cpu, label: "AI Ethic Intelligence", desc: "Algoritmi progettati con responsabilità." }
                ].map((feature, i) => (
                  <div key={i} className="group flex flex-col gap-4 p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 mb-1 tracking-tight">{feature.label}</h5>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* MINDSET CARD A DESTRA */}
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
                      <h4 className="text-white text-3xl font-black tracking-tight mb-2 italic">Mindset</h4>
                      <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-[10px] text-blue-400 font-black uppercase tracking-widest">
                      Standard v.2.6
                    </div>
                  </div>

                  <ul className="space-y-8">
                    {[
                      { t: "Focus High-End", d: "Sartorialità tecnica applicata a ogni progetto." },
                      { t: "Evoluzione Continua", d: "Sperimentazione attiva su AI Generativa e Web3." },
                      { t: "Tangible Impact", d: "Misuriamo il successo attraverso risultati concreti." }
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
                        Analizza Soluzioni <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* GLOW DECORATIVI CARD */}
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>
            </motion.div>
          </div>
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