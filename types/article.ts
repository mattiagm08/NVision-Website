export interface Article {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  excerpt: string;
  content: string;
  image?: string;
  contentStyle?: 'default' | 'report' | 'editorial' | 'briefing';

  keywords?: string[];

  faq?: {
    question: string;
    answer: string;
  }[];
}