import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: LOCALES.flatMap((locale) => [
        `/${locale}/dashboard`,
        `/${locale}/login`,
      ]),
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
