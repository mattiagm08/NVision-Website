/* eslint-disable @typescript-eslint/no-explicit-any */
 
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, User, Mail, MessageSquare, Phone, Tag, Send, 
  CheckCircle2, Facebook, Instagram, MapPin, ArrowRight, 
  Globe, Share2, AlertCircle, Check, Building2, Loader2, DollarSign 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";


const vpS = { once: false, amount: 0.2 } as const;

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

const budgetOptions = [
  { id: 'low', label: '< 5K €' },
  { id: 'medium', label: '5K - 15K €' },
  { id: 'high', label: '15K - 50K €' },
  { id: 'enterprise', label: '50K € +' },
];

export default function Contatti() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Stato per errore di invio email (lato server)
  const [sendError, setSendError] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    azienda: '',
    oggetto: '',
    budget: '',
    messaggio: '',
    privacy: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: any) => {
    let error = '';
    switch (name) {
      case 'nome':
      case 'cognome':
        if (!value.trim()) error = 'Questo campo è obbligatorio';
        else if (value.trim().length < 2) error = 'Minimo 2 caratteri richiesti';
        else if (/[0-9]/.test(value)) error = 'Non sono ammessi numeri';
        break;
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = 'L\'email è obbligatoria';
        else if (!emailRegex.test(value)) error = 'Inserisci un indirizzo email valido';
        break;
      }
      case 'telefono': {
        const phoneRegex = /^\+?[0-9\s\-]{9,15}$/;
        if (value && !phoneRegex.test(value)) error = 'Numero di telefono non valido (es. +39 333 1234567)';
        break;
      }
      case 'oggetto':
        if (!value) error = 'Seleziona l\'oggetto della tua richiesta';
        break;
      case 'messaggio':
        if (!value.trim()) error = 'Il messaggio non può essere vuoto';
        else if (value.trim().length < 10) error = 'Fornisci qualche dettaglio in più (minimo 10 caratteri)';
        break;
      case 'privacy':
        if (!value) error = 'È necessario accettare l\'informativa sulla privacy';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (touched[name]) validateField(name, val);
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  const handleBudgetSelect = (id: string) => {
    setFormData(prev => ({ ...prev, budget: prev.budget === id ? '' : id }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendError(false);

    const fieldsToValidate = ['nome', 'cognome', 'email', 'telefono', 'oggetto', 'messaggio', 'privacy'];
    const newTouched: Record<string, boolean> = {};
    fieldsToValidate.forEach(field => {
      newTouched[field] = true;
      validateField(field, formData[field as keyof typeof formData]);
    });
    setTouched(newTouched);

    const hasErrors = fieldsToValidate.some(field => {
      if (field === 'nome' || field === 'cognome')
        return !formData[field].trim() || formData[field].trim().length < 2 || /[0-9]/.test(formData[field]);
      if (field === 'email')
        return !formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      if (field === 'oggetto') return !formData.oggetto;
      if (field === 'messaggio')
        return !formData.messaggio.trim() || formData.messaggio.trim().length < 10;
      if (field === 'privacy') return !formData.privacy;
      return false;
    });

    if (hasErrors) {
      const firstErrorEl = document.querySelector('.text-red-500');
      if (firstErrorEl) firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      // ─── Chiamata all'API Route che invia l'email ───────────────────────
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      // ────────────────────────────────────────────────────────────────────

      if (!res.ok) throw new Error('Errore server');

      setSubmitted(true);
      setFormData({
        nome: '', cognome: '', email: '', telefono: '', azienda: '',
        oggetto: '', budget: '', messaggio: '', privacy: false, newsletter: false,
      });
      setTouched({});
      setErrors({});
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setSendError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-950 via-black to-fuchsia-950 text-white font-sans overflow-x-hidden">

      {/* NAVBAR */}
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

      <div className="h-16 bg-black"></div>

      {/* FORM */}
      <section className="py-16 flex-grow relative bg-slate-50 text-slate-900 overflow-hidden">

        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7e22ce 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-fuchsia-200/30 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-tight mb-4">
              Invia una <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">richiesta</span>
            </h3>
            <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed">
              Hai domande o vuoi integrare le nostre soluzioni? Compila il modulo. Rispondiamo sempre in tempi record.
            </p>
          </motion.div>

          <div className="bg-slate-100 mb-12"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-purple-100/40 overflow-hidden"
          >
            {/* Overlay successo */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-fuchsia-700 flex flex-col items-center justify-center text-white p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -185 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-14 h-14 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shadow-inner"
                  >
                    <CheckCircle2 size={48} className="text-white drop-shadow" />
                  </motion.div>
                  <h3 className="text-4xl font-black mb-3 tracking-tight">Messaggio Ricevuto!</h3>
                  <p className="text-purple-100/90 font-light text-lg max-w-md leading-relaxed">
                    I controlli sono andati a buon fine. Un consulente di <strong>NVision Insights</strong> prenderà in carico la tua richiesta entro le prossime 24 ore lavorative.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>

                {/* Errore invio server */}
                <AnimatePresence>
                  {sendError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-5 py-4 rounded-2xl"
                    >
                      <AlertCircle size={18} className="shrink-0" />
                      Si è verificato un errore durante l&apos;invio. Riprova tra qualche istante o contattaci direttamente via email.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Nome e Cognome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* NOME */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-purple-600 ml-1">Nome</label>
                    <div className="relative group">
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.nome && errors.nome ? 'text-red-400' : touched.nome && !errors.nome ? 'text-green-500' : 'text-slate-300 group-focus-within:text-purple-500'}`} size={18} />
                      <input
                        name="nome" type="text" value={formData.nome}
                        onChange={handleChange} onBlur={() => handleBlur('nome')}
                        placeholder="Mario"
                        className={`w-full bg-slate-50 p-4 pl-12 pr-10 rounded-2xl border transition-all text-slate-800 placeholder:text-slate-300 outline-none ${touched.nome && errors.nome ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : touched.nome && !errors.nome ? 'border-green-400 focus:border-green-500' : 'border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10'}`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                        {touched.nome && errors.nome && <AlertCircle size={16} className="text-red-500" />}
                        {touched.nome && !errors.nome && formData.nome && <Check size={16} className="text-green-500" />}
                      </div>
                    </div>
                    <AnimatePresence>
                      {touched.nome && errors.nome && (
                        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-xs text-red-500 font-medium pl-1">{errors.nome}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* COGNOME */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-purple-600 ml-1">Cognome</label>
                    <div className="relative group">
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.cognome && errors.cognome ? 'text-red-400' : touched.cognome && !errors.cognome ? 'text-green-500' : 'text-slate-300 group-focus-within:text-purple-500'}`} size={18} />
                      <input
                        name="cognome" type="text" value={formData.cognome}
                        onChange={handleChange} onBlur={() => handleBlur('cognome')}
                        placeholder="Rossi"
                        className={`w-full bg-slate-50 p-4 pl-12 pr-10 rounded-2xl border transition-all text-slate-800 placeholder:text-slate-300 outline-none ${touched.cognome && errors.cognome ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : touched.cognome && !errors.cognome ? 'border-green-400 focus:border-green-500' : 'border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10'}`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                        {touched.cognome && errors.cognome && <AlertCircle size={16} className="text-red-500" />}
                        {touched.cognome && !errors.cognome && formData.cognome && <Check size={16} className="text-green-500" />}
                      </div>
                    </div>
                    <AnimatePresence>
                      {touched.cognome && errors.cognome && (
                        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-xs text-red-500 font-medium pl-1">{errors.cognome}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Email e Telefono */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* EMAIL */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-purple-600 ml-1">Email</label>
                    <div className="relative group">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.email && errors.email ? 'text-red-400' : touched.email && !errors.email ? 'text-green-500' : 'text-slate-300 group-focus-within:text-purple-500'}`} size={18} />
                      <input
                        name="email" type="email" value={formData.email}
                        onChange={handleChange} onBlur={() => handleBlur('email')}
                        placeholder="mario.rossi@email.it"
                        className={`w-full bg-slate-50 p-4 pl-12 pr-10 rounded-2xl border transition-all text-slate-800 placeholder:text-slate-300 outline-none ${touched.email && errors.email ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : touched.email && !errors.email ? 'border-green-400 focus:border-green-500' : 'border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10'}`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                        {touched.email && errors.email && <AlertCircle size={16} className="text-red-500" />}
                        {touched.email && !errors.email && formData.email && <Check size={16} className="text-green-500" />}
                      </div>
                    </div>
                    <AnimatePresence>
                      {touched.email && errors.email && (
                        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-xs text-red-500 font-medium pl-1">{errors.email}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* TELEFONO */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-purple-600 ml-1">Telefono <span className="text-slate-400 font-normal lowercase">(opzionale)</span></label>
                    <div className="relative group">
                      <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.telefono && errors.telefono ? 'text-red-400' : touched.telefono && !errors.telefono && formData.telefono ? 'text-green-500' : 'text-slate-300 group-focus-within:text-purple-500'}`} size={18} />
                      <input
                        name="telefono" type="tel" value={formData.telefono}
                        onChange={handleChange} onBlur={() => handleBlur('telefono')}
                        placeholder="+39 333 000 0000"
                        className={`w-full bg-slate-50 p-4 pl-12 pr-10 rounded-2xl border transition-all text-slate-800 placeholder:text-slate-300 outline-none ${touched.telefono && errors.telefono ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : touched.telefono && !errors.telefono && formData.telefono ? 'border-green-400 focus:border-green-500' : 'border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10'}`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                        {touched.telefono && errors.telefono && <AlertCircle size={16} className="text-red-500" />}
                        {touched.telefono && !errors.telefono && formData.telefono && <Check size={16} className="text-green-500" />}
                      </div>
                    </div>
                    <AnimatePresence>
                      {touched.telefono && errors.telefono && (
                        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-xs text-red-500 font-medium pl-1">{errors.telefono}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* AZIENDA */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-purple-600 ml-1">Nome Azienda <span className="text-slate-400 font-normal lowercase">(opzionale)</span></label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors" size={18} />
                    <input
                      name="azienda" type="text" value={formData.azienda}
                      onChange={handleChange} placeholder="Azienda S.r.l."
                      className="w-full bg-slate-50 p-4 pl-12 rounded-2xl border border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-slate-800 placeholder:text-slate-300"
                    />
                  </div>
                </div>

                {/* OGGETTO */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-purple-600 ml-1">Oggetto della richiesta</label>
                  <div className="relative group">
                    <Tag className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.oggetto && errors.oggetto ? 'text-red-400' : 'text-slate-300 group-focus-within:text-purple-500'}`} size={18} />
                    <select
                      name="oggetto" value={formData.oggetto}
                      onChange={handleChange} onBlur={() => handleBlur('oggetto')}
                      className={`w-full bg-slate-50 p-4 pl-12 pr-10 rounded-2xl border transition-all appearance-none text-slate-700 outline-none ${touched.oggetto && errors.oggetto ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10'}`}
                    >
                      <option value="">Seleziona un&apos;opzione</option>
                      <option value="consulenza">Consulenza Strategica &amp; AI</option>
                      <option value="tech">Integrazione Cloud &amp; Cybersecurity</option>
                      <option value="partnership">Proposta di Partnership Commerciale</option>
                      <option value="altro">Altro / Informazioni Generali</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                      <ArrowRight size={16} className="rotate-90" />
                    </div>
                  </div>
                  <AnimatePresence>
                    {touched.oggetto && errors.oggetto && (
                      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-xs text-red-500 font-medium pl-1">{errors.oggetto}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* BUDGET */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-purple-600 flex items-center gap-1.5">
                      <DollarSign size={14} /> Budget di Progetto Stimato
                    </label>
                    <span className="text-xs text-slate-400 font-normal lowercase">(opzionale)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt.id} type="button"
                        onClick={() => handleBudgetSelect(opt.id)}
                        className={`p-3.5 rounded-xl border text-sm font-semibold tracking-wide transition-all ${formData.budget === opt.id ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white border-transparent shadow-md shadow-purple-500/20' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MESSAGGIO */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-purple-600">Il tuo messaggio</label>
                    <span className={`text-xs ${formData.messaggio.length > 450 ? 'text-amber-500 font-semibold' : 'text-slate-400'}`}>
                      {formData.messaggio.length} / 500 caratteri
                    </span>
                  </div>
                  <div className="relative group">
                    <MessageSquare className={`absolute left-4 top-5 transition-colors ${touched.messaggio && errors.messaggio ? 'text-red-400' : 'text-slate-300 group-focus-within:text-purple-500'}`} size={18} />
                    <textarea
                      name="messaggio" maxLength={500} value={formData.messaggio}
                      onChange={handleChange} onBlur={() => handleBlur('messaggio')}
                      placeholder="Descrivi dettagliatamente le tue necessità aziendali..."
                      className={`w-full bg-slate-50 p-4 pl-12 rounded-2xl border h-40 transition-all resize-none text-slate-800 placeholder:text-slate-300 outline-none ${touched.messaggio && errors.messaggio ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10'}`}
                    />
                  </div>
                  <AnimatePresence>
                    {touched.messaggio && errors.messaggio && (
                      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-xs text-red-500 font-medium pl-1">{errors.messaggio}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* CONSENSI */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="flex-shrink-0 mt-0.5">
                        <input
                          name="privacy" type="checkbox" checked={formData.privacy}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-slate-300 accent-purple-600 cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-slate-500 leading-snug group-hover:text-slate-700 transition-colors">
                        Accetto l&apos;informativa sulla <Link href="/privacy" className="text-purple-600 underline font-medium hover:text-purple-700">Privacy Policy</Link> e acconsento al trattamento dei dati personali forniti nel rispetto delle norme vigenti. *
                      </span>
                    </label>
                    <AnimatePresence>
                      {touched.privacy && errors.privacy && (
                        <motion.p initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 font-medium pl-8">{errors.privacy}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="flex-shrink-0 mt-0.5">
                      <input
                        name="newsletter" type="checkbox" checked={formData.newsletter}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-slate-300 accent-purple-600 cursor-pointer"
                      />
                    </div>
                    <span className="text-sm text-slate-500 leading-snug group-hover:text-slate-700 transition-colors">
                      Desidero iscrivermi alla newsletter mensile per ricevere report esclusivi e analisi sui trend digitali emergenti.
                    </span>
                  </label>
                </div>

                {/* SUBMIT */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`group flex items-center gap-3 font-black px-10 py-4 rounded-2xl shadow-xl transition-all text-sm uppercase tracking-widest min-w-[230px] justify-center text-white ${isSubmitting ? 'bg-zinc-400 shadow-none cursor-wait' : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-purple-200'}`}
                  >
                    {isSubmitting ? (
                      <><span>Invio in corso...</span><Loader2 size={16} className="animate-spin" /></>
                    ) : (
                      <><span>Invia Messaggio</span><Send size={16} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </motion.button>
                  <span className="text-xs text-slate-400 font-light max-w-xs leading-normal">
                    Premendo invia, i dati verranno convalidati all&apos;istante. Risposta garantita entro 24 ore lavorative.
                  </span>
                </div>

              </form>
            </div>
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