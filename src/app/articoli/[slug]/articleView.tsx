'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Clock, 
  Calendar, 
  Share2, 
  ChevronLeft, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Globe, 
  Instagram, 
  Facebook
} from 'lucide-react';

import type { Article } from '../../../../types/article';
import articles from '../../../../resources/articles.json';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface Props {
  article: Article;
  readTime: number;
}

const vpS = { once: true, amount: 0.1 };
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";


const footerNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/articoli', label: 'Articoli' },
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/contatti', label: 'Contattaci' },
];

// Aggiunto "type" per agganciare la logica di condivisione corretta ad ogni icona
const footerSocials = [
  { Icon: Facebook, type: 'facebook' },
  { Icon: Instagram, type: 'instagram' },
  { Icon: Share2, type: 'share' },
];

const AdPlaceholder = ({ label }: { label: string }) => (
  <div className="w-full my-8 py-10 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center">
    <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-bold">Annuncio Pubblicitario</span>
    <div className="text-slate-400 font-medium">{label}</div>
  </div>
);

/* ---------------------------------------------------------
    ICONE SOCIAL NON PRESENTI IN LUCIDE-REACT
    (WhatsApp e TikTok), disegnate in stile coerente
    con le altre icone outline/filled usate nel progetto.
--------------------------------------------------------- */
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.763.462 3.483 1.34 4.997l-1.42 5.19 5.32-1.395a9.96 9.96 0 0 0 4.757 1.205h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.929-7.069a9.936 9.936 0 0 0-7.072-2.928zm0 18.184h-.003a8.185 8.185 0 0 1-4.17-1.142l-.299-.178-3.155.827.842-3.076-.195-.316a8.176 8.176 0 0 1-1.256-4.372c0-4.518 3.677-8.194 8.199-8.194 2.19 0 4.248.854 5.797 2.403a8.144 8.144 0 0 1 2.4 5.796c0 4.519-3.678 8.196-8.16 8.252z"/>
  </svg>
);

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
  </svg>
);

/* ---------------------------------------------------------
    UTILITY DI CONDIVISIONE
--------------------------------------------------------- */
const copyToClipboard = async (text: string) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textarea);

    return success;
  } catch {
    return false;
  }
};

/**
 * Estrae il pattern {#id} dalla fine del testo dei children di un heading.
 * Restituisce l'id da usare come attributo HTML e i children "puliti" senza il suffisso {#id}.
 *
 * Esempio:
 *   children = "Cos'è Swiperest? {#cosè-swiperest}"
 *   → { id: "cosè-swiperest", cleanChildren: "Cos'è Swiperest?" }
 */
