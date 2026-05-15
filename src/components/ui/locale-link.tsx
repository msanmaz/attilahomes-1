import Link from "next/link";
import type { ComponentProps } from "react";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  locale: string;
};

export function LocaleLink({ href, locale, children, ...props }: LocaleLinkProps) {
  const localeHref = href.startsWith("http") ? href : `/${locale}${href}`;
  return (
    <Link href={localeHref} {...props}>
      {children}
    </Link>
  );
}
