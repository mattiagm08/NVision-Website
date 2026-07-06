/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import articles from '../../../../resources/articles.json';
import type { Article } from '../../../../types/article';
import ArticleView from './articleView';
import { Metadata } from 'next';

import { getMarkdown } from '../../lib/markdownCache';

const articleList = articles as Article[];
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

  try {
    // 🔒 Fallback difensivi: nessun campo opzionale mancante può più far
    // fallire generateMetadata in produzione.
    const heroImage = article.images?.[0];
    const heroImageUrl =
      heroImage?.src && typeof heroImage.src === 'string'
        ? `${baseUrl}${heroImage.src}`
        : undefined;

    const safeExcerpt = article.excerpt ?? '';
    const safeTitle = article.title ?? 'NVision Insights';
    const safeKeywords = Array.isArray(article.keywords) && article.keywords.length > 0
      ? article.keywords
      : [safeTitle, article.slug, safeExcerpt].filter(Boolean);

    const canonicalUrl = `${baseUrl}/articoli/${article.slug}`;

    return {
      metadataBase: new URL(baseUrl),

      title: `${safeTitle} | NVision Insights`,
      description: safeExcerpt,

      authors: [{ name: 'NVision Insights', url: baseUrl }],
      category: article.category ?? undefined,

      alternates: {
        canonical: canonicalUrl,
      },

      keywords: safeKeywords,

      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },

      openGraph: {
        title: safeTitle,
        description: safeExcerpt,
        url: canonicalUrl,
        siteName: 'NVision Insights',
        locale: 'it_IT',
        type: 'article',
        publishedTime: article.publicationDateISO ?? undefined,
        modifiedTime: article.updateDateISO ?? undefined,
        section: article.category ?? undefined,
        tags: safeKeywords,
        authors: ['NVision Insights'],

        images: heroImageUrl
          ? [
              {
                url: heroImageUrl,
                width: 1920,
                height: 1080,
                alt: heroImage?.alt || safeTitle,
              },
            ]
          : undefined,
      },

      twitter: {
        card: 'summary_large_image',
        title: safeTitle,
        description: safeExcerpt,
        images: heroImageUrl
          ? [
              {
                url: heroImageUrl,
                alt: heroImage?.alt || safeTitle,
              },
            ]
          : undefined,
      },
    };
  } catch (err) {
    // 🔒 Logga la slug che fallisce: in build normale il digest di Next
    // nasconde il messaggio reale, questo log resta visibile nei log di build.
    console.error(`[generateMetadata] Errore su slug "${slug}":`, err);
    return {
      title: `${article.title ?? 'Articolo'} | NVision Insights`,
      description: article.excerpt ?? '',
    };
  }
}

/**
 * 🔥 CARICAMENTO CORRETTO FILE MARKDOWN (FS SERVER-SIDE)
 */
async function getArticleContent(article: Article): Promise<string> {
  try {
    const md = await getMarkdown(article.content);
    return typeof md === 'string' ? md : '';
  } catch (err) {
    console.error(`[getArticleContent] Errore lettura markdown per slug "${article.slug}" (path: ${article.content}):`, err);
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

  let content = '';
  try {
    content = await getArticleContent(article);
  } catch (err) {
    console.error(`[ArticlePage] Errore imprevisto su slug "${slug}":`, err);
  }

  const readTime = estimateReadTime(content);

  const hydratedArticle = {
    ...article,
    content,
  };

  return <ArticleView article={hydratedArticle} readTime={readTime} />;
}