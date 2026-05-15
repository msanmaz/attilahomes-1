import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  locale: Locale;
};

export function LocaleLink({ href, locale, children, ...props }: LocaleLinkProps): ReactNode {
  const localeHref = href.startsWith("http") ? href : `/${locale}${href}`;
  return (
    <Link href={localeHref} {...props}>
      {children}
    </Link>
  );
}
