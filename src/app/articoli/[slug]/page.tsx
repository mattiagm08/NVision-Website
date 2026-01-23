import React from 'react';
import articles from '../../../../resources/articles.json';
import Link from 'next/link';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white font-sans">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl text-center">
          Articolo non trovato
        </h1>
        <Link
          href="/articoli"
          className="text-blue-300 hover:text-white font-semibold text-lg transition-colors underline"
        >
          Torna agli articoli
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-800 text-white font-sans">

      {/* NAVBAR TRASPARENTE NERA */}
      <header className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 px-6 py-4 ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white drop-shadow-xl select-none"
          >
            NVision Insights™
          </Link>
          <Link
            href="/articoli"
            className="hidden sm:block text-blue-300 hover:text-white transition font-medium"
          >
            News
          </Link>
        </div>
      </header>

      {/* HEADER ARTICOLO */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-gradient-to-r from-blue-900 to-blue-700 shadow-[0_0_40px_rgba(0,0,80,0.4)]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold drop-shadow-2xl leading-snug">
            {article.title}
          </h1>
          <p className="text-blue-200 text-sm md:text-base font-medium opacity-90 mt-4">
            Pubblicato il: {article.date}
          </p>
        </div>
      </section>

      {/* IMMAGINE */}
      {article.image && (
        <div className="max-w-5xl mx-auto w-full -mt-16 px-6 md:px-0 z-20">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-72 sm:h-96 md:h-[28rem] object-cover rounded-3xl shadow-[0_0_40px_rgba(0,120,255,0.4)] border border-blue-400/20"
          />
        </div>
      )}

      {/* CONTENUTO AMPLIATO */}
      <article
        className="max-w-5xl mx-auto px-8 md:px-12 py-20
                   backdrop-blur-2xl bg-white rounded-3xl
                   border border-white
                   prose prose-invert prose-lg md:prose-xl
                   prose-headings:text-blue-200 prose-p:text-blue-100
                   prose-a:text-blue-300 hover:prose-a:text-white mt-10"
      >
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>

      {/* BACK BUTTON */}
      <div className="max-w-5xl mx-auto px-6 md:px-0 py-14 w-full">
        <Link
          href="/articoli"
          className="inline-flex items-center gap-3 text-blue-300 hover:text-white text-lg font-semibold
                     transition-colors bg-black/40 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10
                     shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Torna agli articoli
        </Link>
      </div>
    </main>
  );
}
