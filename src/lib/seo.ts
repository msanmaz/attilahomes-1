import { LOCALES, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/constants';

export function getCanonical(locale: Locale, path: string): string {
  return `${SITE_URL}/${locale}${path}`;
}

export function getHreflang(path: string): Record<string, string> {
  return Object.fromEntries([
    ...LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
    ['x-default', `${SITE_URL}/tr${path}`],
  ]);
}
