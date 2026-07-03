export interface ArticleImage {
  src: string;
  alt: string;
  position?: string; // es: "hero" | "content" | "gallery"
}

export interface Article {
  slug: string;
  title: string;
  publicationDate: string;
  publicationDateISO: string;
  updateDate: string;
  updateDateISO: string;
  excerpt: string;
  content: string;
  category?: string;

  // ✔️ nuovo sistema immagini (UNICO)
  images: ArticleImage[];

  // ❌ rimosso: image?: string;

  contentStyle?: 'default' | 'report' | 'editorial' | 'briefing';

  keywords?: string[];

  faq?: {
    question: string;
    answer: string;
  }[];
}