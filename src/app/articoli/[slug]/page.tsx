import React from 'react';
import articles from '../../../../resources/articles.json';
import type { Article } from '../../../../types/article';
import ArticleView from './articleView';

interface ArticlePageProps {
  params: Promise<{ slug: string }>; // Tipizzazione aggiornata come Promise
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Await dei params richiesto da Next.js 15+
  const { slug } = await params;
  
  const article: Article | undefined = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-slate-950 text-white font-sans">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p>Articolo non trovato</p>
      </main>
    );
  }

  // Calcolo readTime lato server
  const wordCount = article.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  // Passaggio dati al Client Component
  return <ArticleView article={article} readTime={readTime} />;
}