function extractHeadingId(children: React.ReactNode): {
  id: string | undefined;
  cleanChildren: React.ReactNode;
} {
  const processString = (text: string): { id?: string; clean: string } => {
    const match = text.match(/^([\s\S]*?)\s*\{#([^}]+)\}\s*$/);
    if (match) {
      return { id: match[2], clean: match[1].trim() };
    }
    return { clean: text };
  };

  // Caso più comune: stringa diretta
  if (typeof children === 'string') {
    const { id, clean } = processString(children);
    return { id, cleanChildren: clean || children };
  }

  // Array di ReactNode (es. testo misto con bold/em)
  if (Array.isArray(children)) {
    const arr = [...(children as React.ReactNode[])];
    for (let i = arr.length - 1; i >= 0; i--) {
      if (typeof arr[i] === 'string') {
        const { id, clean } = processString(arr[i] as string);
        if (id !== undefined) {
          arr[i] = clean;
          // Rimuove stringhe vuote che rimangono dopo la pulizia
          const filtered = arr.filter((c) => c !== '');
          return {
            id,
            cleanChildren: filtered.length === 1 ? filtered[0] : filtered,
          };
        }
      }
    }
  }

  return { id: undefined, cleanChildren: children };
}

export default function ArticleView({ article, readTime }: Props) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const articleContentClass = `article-content article-content-${article.contentStyle ?? 'default'}`;

  // 🔗 URL specifico dell'articolo corrente, usato dalla barra di condivisione
  const articleUrl = `${baseUrl}/articoli/${article.slug}`;

  const markdown = React.useMemo(() => {
  let content = article.content ?? '';

    // 🔒 Rete di sicurezza per articoli "legacy" scritti prima della migrazione
    // al sistema di immagini markdown dirette: se nel testo sopravvive ancora
    // un vecchio placeholder {{IMAGE_MID}} / {{IMAGE_HERO}}, lo convertiamo qui,
    // PRIMA che arrivi a ReactMarkdown, in normale sintassi markdown ![alt](src).
    // In questo modo l'immagine viene gestita dal componente `img` standard
    // (già correttamente wrappato fuori dal <p> quando è l'unico figlio),
    // invece che da un ramo custom che inseriva un <div> dentro un <p>
    // e causava l'errore di prerendering in produzione.
    content = content.replace(/\{\{IMAGE_(\w+)\}\}/g, (_match, posRaw) => {
      const position = posRaw.toLowerCase();
      const img = article.images?.find((i) => i.position === position);
      if (!img?.src) return '';
      const alt = img.alt || 'Immagine articolo';
      return `\n\n![${alt}](${img.src})\n\n`;
    });

    return content;
  }, [article.content, article.images]);

   const heroImage = article.images?.[0];

  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const faqSchema =
  article.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faq.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          },
        })),
      }
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",

    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/articoli/${article.slug}`
    },

    "headline": article.title,
    "description": article.excerpt,

    "image": (article.images ?? [])
    .filter((img) => !!img?.src)
    .map((img) => ({
      "@type": "ImageObject",
      "url": `${baseUrl}${img.src}`,
      "width": 1920,
      "height": 1080,
      "caption": img.alt || article.title,
    })),

    "datePublished": new Date(article.publicationDateISO).toISOString(),
    "dateModified": new Date(article.updateDateISO).toISOString(),

    "author": {
      "@type": "Organization",
      "name": "NVision Insights",
      "url": baseUrl
    },

    "publisher": {
      "@type": "Organization",
      "name": "NVision Insights",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },

    "keywords": article.keywords ?? []
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Articoli",
        "item": `${baseUrl}/articoli`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `${baseUrl}/articoli/${article.slug}`,
      },
    ],
  };

  // 🔗 Condivisione generica tramite Web Share API, con fallback su copia negli appunti
  const handleGenericShare = async () => {
    const shareData = {
      title: article.title ?? "NVision Insights",
      text: article.excerpt
        ? article.excerpt
        : "Scopri questo articolo su NVision Insights",
      url: articleUrl,
    };

    try {
      if ("share" in navigator && typeof navigator.share === "function") {
        await navigator.share(shareData);
        return;
      }

      const copied = await copyToClipboard(articleUrl);

      if (copied) {
        alert("Link copiato negli appunti!");
      }
    } catch (error) {
      console.log("Condivisione annullata", error);
    }
  };

  // 🔗 Gestisce il click sui singoli pulsanti social della barra sotto l'hero
  const handleArticleShareClick = (type: 'facebook' | 'whatsapp' | 'instagram' | 'tiktok' | 'email' | 'share') => {
    switch (type) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
          '_blank',
          'noopener,noreferrer'
        );
        break;

      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${article.title} - ${articleUrl}`)}`,
          '_blank',
          'noopener,noreferrer'
        );
        break;

      case 'instagram':
        // Instagram non offre un endpoint di condivisione diretto via URL:
        // copiamo il link e apriamo Instagram, così l'utente può incollarlo
        // in una Storia, in un post o in un messaggio diretto.
        copyToClipboard(articleUrl);
        alert("Link copiato! Incollalo in una Storia o in un messaggio su Instagram.");
        window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
        break;

      case 'tiktok':
        // Stesso discorso per TikTok: nessun endpoint di condivisione via URL.
        copyToClipboard(articleUrl);
        alert("Link copiato! Incollalo nella bio o in un messaggio su TikTok.");
        window.open('https://www.tiktok.com/', '_blank', 'noopener,noreferrer');
        break;

      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(
          article.title ?? "Un articolo da NVision Insights"
        )}&body=${encodeURIComponent(`Ti consiglio questo articolo: ${articleUrl}`)}`;
        break;

      case 'share':
        handleGenericShare();
        break;
    }
  };

  // 🔗 Gestisce il click sui pulsanti social del footer (condividono il sito, non il singolo articolo)
  const handleFooterShareClick = (type: string) => {
    const siteUrl = `${baseUrl}/`;

    if (type === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }

    if (type === "instagram") {
      copyToClipboard(siteUrl);
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    }

    if (type === "share") {
      (async () => {
        const shareData = {
          title: "NVision Insights",
          text: "Scopri NVision Insights",
          url: siteUrl,
        };
        try {
          if ("share" in navigator && typeof navigator.share === "function") {
            await navigator.share(shareData);
            return;
          }
          const copied = await copyToClipboard(siteUrl);
          if (copied) alert("Link copiato negli appunti!");
        } catch (error) {
          console.log("Condivisione annullata", error);
        }
      })();
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-300 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text whitespace-nowrap shrink-0 bg-gradient-to-r from-black to-black/70 select-none">
            <Link href="/" >NVision Insights™</Link>
          </h1>
          <Link
            href="/articoli"
            className="flex items-center gap-1 sm:gap-2 text-slate-600 hover:text-blue-400 text-xs sm:text-sm transition-colors"
          >
            <ChevronLeft size={14} />
            Indietro
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-12 md:pt-40 md:pb-20 px-4 sm:px-6 bg-blue-800 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-white text-xs sm:text-sm md:text-base">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-5 h-5 sm:w-8 sm:h-8 relative rounded-full overflow-hidden">
                <Image src="/logos/logo2_lite.png" alt="NVision Insights" fill className="object-cover" />
              </div>
              <span className="font-medium text-xs sm:text-sm">NVision Insights</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Calendar size={14} className="text-blue-300" />

              <span className="text-xs sm:text-sm">
                {article.updateDate && article.updateDate !== article.publicationDate
                  ? `${article.publicationDate} • Aggiornato il ${article.updateDate}`
                  : article.publicationDate}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
  
              {/* Left side: read time */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock size={14} className="text-blue-300" />
                <span className="text-xs sm:text-sm">
                  {readTime} min lettura
                </span>
              </div>

              {/* Right side: category */}
              {article.category && (
                <span className="bg-white/15 border border-white/30 text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {article.category}
                </span>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* IMMAGINE */}
      {heroImage?.src && (
        <div className="max-w-5xl mx-auto px-2 sm:px-6 -mt-6 md:-mt-6 relative z-0">
          <motion.div
            className="relative w-full rounded-3xl shadow-2xl ring-1 ring-black/10 overflow-hidden aspect-[16/9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt || article.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      )}

      {/* BARRA DI CONDIVISIONE ARTICOLO (sotto l'hero) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-4 sm:mt-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-full shadow-sm px-3 py-2 sm:px-5 sm:py-2.5 flex-wrap"
        >
          <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mr-0.5 sm:mr-1.5 hidden xs:inline sm:inline">
            Condividi
          </span>

          <button
            type="button"
            onClick={() => handleArticleShareClick('facebook')}
            aria-label="Condividi su Facebook"
            className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
          >
            <Facebook size={17} />
          </button>

          <button
            type="button"
            onClick={() => handleArticleShareClick('whatsapp')}
            aria-label="Condividi su WhatsApp"
            className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-green-500 transition-colors duration-200 cursor-pointer"
          >
            <WhatsAppIcon size={17} />
          </button>

          <button
            type="button"
            onClick={() => handleArticleShareClick('instagram')}
            aria-label="Condividi su Instagram"
            className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-pink-500 transition-colors duration-200 cursor-pointer"
          >
            <Instagram size={17} />
          </button>

          <button
            type="button"
            onClick={() => handleArticleShareClick('tiktok')}
            aria-label="Condividi su TikTok"
            className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-black transition-colors duration-200 cursor-pointer"
          >
            <TikTokIcon size={17} />
          </button>

          <button
            type="button"
            onClick={() => handleArticleShareClick('email')}
            aria-label="Condividi via Email"
            className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-slate-600 transition-colors duration-200 cursor-pointer"
          >
            <Mail size={17} />
          </button>

          <div className="w-px h-5 bg-slate-200 mx-0.5 sm:mx-1" />

          <button
            type="button"
            onClick={() => handleArticleShareClick('share')}
            aria-label="Condividi"
            className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-blue-400 transition-colors duration-200 cursor-pointer"
          >
            <Share2 size={17} />
          </button>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        <AdPlaceholder label="Top Article Ad - 728x90" />
      </div>

      {/* CONTENUTO MARKDOWN */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className={articleContentClass}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            components={{

              h1: ({ children }) => {
                const { id, cleanChildren } = extractHeadingId(children);
                return (
                  <h1
                    id={id}
                    className="!text-blue-600 text-4xl font-extrabold mt-14 mb-14 leading-tight scroll-mt-24"
                  >
                    {cleanChildren}
                  </h1>
                );
              },

              h2: ({ children }) => {
                const { id, cleanChildren } = extractHeadingId(children);
                return (
                  <h2
                    id={id}
                    className="!text-blue-600 text-3xl font-bold mt-10 mb-10 leading-tight scroll-mt-24"
                  >
                    {cleanChildren}
                  </h2>
                );
              },

              h3: ({ children }) => {
                const { id, cleanChildren } = extractHeadingId(children);
                return (
                  <h3
                    id={id}
                    className="!text-blue-600 text-2xl font-bold mt-7 mb-5 scroll-mt-24"
                  >
                    {cleanChildren}
                  </h3>
                );
              },

              p: ({ children, node }) => {
                // Se il paragrafo contiene solo un'immagine, evita di wrapparla in <p>
                // (altrimenti il <div> dentro img produce HTML non valido e hydration error)
                const hasOnlyImage =
                  node?.children?.length === 1 &&
                  node.children[0].type === 'element' &&
                  node.children[0].tagName === 'img';

                if (hasOnlyImage) {
                  return <>{children}</>;
                }

                return (
                  <p className="!text-slate-700 text-lg leading-8 !mb-12">
                    {children}
                  </p>
                );
              },

              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-8 space-y-3 text-slate-700">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-8 space-y-3 text-slate-700">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="leading-7">
                  {children}
                </li>
              ),

              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-5 my-8 italic text-slate-600">
                  {children}
                </blockquote>
              ),

              hr: () => (
                <hr className="my-12 border-slate-200" />
              ),

              strong: ({ children }) => (
                <strong className="!text-slate-900 font-bold">
                  {children}
                </strong>
              ),

              img: ({ src, alt }) => {
                if (!src || typeof src !== 'string') return null;

                return (
                  <div className="my-10">
                    <Image
                      src={src}
                      alt={alt || "Immagine articolo"}
                      width={1200}
                      height={675}
                      className="rounded-2xl shadow-md w-full h-auto"
                    />
                  </div>
                );
              },

              table: ({ children }) => (
                <div className="w-full overflow-x-auto my-10 rounded-2xl border border-slate-200 shadow-sm bg-white">
                  <table className="w-full min-w-[700px] border-collapse text-left">
                    {children}
                  </table>
                </div>
              ),

              thead: ({ children }) => (
                <thead className="bg-slate-50/80 backdrop-blur border-b border-slate-200">
                  {children}
                </thead>
              ),

              tbody: ({ children }) => (
                <tbody className="divide-y divide-slate-100">
                  {children}
                </tbody>
              ),

              tr: ({ children }) => (
                <tr className="hover:bg-slate-50/60 transition-colors">
                  {children}
                </tr>
              ),

              th: ({ children }) => (
                <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase tracking-wider">
                  {children}
                </th>
              ),

              td: ({ children }) => (
                <td className="
                  px-6 py-4 text-sm text-slate-700 align-top
                  first:font-bold first:text-slate-900 first:text-base
                ">
                  {children}
                </td>
              ),

              a: ({ children, href }) => (
                <a
                  href={href}
                  className="!text-blue-600 underline hover:text-blue-800 break-all"
                >
                  {children}
                </a>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AdPlaceholder label="End Content Ad - Native/Banner" />
      </div>

      {/* SOCIAL */}
      <div className="flex justify-center gap-4 sm:gap-8 py-4 sm:py-8 border-y border-slate-200 max-w-3xl mx-auto mb-8 sm:mb-12">
        <button
          type="button"
          onClick={() => handleArticleShareClick('share')}
          aria-label="Condividi questo articolo"
          className="cursor-pointer"
        >
          <Share2 size={22} className="text-blue-300 hover:text-blue-400 transition-colors" />
        </button>
      </div>

      {/* ARTICOLI CORRELATI */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <span className="w-10 h-1 bg-blue-400 rounded-full"></span>
          Continua a leggere
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => {
            const relImage = rel.images?.[0]?.src ?? heroImage?.src;
            return (
              <Link key={rel.slug} href={`/articoli/${rel.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-200 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    {relImage && (
                      <Image src={relImage} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-500 transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-slate-500 text-xs line-clamp-2 mb-4 flex-grow">
                      {rel.excerpt}
                    </p>
                    <div className="flex items-center text-blue-600 text-xs font-bold uppercase tracking-wider">
                      Scopri di più <ArrowRight size={14} className="ml-1 group-hover:ml-2 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 max-w-3xl mx-auto flex flex-col items-center md:flex-row md:items-center gap-4 sm:gap-8 text-center md:text-left my-8 sm:my-12 shadow-sm">
        <div className="w-16 h-16 sm:w-24 sm:h-24 relative flex-shrink-0 rounded-full overflow-hidden">
          <Image src="/logos/logo2_lite.png" alt="Logo NVision" fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-sm sm:text-lg font-bold text-slate-900 mb-2">Ti è piaciuto questo articolo?</h4>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Scopri altri approfondimenti tecnologici e resta aggiornato con NVision Insights™.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-3 sm:mt-4 justify-center md:justify-start">
            <Link href="/articoli" className="px-4 py-1 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-400 transition-all shadow-md shadow-blue-200 text-xs sm:text-base">
              Scopri di più
            </Link>
            <Link href="/contatti" className="px-4 py-1 sm:px-6 sm:py-2 border border-slate-300 text-slate-700 rounded-full hover:bg-slate-50 transition-all text-xs sm:text-base">
              Contattaci
            </Link>
          </div>
        </div>
      </div>

      <footer className="relative mt-auto border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-6 relative z-10">

          {/* ── MOBILE LAYOUT ── */}
          <div className="md:hidden space-y-10">

            {/* Brand */}
            <div className="text-center space-y-4 pb-8 border-b border-zinc-200">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vpS}
                transition={{ duration: 0.5 }}
                className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
              >
                NVision Insights™
              </motion.h3>
              <p className="text-zinc-500 text-sm font-light max-w-xs mx-auto">
                Tecnologia, divulgazione e innovazione per la prossima generazione di leader digitali.
              </p>
              <div className="flex justify-center space-x-4 pt-2">
                {footerSocials.map(({ Icon, type }, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    onClick={() => handleFooterShareClick(type)}
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={vpS}
                    transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 260, damping: 13 }}
                    className="p-3 bg-zinc-100 rounded-full hover:bg-blue-600 hover:text-white text-zinc-600 transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Icon size={20} />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Navigazione + Policy */}
            <div className="grid grid-cols-2 gap-8 pb-8 border-b border-zinc-200">
              <div>
                <h4 className="text-black font-bold mb-4 text-xs uppercase tracking-[0.15em]">Navigazione</h4>
                <ul className="space-y-3 text-sm">
                  {footerNavLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-zinc-600 hover:text-blue-600 transition-colors duration-200 font-light">
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
                      <Link href={item.href} className="text-zinc-600 hover:text-blue-600 transition-colors duration-200 font-light">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {/* <li className="text-zinc-400 text-xs font-mono pt-1">P.IVA IT 01234567890</li> */}
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
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
                <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-500 p-1.5 rounded-lg transition-colors duration-200 text-white">
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <Mail size={15} className="text-blue-600 shrink-0" />
                  <span>info.nvisioninsights@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-zinc-700 font-light">
                  <MapPin size={15} className="text-blue-600 shrink-0" />
                  <span>Catania, Sicily, IT</span>
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
                  <Globe size={12} className="text-blue-500" />
                  Italiano
                </span>
                <span className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                  Supporto
                </span>
              </div>
            </div>
          </div>

          {/* ── DESKTOP LAYOUT ── */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

              {/* Brand + Socials */}
              <div className="space-y-6">
                <motion.h3
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vpS}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
                >
                  NVision Insights™
                </motion.h3>

                <div className="flex space-x-3">
                  {footerSocials.map(({ Icon, type }, i) => (
                    <motion.a
                      key={i}
                      href={
                        type === "facebook"
                          ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              `${baseUrl}/`
                            )}`
                          : "#"
                      }
                      target={type === "facebook" ? "_blank" : undefined}
                      rel={type === "facebook" ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (type === "instagram") {
                          e.preventDefault();
                          handleFooterShareClick("instagram");
                        }

                        if (type === "share") {
                          e.preventDefault();
                          handleFooterShareClick("share");
                        }
                      }}
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
                      className="p-2 bg-zinc-100 rounded-full hover:bg-blue-600 hover:text-white text-zinc-500 transition-all duration-200"
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
                        className="text-black hover:text-blue-600 transition-colors duration-200"
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
                        className="text-black hover:text-blue-600 transition-colors duration-200"
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
                    {/* P.IVA IT 01234567890 */}
                  </motion.li>
                </ul>
              </div>

              {/* Newsletter */}
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
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  />
                  <button
                    onClick={() => router.push("/contatti")}
                    className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-500 p-1.5 rounded-lg transition-colors duration-200 text-white cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <Mail size={15} className="text-blue-600 shrink-0" />
                    <span>info.nvisioninsights@gmail.com</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-black font-light">
                    <MapPin size={15} className="text-blue-600 shrink-0" />
                    <span>Catania, Sicily, IT</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-8" />

            {/* Copyright */}
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
                  <Globe size={12} className="text-blue-500" />
                  Italiano
                </span>
                <span className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
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