'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, Share2, ChevronLeft } from 'lucide-react';
import type { Article } from '../../../../types/article';

interface Props {
  article: Article;
  readTime: number;
}

export default function ArticleView({ article, readTime }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-300 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <Link
            href="/"
            className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 hover:text-blue-400 transition-colors"
          >
            NVision Insights™
          </Link>
          <Link
            href="/articoli"
            className="flex items-center gap-1 sm:gap-2 text-slate-600 hover:text-blue-400 text-xs sm:text-sm transition-colors"
          >
            <ChevronLeft size={14} />
            Torna agli articoli
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-12 md:pt-40 md:pb-20 px-4 sm:px-6 bg-blue-800 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            {article.title}
          </h1>

          {/* METADATA */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-white text-xs sm:text-sm md:text-base">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative rounded-full overflow-hidden">
                <Image src="/logos/logo_lite.png" alt="Redazione NVision" fill className="object-cover" />
              </div>
              <span className="font-medium text-xs sm:text-sm">Redazione NVision</span>
            </div>
            <span className="hidden sm:inline w-1 h-1 bg-white/40 rounded-full"></span>
            <div className="flex items-center gap-1 sm:gap-2">
              <Calendar size={14} className="text-blue-300" />
              <span className="text-xs sm:text-sm">{article.date}</span>
            </div>
            <span className="hidden sm:inline w-1 h-1 bg-white/40 rounded-full"></span>
            <div className="flex items-center gap-1 sm:gap-2">
              <Clock size={14} className="text-blue-300" />
              <span className="text-xs sm:text-sm">{readTime} min lettura</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMMAGINE ARTICOLO */}
      {article.image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 md:-mt-16 relative z-20">
          <motion.div
            className="relative w-full rounded-3xl shadow-2xl ring-1 ring-black/10 overflow-hidden aspect-[16/9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      )}

      {/* CONTENUTO */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 prose prose-lg md:prose-xl text-slate-700 prose-a:text-blue-500">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* SOCIAL */}
      <div className="flex justify-center gap-4 sm:gap-8 py-4 sm:py-8 border-y border-slate-200 max-w-3xl mx-auto mb-8 sm:mb-12">
        <Share2 size={22} className="text-blue-300 hover:text-blue-400 cursor-pointer transition-colors" />
      </div>

      {/* CALL TO ACTION / LOGO ROTONDO */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 max-w-3xl mx-auto flex flex-col items-center md:flex-row md:items-center gap-4 sm:gap-8 text-center md:text-left my-8 sm:my-12 shadow-sm">
        <div className="w-16 h-16 sm:w-24 sm:h-24 relative flex-shrink-0 rounded-full overflow-hidden">
          <Image
            src="/logos/logo_lite.png"
            alt="Logo NVision"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-sm sm:text-lg font-bold text-slate-900 mb-2">Ti è piaciuto questo articolo?</h4>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Scopri altri approfondimenti tecnologici e resta aggiornato con NVision Insights™.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-3 sm:mt-4 justify-center md:justify-start">
            <Link href="/articoli" className="px-4 py-1 sm:px-6 sm:py-2 bg-blue-300 text-white rounded-full hover:bg-blue-400 transition-all shadow-md shadow-blue-200 text-xs sm:text-base">
              Leggi altre News
            </Link>
            <Link href="/contatti" className="px-4 py-1 sm:px-6 sm:py-2 border border-slate-300 text-slate-700 rounded-full hover:bg-slate-50 transition-all text-xs sm:text-base">
              Contattaci
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-blue-800/90 text-white py-6 sm:py-10 mt-8 sm:mt-12 border-t border-blue-300/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm">
          ©{new Date().getFullYear()} NVision Insights™ — Tutti i diritti riservati.
          <br />
          <a href="mailto:info@nvisioninsights.it" className="underline hover:text-blue-200 transition-colors">
            info@nvisioninsights.it
          </a>
        </div>
      </footer>
    </main>
  );
}