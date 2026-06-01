export interface Article {
  slug: string;
  title: string;
  date: string;        // formato DD/MM/YYYY
  excerpt: string;
  content: string;     // HTML string
  image?: string;
  contentStyle?: 'default' | 'report' | 'editorial' | 'briefing';
}
