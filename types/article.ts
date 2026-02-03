export interface Article {
  slug: string;
  title: string;
  date: string;        // formato YYYY-MM-DD
  excerpt: string;
  content: string;     // HTML string
  image?: string;
}