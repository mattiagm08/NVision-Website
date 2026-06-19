/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import articles from '../../../../resources/articles.json';
import type { Article } from '../../../../types/article';
import ArticleView from './articleView';
import { Metadata } from 'next';

import { getMarkdown } from '../../lib/markdownCache';

const articleList = articles as Article[];

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articleList.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articleList.find((a) => a.slug === slug);

  if (!article) return { title: 'Articolo non trovato' };

  return {
    title: `${article.title} | NVision Insights`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
      type: 'article',
      publishedTime: article.dateISO,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
    },
  };
}

/**
 * 🔥 CARICAMENTO CORRETTO FILE MARKDOWN (FS SERVER-SIDE)
 */
async function getArticleContent(article: Article): Promise<string> {
  try {
    return await getMarkdown(article.content);
  } catch (err) {
    console.error('Errore lettura markdown:', err);
    return '';
  }
}

/**
 * 🔥 CALCOLO READ TIME (MARKDOWN SAFE)
 */
function estimateReadTime(markdown: string): number {
  if (!markdown) return 1;

  const cleanText = markdown
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/[#_*>\-\[\]]/g, '')   // markdown symbols
    .replace(/<[^>]*>/g, '')        // html fallback
    .trim();

  const words = cleanText.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const article = articleList.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-slate-950 text-white font-sans">
        <h1 className="text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
          404
        </h1>
        <p className="text-xl text-blue-200">Articolo non trovato.</p>
        <a href="/articoli" className="mt-8 text-blue-400 underline">
          Torna all&apos;archivio
        </a>
      </main>
    );
  }

  const content = await getArticleContent(article);
  const readTime = estimateReadTime(content);

  const hydratedArticle = {
    ...article,
    content,
  };

  return <ArticleView article={hydratedArticle} readTime={readTime} />;
}