import type { MetadataRoute } from 'next';
import { getActiveProperties } from '@/lib/queries/properties';
import { LOCALES } from '@/lib/i18n';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 3600;

const STATIC_PATHS = ['', '/properties', '/about', '/contact'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getActiveProperties();

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: (path === '' ? 'weekly' : 'monthly') as
        | 'weekly'
        | 'monthly',
      priority: path === '' ? 1.0 : 0.8,
    })),
  );

  const propertyEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    properties.map((p) => ({
      url: `${SITE_URL}/${locale}/properties/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  );

  return [...staticEntries, ...propertyEntries];
}
