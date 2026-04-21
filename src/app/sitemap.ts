import { MetadataRoute } from 'next';
import articles from '../../resources/articles.json';

export default function sitemap(): MetadataRoute.Sitemap {
  // Quando avrai il dominio, cambialo qui.
  const baseUrl = 'https://www.nvisioninsights.it';

  // Funzione per convertire la data "DD/MM/YYYY" in un oggetto Date valido
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // 1. Genera gli ingressi per gli articoli in modo dinamico
  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/articoli/${article.slug}`,
    lastModified: parseDate(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8, // Gli articoli hanno priorità alta
  }));

  // 2. Pagine statiche del sito (viste nel tuo header)
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