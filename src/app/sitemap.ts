import { MetadataRoute } from 'next';
import articles from '../../resources/articles.json';
import type { Article } from '../../types/article';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const articleList = articles as Article[];

  const articleEntries = articleList.map((article) => {
    const imageUrls = (article.images ?? [])
      .filter((img) => !!img?.src)
      .map((img) => `${baseUrl}${img.src}`);

    return {
      url: `${baseUrl}/articoli/${article.slug}`,
      lastModified: article.updateDateISO,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      ...(imageUrls.length > 0 ? { images: imageUrls } : {}),
    };
  });

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articoli`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soluzioni`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/chisiamo`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contatti`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...articleEntries];
}