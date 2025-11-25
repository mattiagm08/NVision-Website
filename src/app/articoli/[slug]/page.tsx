import React from 'react';
import articles from '../../../../resources/articles.json';
import Link from 'next/link';
// Ho supposto che le definizioni di 'article' nel JSON siano adatte
// per l'uso con 'dangerouslySetInnerHTML', come contenuto HTML.

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  // Aggiunta la gestione per l'uso di un Promise in params (tipico di Next.js 13/14 App Router)
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-gradient-to-b from-blue-950 via-black to-blue-900 text-white font-sans">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-lg text-center">
          Articolo non trovato
        </h1>
        <Link
          href="/articoli"
          className="text-blue-400 hover:text-blue-200 font-semibold text-lg transition-colors underline"
        >
          Torna agli articoli
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* HEADER - Sezione Intestazione Articolo */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-16 pb-12 px-6 md:pt-24 md:pb-16 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Titolo più grande e incisivo */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg leading-snug">
            {article.title}
          </h1>
          {/* Data con enfasi ridotta ma visibile */}
          <p className="text-blue-200 text-sm md:text-base font-medium opacity-90 mt-4">
            Pubblicato il: {article.date}
          </p>
        </div>
      </header>
      {/* --- */}

      {/* IMAGE - Sezione Immagine di Copertina */}
      {article.image && (
        <div className="max-w-4xl mx-auto w-full -mt-8 px-6 md:px-0 z-10">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-2xl border-4 border-white"
          />
        </div>
      )}
      {/* --- */}

      {/* CONTENT - Sezione Contenuto dell'Articolo */}
      <article
        className="max-w-4xl mx-auto px-6 md:px-0 py-12 flex-grow 
                   prose prose-lg sm:prose-xl 
                   prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
                   prose-headings:text-blue-900 prose-headings:font-extrabold 
                   prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-a:font-medium
                   prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                   "
      >
        {/* L'uso di 'prose-xl' su schermi più grandi migliora la leggibilità del corpo del testo */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
      {/* --- */}

      {/* BACK LINK - Link per Tornare agli Articoli */}
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-8 border-t border-gray-200 w-full">
        <Link
          href="/articoli"
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors text-lg"
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