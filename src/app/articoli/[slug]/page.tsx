/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import articles from '../../../../resources/articles.json';
import type { Article } from '../../../../types/article';
import ArticleView from './articleView';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// 1. GENERATE STATIC PARAMS (Abilita SSG)
// Questa funzione dice a Next.js quali pagine generare al momento del build
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// 2. METADATA DINAMICI (Fondamentali per SEO/Social)
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) return { title: "Articolo non trovato" };

  return {
    title: `${article.title} | NVision Insights`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article: Article | undefined = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-slate-950 text-white font-sans">
        <h1 className="text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">404</h1>
        <p className="text-xl text-blue-200">Articolo non trovato.</p>
        <a href="/articoli" className="mt-8 text-blue-400 underline">Torna all'archivio</a>
      </main>
    );
  }

  const wordCount = article.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return <ArticleView article={article} readTime={readTime} />;
}