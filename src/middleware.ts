import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isValidLocale } from "@/lib/i18n";

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Extract the first path segment
  const firstSegment = pathname.split("/")[1];

  // If already has a valid locale prefix, continue
  if (isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Try to detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((lang) => isValidLocale(lang));

  const locale = preferred ?? DEFAULT_LOCALE;

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
