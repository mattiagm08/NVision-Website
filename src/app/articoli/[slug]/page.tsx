/* eslint-disable @next/next/no-html-link-for-pages */
// IMPORTAZIONI
import React from 'react';
import articles from '../../../../resources/articles.json';
import type { Article } from '../../../../types/article';
import ArticleView from './articleView';

// DEFINIZIONE INTERFACCIA PROPS (Next.js 15 dynamic params)
interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  
  // ---------------------------------------------------------
  // LOGICA DI RECUPERO DATI (SERVER SIDE)
  // ---------------------------------------------------------
  
  // Await dei params richiesto dalle versioni più recenti di Next.js
  const { slug } = await params;
  
  // Ricerca dell'articolo nel dataset
  const article: Article | undefined = articles.find((a) => a.slug === slug);

  // GESTIONE ERRORE: ARTICOLO NON TROVATO (404)
  if (!article) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-slate-950 text-white font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.15),transparent_70%)] pointer-events-none"></div>
        <h1 className="text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white drop-shadow-2xl">
          404
        </h1>
        <p className="text-xl text-blue-200 font-light tracking-wide">
          Articolo non trovato nel database NVision.
        </p>
        <a href="/articoli" className="mt-8 text-blue-400 hover:text-white transition-colors underline underline-offset-4">
          Torna all&apos;archivio
        </a>
      </main>
    );
  }

  // CALCOLO READ TIME (Basato sulla media di 200 parole al minuto)
  // Rimuoviamo i tag HTML per un conteggio pulito delle parole
  const wordCount = article.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);


  // ---------------------------------------------------------
  // RENDERING (PASSAGGIO AL CLIENT COMPONENT 'ArticleView')
  // ---------------------------------------------------------
  return (
    <ArticleView 
      article={article} 
      readTime={readTime} 
    />
  );
}