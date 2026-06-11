'use client';

// IMPORTAZIONI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu, X, Rocket, ShieldCheck, Target,
  Zap, Globe, Cpu, ArrowRight,
  LineChart, Users, Award, Briefcase, Linkedin, Twitter, Mail,
  Sparkles, Code2, MapPin,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import NBold from '../components/NBold';
import { Facebook, Instagram } from 'lucide-react';
import { useRouter } from "next/navigation";


// ─── VIEWPORT CONFIG (once: false = re-triggers ogni volta) ──────────────────
const vp  = { once: false, amount: 0.2 } as const;
const vpS = { once: false, amount: 0.4 } as const;

// ─── ANIMATED TITLE (copiato dalla home) ─────────────────────────────────────
const AnimatedTitle = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="relative overflow-visible">

    {/* ① Grande cerchio viola — esplode dalla sinistra */}
    <motion.div
      className="absolute -left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-violet-600 pointer-events-none"
      initial={{ x: -130, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, scale: 1, opacity: [0, 0.9, 0.9, 0] }}
      viewport={vp}
      transition={{ duration: 1.1, times: [0, 0.22, 0.65, 1] }}
    />

    {/* ② Cerchio fuchsia — scende diagonale da destra */}
    <motion.div
      className="absolute right-1/3 -top-5 w-9 h-9 rounded-full bg-fuchsia-500 pointer-events-none"
      initial={{ x: 80, y: -80, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 1.0, delay: 0.08, times: [0, 0.25, 0.65, 1] }}
    />

    {/* ③ Quadrato viola che ruota piombando dall'alto */}
    <motion.div
      className="absolute left-[44%] -top-4 w-7 h-7 bg-violet-800 pointer-events-none"
      initial={{ y: -100, rotate: -200, scale: 0, opacity: 0 }}
      whileInView={{ y: 0, rotate: 45, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 1.0, delay: 0.14, times: [0, 0.28, 0.65, 1] }}
    />

    {/* ④ Linea di scansione orizzontale */}
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-400 to-transparent pointer-events-none"
      initial={{ scaleX: 0, originX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: [0, 0.85, 0.85, 0] }}
      viewport={vp}
      transition={{ duration: 0.85, delay: 0.05, times: [0, 0.18, 0.7, 1] }}
    />

    {/* ⑤ Punto bianco — scatta dall'angolo in alto a sinistra */}
    <motion.div
      className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-white pointer-events-none"
      initial={{ x: -50, y: -50, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.04, times: [0, 0.3, 0.6, 1] }}
    />

    {/* ⑥ Triangolo — sale dal basso ruotando */}
    <motion.div
      className="absolute right-[26%] bottom-1 w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[20px] border-b-violet-400 pointer-events-none"
      initial={{ y: 70, scale: 0, opacity: 0, rotate: 180 }}
      whileInView={{ y: 0, scale: 1, opacity: [0, 1, 1, 0], rotate: 0 }}
      viewport={vp}
      transition={{ duration: 1.0, delay: 0.18, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ⑦ Orb glow fuchsia — pulsa a destra */}
    <motion.div
      className="absolute -right-10 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-fuchsia-600 blur-3xl pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: [0, 0.45, 0.45, 0] }}
      viewport={vp}
      transition={{ duration: 1.2, times: [0, 0.2, 0.6, 1] }}
    />

    {/* ⑧ Piccolo quadrato viola — scivola da basso-destra */}
    <motion.div
      className="absolute right-16 bottom-0 w-5 h-5 bg-violet-500 pointer-events-none"
      initial={{ x: 40, y: 40, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.12, times: [0, 0.3, 0.6, 1] }}
    />

    {/* ⑨ Linea verticale accent */}
    <motion.div
      className="absolute left-[30%] top-0 w-[2px] h-full bg-gradient-to-b from-violet-400 to-transparent pointer-events-none"
      initial={{ scaleY: 0, originY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: [0, 0.6, 0.6, 0] }}
      viewport={vp}
      transition={{ duration: 0.7, delay: 0.1, times: [0, 0.2, 0.7, 1] }}
    />

    {/* ⑩ Micro-cerchio fuchsia basso-sinistra */}
    <motion.div
      className="absolute left-[38%] bottom-0 w-3 h-3 rounded-full bg-fuchsia-400 pointer-events-none"
      initial={{ scale: 0, opacity: 0, y: 20 }}
      whileInView={{ scale: 1, opacity: [0, 1, 1, 0], y: 0 }}
      viewport={vp}
      transition={{ duration: 0.7, delay: 0.22, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ─── TESTO EMERGENTE ───────────────────────────────────────────── */}
    <motion.div
      className={`relative z-10 ${className}`}
      initial={{ opacity: 0, y: 36, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={vp}
      transition={{ duration: 0.9, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

// ─── ANIMATED PARAGRAPH (copiato dalla home) ─────────────────────────────────
const AnimatedParagraph = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="relative overflow-visible">

    {/* ① Dot viola da sinistra */}
    <motion.div
      className="absolute -left-3 top-2 w-3 h-3 rounded-full bg-violet-500 pointer-events-none"
      initial={{ x: -30, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 0.7, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ② Dot fuchsia dall'alto-destra */}
    <motion.div
      className="absolute right-1/4 -top-1 w-2.5 h-2.5 rounded-full bg-fuchsia-400 pointer-events-none"
      initial={{ x: 25, y: -20, scale: 0, opacity: 0 }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
      viewport={vp}
      transition={{ duration: 0.6, delay: 0.06, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ③ Mini quadrato che si srotola */}
    <motion.div
      className="absolute left-1/4 bottom-1 w-2.5 h-2.5 bg-violet-700 pointer-events-none"
      initial={{ scale: 0, opacity: 0, rotate: -45 }}
      whileInView={{ scale: 1, opacity: [0, 0.8, 0.8, 0], rotate: 0 }}
      viewport={vp}
      transition={{ duration: 0.6, delay: 0.1, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ④ Sottile sottolineatura che si disegna da sinistra */}
    <motion.div
      className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-violet-400/40 to-transparent pointer-events-none"
      initial={{ scaleX: 0, originX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: [0, 0.7, 0.7, 0] }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.08, times: [0, 0.2, 0.7, 1] }}
    />

    {/* ⑤ Soft glow */}
    <motion.div
      className="absolute right-1/3 bottom-0 w-8 h-8 rounded-full bg-violet-500 blur-lg pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: [0, 0.4, 0.4, 0] }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.15, times: [0, 0.3, 0.65, 1] }}
    />

    {/* ─── TESTO EMERGENTE ───────────────────────────────────────────── */}
    <motion.div
      className={`relative z-10 ${className}`}
      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={vp}
      transition={{ duration: 0.8, delay: 0.38, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

// ─── COMPONENTE PRINCIPALE ───────────────────────────────────────────────────
export default function ChiSiamo() {

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const missionCards = [
    { icon: Rocket, title: "Innovazione", bg: "from-purple-600 to-violet-700", text: "Non seguiamo i trend, li definiamo attraverso analisi critiche e R&D costante.", enterFrom: { x: -40, y: 0 } },
    { icon: Target, title: "Strategia", bg: "from-purple-900 to-slate-900", text: "Ogni pixel e ogni riga di codice hanno lo scopo di generare un vantaggio reale.", enterFrom: { x: 0, y: 20 } },
    { icon: Zap, title: "Agilità", bg: "from-fuchsia-600 to-purple-800", text: "Risposte rapide e adattamento fluido in mercati che evolvono in millisecondi.", enterFrom: { x: 0, y: 20 } },
    { icon: ShieldCheck, title: "Affidabilità", bg: "from-slate-800 to-purple-950", text: "In un mondo di rumore digitale, offriamo la chiarezza di dati verificati.", enterFrom: { x: 40, y: 0 } },
  ];

  const team = [
    {
      name: "Alessandro Ferretti",
      role: "Founder & Chief Strategy Officer",
      bio: "Oltre 12 anni di esperienza tra consulenza strategica, venture capital e digital transformation. Ha guidato progetti per istituzioni finanziarie e scale-up tecnologiche in tutta Europa.",
      tags: ["Digital Strategy", "Venture Capital", "AI Policy"],
      initials: "AF",
      gradient: "from-purple-600 to-indigo-700",
      enterFrom: { x: -25, y: 0 },
    },
    {
      name: "Martina Conti",
      role: "Head of Research & Analytics",
      bio: "Specializzata in data science applicata ai mercati emergenti. Ha collaborato con centri di ricerca europei e pubblicato studi sull'impatto dell'intelligenza artificiale nei modelli di business B2B.",
      tags: ["Data Science", "Market Research", "AI Ethics"],
      initials: "MC",
      gradient: "from-violet-700 to-slate-800",
      enterFrom: { x: 25, y: 0 },
    },
    {
      name: "Lorenzo Bianchi",
      role: "Lead Engineer & CTO",
      bio: "Architetto software con background in sistemi distribuiti e cloud-native. Ha progettato infrastrutture ad alta disponibilità per piattaforme con milioni di utenti attivi.",
      tags: ["Cloud Architecture", "MLOps", "Web3"],
      initials: "LB",
      gradient: "from-slate-700 to-purple-900",
      enterFrom: { x: -25, y: 0 },
    },
    {
      name: "Sofia Marchetti",
      role: "Editorial Director",
      bio: "Giornalista e content strategist con radici nel tech journalism internazionale. Coordina la produzione editoriale di NVision garantendo rigore informativo e accessibilità della conoscenza.",
      tags: ["Content Strategy", "Tech Journalism", "Brand Voice"],
      initials: "SM",
      gradient: "from-purple-900 to-violet-900",
      enterFrom: { x: 25, y: 0 },
    },
  ];

  const stats = [
    { value: "150+", label: "Analisi pubblicate", icon: LineChart },
    { value: "40+", label: "Partner strategici", icon: Briefcase },
    { value: "12k+", label: "Lettori mensili", icon: Users },
    { value: "4", label: "Anni di eccellenza", icon: Award },
  ];

  const footerNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/articoli', label: 'Articoli' },
    { href: '/soluzioni', label: 'Soluzioni' },
    { href: '/chisiamo', label: 'Chi Siamo' },
  ];

  const footerSocials = [
    { Icon: Facebook },
    { Icon: Instagram },
    { Icon: Share2 },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-950 via-black to-violet-900 text-white font-sans overflow-x-hidden">

      {/* ─── NAVBAR ────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/8 shadow-[0_0_40px_rgba(139,92,246,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 select-none">
            <Link href="/">NVision Insights™</Link>
          </h1>
          <button className="md:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className="hidden md:flex space-x-10 text-base font-light tracking-wide">
            <Link href="/" className="text-white/70 hover:text-white transition-colors duration-300">Home</Link>
            <Link href="/articoli" className="text-white/70 hover:text-white transition-colors duration-300">Articoli</Link>
            <Link href="/soluzioni" className="text-white/70 hover:text-white transition-colors duration-300">Soluzioni</Link>
            <Link href="/chisiamo" className="text-white/90 font-semibold">Chi Siamo</Link>
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
            <Link href="/soluzioni" className="block text-white text-xl hover:text-violet-300 transition">Soluzioni</Link>
            <Link href="/chisiamo" className="block text-violet-400 text-xl font-bold">Chi Siamo</Link>
            <Link href="/contatti" className="block text-white text-xl hover:text-violet-300 transition">Contatti</Link>
          </motion.nav>
        )}
      </header>

      {/* ─── HERO SPACER ───────────────────────────────────────────────────────── */}
      <section className="pb-17 text-center bg-gradient-to-b from-purple-950 via-black to-purple-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(150,0,255,0.2),transparent_70%)] pointer-events-none" />
      </section>

      {/* ─── SEZIONE CORE & MISSION ────────────────────────────────────────────── */}
      <section className="pt-24 pb-10 bg-slate-50 text-slate-900 relative overflow-hidden">
        {/* Decorazioni */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7c3aed 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* TITOLO con AnimatedTitle dalla home */}
          <div className="text-center mb-24">
            <AnimatedTitle className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-8">
              Definiamo il{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
                Futuro Digitale
              </span>
            </AnimatedTitle>
            <AnimatedParagraph className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed">
              <NBold>NVision Insights™</NBold> nasce dalla <NBold>passione per la tecnologia, l&apos;innovazione e la divulgazione. </NBold>La nostra missione è <NBold>portare conoscenza</NBold> e soluzioni concrete alla <NBold>nuova generazione di innovatori.</NBold>
            </AnimatedParagraph>
          </div>

          {/* GRID MISSION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {missionCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, ...item.enterFrom }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.25, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -12 }}
                  className={`relative group bg-gradient-to-br ${item.bg} p-1 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-purple-200/50`}
                >
                  {/* Angoli-reticolo */}
                  <motion.div
                    className="absolute top-3 left-3 w-6 h-6 pointer-events-none z-20"
                    style={{ borderTop: '2px solid rgba(139,92,246,0.85)', borderLeft: '2px solid rgba(139,92,246,0.85)', borderTopLeftRadius: 4 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.8, delay: idx * 0.1 + 0.25, times: [0, 0.1, 0.6, 1] }}
                  />
                  <motion.div
                    className="absolute top-3 right-3 w-6 h-6 pointer-events-none z-20"
                    style={{ borderTop: '2px solid rgba(232,121,249,0.85)', borderRight: '2px solid rgba(232,121,249,0.85)', borderTopRightRadius: 4 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.8, delay: idx * 0.1 + 0.3, times: [0, 0.1, 0.6, 1] }}
                  />
                  <motion.div
                    className="absolute bottom-3 left-3 w-6 h-6 pointer-events-none z-20"
                    style={{ borderBottom: '2px solid rgba(139,92,246,0.6)', borderLeft: '2px solid rgba(139,92,246,0.6)', borderBottomLeftRadius: 4 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.8, delay: idx * 0.1 + 0.32, times: [0, 0.1, 0.6, 1] }}
                  />
                  <motion.div
                    className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none z-20"
                    style={{ borderBottom: '2px solid rgba(167,139,250,0.6)', borderRight: '2px solid rgba(167,139,250,0.6)', borderBottomRightRadius: 4 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.8, delay: idx * 0.1 + 0.35, times: [0, 0.1, 0.6, 1] }}
                  />

                  {/* Linea di scansione superiore */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-30 rounded-t-[2.5rem]"
                    initial={{ scaleX: 0, originX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: [0, 0.8, 0.8, 0] }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.0, delay: idx * 0.1 + 0.1, times: [0, 0.15, 0.6, 1] }}
                  />

                  <div className="bg-slate-900/10 backdrop-blur-sm h-full w-full rounded-[2.4rem] p-10 flex flex-col items-start overflow-hidden relative">
                    <Icon className="absolute -right-6 -bottom-6 text-white opacity-[0.07] group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700" size={160} />

                    <div className="relative mb-6 w-fit">
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-violet-400 pointer-events-none"
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: [0.5, 1.6, 2.2], opacity: [0, 0.7, 0] }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{ duration: 1.1, delay: idx * 0.1 + 0.35 }}
                      />
                      <div className="relative p-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md text-white shadow-inner group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform">{item.title}</h4>
                    <p className="text-purple-50/70 font-light leading-relaxed text-sm relative z-10">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ─── SEZIONE MANIFESTO ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-16">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-10"
            >
              <div className="space-y-6">
                <motion.span
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ delay: 0.1, duration: 0.5, type: 'spring', stiffness: 260, damping: 14 }}
                  className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-purple-600 border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full"
                >
                  Il nostro approccio
                </motion.span>

                <AnimatedTitle className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.15]">
                  Rigore analitico.<br />
                  <span className="text-purple-600">Impatto misurabile.</span>
                </AnimatedTitle>

                <AnimatedParagraph className="text-xl text-slate-500 font-light leading-relaxed">
                  <NBold>In NVision Insights™</NBold> crediamo che <NBold>la conoscenza tecnologica</NBold>, per essere davvero utile, <NBold>debba essere accessibile, verificata e orientata all&apos;azione</NBold>. Non produciamo contenuto per il volume: ogni analisi, ogni report, ogni soluzione che proponiamo <NBold>è il risultato di un processo rigoroso che unisce dati, esperienza sul campo e visione strategica.</NBold>
                </AnimatedParagraph>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Globe, label: "Prospettiva Globale", desc: "Analisi di mercati e tendenze internazionali, con focus sull'ecosistema europeo e mediterraneo.", delay: 0 },
                  { icon: Cpu, label: "AI & Tech Intelligence", desc: "Monitoraggio continuativo delle frontiere tecnologiche con valutazione critica dell'impatto reale.", delay: 0.08 },
                  { icon: Sparkles, label: "Impatto Sociale", desc: "Valutiamo ogni innovazione in base al valore generato per persone, comunità e sostenibilità.", delay: 0.16 },
                  { icon: Rocket, label: "Progresso Scalabile", desc: "Individuiamo tecnologie emergenti con reale potenziale di scalabilità e trasformazione.", delay: 0.24 },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex flex-col gap-4 p-6 rounded-3xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent pointer-events-none"
                      initial={{ scaleX: 0, originX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ duration: 1.2, delay: feature.delay + 0.2, times: [0, 0.1, 0.6, 1] }}
                    />
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold mb-1 tracking-tight">{feature.label}</h5>
                      <p className="text-sm font-light leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* PLATFORM CARD */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div
                className="relative z-10 overflow-hidden rounded-[3rem] p-[1px] shadow-[0_35px_80px_-10px_rgba(100,50,200,0.4)]"
                style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.4) 0%, rgba(15,23,42,1) 40%, rgba(139,92,246,0.3) 100%)' }}
              >
                <div className="bg-slate-950 rounded-[3rem] p-8 md:p-12">

                  <ul className="space-y-6">
                    {[
                      {
                        icon: <Sparkles size={18} />,
                        color: 'text-fuchsia-400',
                        bg: 'bg-fuchsia-500/10 border-fuchsia-500/20',
                        dot: 'bg-fuchsia-500',
                        domain: 'Content Creation',
                        t: 'Creator Monetization & AI Production Suite',
                        d: "Tool avanzati per influencer e creator: massimizza revenue, analizza le performance e sfrutta pipeline AI-driven.",
                        delay: 0,
                      },
                      {
                        icon: <Code2 size={18} />,
                        color: 'text-purple-400',
                        bg: 'bg-purple-500/10 border-purple-500/20',
                        dot: 'bg-purple-500',
                        domain: 'Software Development',
                        t: 'Applicazioni con Impatto Reale',
                        d: "Progetti software sviluppati per generare valore tangibile: utility quotidiane e piattaforme di intrattenimento.",
                        delay: 0.1,
                      },
                      {
                        icon: <Globe size={18} />,
                        color: 'text-violet-400',
                        bg: 'bg-violet-500/10 border-violet-500/20',
                        dot: 'bg-violet-500',
                        domain: 'Knowledge Assets',
                        t: 'Vantaggio Competitivo attraverso i Dati',
                        d: "Conoscenza selezionata e validata, perché informarsi bene è il tuo asset strategico più prezioso.",
                        delay: 0.2,
                      },
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{ duration: 0.6, delay: item.delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex gap-4 items-start"
                      >
                        <div className={`flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center border ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${item.color}`}>{item.domain}</span>
                          </div>
                          <p className="text-white font-bold text-base tracking-tight leading-snug group-hover:text-purple-300 transition-colors duration-200 mb-1">{item.t}</p>
                          <p className="text-slate-400 text-sm font-light leading-snug">{item.d}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.6, type: 'spring', stiffness: 220, damping: 14 }}
                    className="mt-10 grid grid-cols-3 gap-3"
                  >
                    {[
                      { val: '500+', label: 'Tool testati' },
                      { val: '120+', label: 'App rilasciate' },
                      { val: '2M+', label: 'Utenti impattati' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-3 text-center">
                        <p className="text-white font-black text-xl tracking-tight">{s.val}</p>
                        <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </motion.div>

                  <div className="mt-8">
                    <Link
                      href="/soluzioni"
                      className="group relative flex items-center justify-center w-full py-4 rounded-2xl overflow-hidden font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)' }}
                    >
                      <span className="relative z-10 flex items-center gap-3 text-white">
                        Esplora le Soluzioni
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-200" />
                      </span>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-all duration-700" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute -top-16 -left-16 w-72 h-72 bg-purple-600/25 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-fuchsia-500/20 rounded-full blur-[90px] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SEZIONE STATS ─────────────────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-br from-purple-950 via-slate-950 to-violet-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(150,50,255,0.15),transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24, ...( i % 2 === 0 ? { x: -20 } : { x: 20 }) }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center gap-3 group relative"
                >
                  <div className="relative w-14 h-14 mb-2">
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-violet-400 pointer-events-none"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: [0.5, 1.6, 2.2], opacity: [0, 0.7, 0] }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 1.1, delay: i * 0.1 + 0.2 }}
                    />
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      <Icon size={24} />
                    </div>
                  </div>
                  <span className="text-5xl font-black text-white tracking-tight">{s.value}</span>
                  <span className="text-purple-300/70 text-sm uppercase tracking-widest font-medium">{s.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SEZIONE TEAM ──────────────────────────────────────────────────────── */}
      <section className="pt-14 pb-28 bg-slate-50 text-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7c3aed 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.05, duration: 0.5, type: 'spring', stiffness: 260, damping: 14 }}
              className="inline-block text-[11px] uppercase tracking-[0.3em] font-bold text-purple-500 border border-purple-200 bg-purple-50 px-4 py-1.5 rounded-full mb-5"
            >
              Le Menti Dietro la Visione
            </motion.span>

            <AnimatedTitle className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter leading-tight mb-6">
              Il Nostro Team
            </AnimatedTitle>

            <AnimatedParagraph className="text-slate-700 font-light text-lg leading-relaxed">
              Un collettivo di <NBold>strateghi, ricercatori e ingegneri</NBold> uniti da una visione comune: <strong className="text-slate-800 font-semibold">rendere l&apos;innovazione comprensibile e accessibile.</strong>
            </AnimatedParagraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, ...member.enterFrom }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative bg-white border border-slate-100 hover:border-purple-200 rounded-[2.5rem] p-8 shadow-md hover:shadow-2xl hover:shadow-purple-100/60 transition-all duration-500 overflow-hidden flex gap-7 items-start"
              >
                {/* Angoli-reticolo */}
                <motion.div
                  className="absolute top-3 left-3 w-6 h-6 pointer-events-none z-20"
                  style={{ borderTop: '2px solid rgba(139,92,246,0.85)', borderLeft: '2px solid rgba(139,92,246,0.85)', borderTopLeftRadius: 4 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.8, delay: idx * 0.1 + 0.25, times: [0, 0.1, 0.6, 1] }}
                />
                <motion.div
                  className="absolute top-3 right-3 w-6 h-6 pointer-events-none z-20"
                  style={{ borderTop: '2px solid rgba(232,121,249,0.85)', borderRight: '2px solid rgba(232,121,249,0.85)', borderTopRightRadius: 4 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.8, delay: idx * 0.1 + 0.3, times: [0, 0.1, 0.6, 1] }}
                />
                <motion.div
                  className="absolute bottom-3 left-3 w-6 h-6 pointer-events-none z-20"
                  style={{ borderBottom: '2px solid rgba(139,92,246,0.6)', borderLeft: '2px solid rgba(139,92,246,0.6)', borderBottomLeftRadius: 4 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.8, delay: idx * 0.1 + 0.32, times: [0, 0.1, 0.6, 1] }}
                />
                <motion.div
                  className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none z-20"
                  style={{ borderBottom: '2px solid rgba(167,139,250,0.6)', borderRight: '2px solid rgba(167,139,250,0.6)', borderBottomRightRadius: 4 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.8, delay: idx * 0.1 + 0.35, times: [0, 0.1, 0.6, 1] }}
                />

                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent pointer-events-none z-30"
                  initial={{ scaleX: 0, originX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: [0, 0.8, 0.8, 0] }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.0, delay: idx * 0.1 + 0.1, times: [0, 0.15, 0.6, 1] }}
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-50/60 to-violet-50/30 pointer-events-none rounded-[2.5rem]" />

                <div className="relative flex-shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-[1.5rem] border-2 border-violet-500 pointer-events-none"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: [0.5, 1.5, 2.0], opacity: [0, 0.7, 0] }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.1, delay: idx * 0.1 + 0.3 }}
                  />
                  <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-black shadow-lg`}>
                    {member.initials}
                  </div>
                </div>

                <div className="relative z-10 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xl font-black tracking-tight leading-tight group-hover:text-purple-700 transition-colors">{member.name}</h4>
                    <div className="flex gap-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:bg-purple-50 cursor-pointer transition-colors">
                        <Linkedin size={13} />
                      </span>
                      <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:bg-purple-50 cursor-pointer transition-colors">
                        <Twitter size={13} />
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-purple-500 mb-4">{member.role}</p>
                  <p className="text-sm font-light leading-relaxed mb-5">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.tags.map((tag, t) => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 rounded-b-[2.5rem]" />
              </motion.div>
            ))}
          </div>

          {/* CTA collaborazioni */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 220, damping: 14 }}
            className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-purple-600 to-violet-700 rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-purple-300/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />

            <motion.div
              className="absolute top-4 left-4 w-7 h-7 pointer-events-none z-20"
              style={{ borderTop: '2px solid rgba(255,255,255,0.5)', borderLeft: '2px solid rgba(255,255,255,0.5)', borderTopLeftRadius: 4 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 2.0, delay: 0.5, times: [0, 0.1, 0.65, 1] }}
            />
            <motion.div
              className="absolute top-4 right-4 w-7 h-7 pointer-events-none z-20"
              style={{ borderTop: '2px solid rgba(255,255,255,0.5)', borderRight: '2px solid rgba(255,255,255,0.5)', borderTopRightRadius: 4 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: [0, 1, 1, 0], scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 2.0, delay: 0.55, times: [0, 0.1, 0.65, 1] }}
            />

            <div className="relative z-10">
              <AnimatedTitle className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
                Collabora con noi.
              </AnimatedTitle>
              <AnimatedParagraph className="text-purple-100/80 font-light text-lg max-w-lg leading-relaxed">
                Siamo sempre aperti a nuove collaborazioni con professionisti e aziende che condividono la nostra visione. Costruiamo insieme il futuro.
              </AnimatedParagraph>
            </div>
            <Link
              href="/contatti"
              className="flex-shrink-0 relative z-10 flex items-center gap-3 bg-white text-purple-700 font-black text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-purple-50 active:scale-[0.97] transition-all duration-200 shadow-xl group whitespace-nowrap"
            >
              <Mail size={16} />
              Scrivici ora
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────────── */}
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
                className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600"
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
                    className="p-3 bg-zinc-100 rounded-full hover:bg-purple-600 hover:text-white text-zinc-600 transition-all duration-200 shadow-sm"
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
                      <Link href={item.href} className="text-zinc-600 hover:text-violet-600 transition-colors duration-200 font-light">
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
                      <Link href={item.href} className="text-zinc-600 hover:text-purple-600 transition-colors duration-200 font-light">
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
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                />
                <button
                  onClick={() => router.push("/contatti")}
                  className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <Mail size={15} className="text-purple-600 shrink-0" />
                  <span>info@nvisioninsights.it</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <MapPin size={15} className="text-purple-600 shrink-0" />
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
                  <Globe size={12} className="text-violet-500" />
                  Italiano
                </span>
                <span className="hover:text-violet-600 transition-colors duration-200 cursor-pointer">
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
                  className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600"
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
                      className="p-2 bg-zinc-100 rounded-full hover:bg-purple-600 hover:text-white text-zinc-500 transition-all duration-200"
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
                        className="text-black hover:text-violet-600 transition-colors duration-200"
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
                        className="text-black hover:text-purple-600 transition-colors duration-200"
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
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                  />
                  <button
                    onClick={() => router.push("/contatti")}
                    className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <Mail size={15} className="text-purple-600 shrink-0" />
                    <span>info@nvisioninsights.it</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <MapPin size={15} className="text-purple-600 shrink-0" />
                    <span>Innovations Hub, Milano, IT</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent mb-8" />

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
                  <Globe size={12} className="text-violet-500" />
                  Italiano
                </span>
                <span className="hover:text-violet-600 transition-colors duration-200 cursor-pointer">
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