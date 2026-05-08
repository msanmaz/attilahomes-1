export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number, currency: string = "USD"): string {
  if (currency === "TRY") {
    if (price >= 1_000_000) return `₺${(price / 1_000_000).toFixed(1)}M`;
    if (price >= 1_000) return `₺${(price / 1_000).toFixed(0)},000`;
    return `₺${price.toLocaleString()}`;
  }
  if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `$${(price / 1_000).toFixed(0)}K`;
  return `$${price.toLocaleString()}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
