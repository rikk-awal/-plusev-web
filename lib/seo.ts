export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://plusev.in";

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
