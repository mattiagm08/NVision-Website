import articles from '../../../resources/articles.json';
import type { Article } from '@/types/article';

export function getArticleBySlug(slug: string): Article | undefined {
  return (articles as Article[]).find(
    (article) => article.slug === slug
  );
}

export function getReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}