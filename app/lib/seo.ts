// Shared SEO constants and helpers for Better Versus.
// Content-fetching lives in blog-db.ts / comparisons.ts — this module only
// holds site-wide metadata primitives.

export const SITE_URL = "https://betterversus.com";
export const SITE_NAME = "Better Versus";
export const SITE_TAGLINE = "Honest, side-by-side comparisons";

/** Default social-share image (branded 1200×630). */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Better Versus — honest, side-by-side comparisons",
};

/** Strip HTML tags and collapse whitespace into a clean plain-text string. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** Truncate to ~155 chars on a word boundary for meta descriptions. */
export function truncate(text: string, max = 155): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).replace(/[\s.,;:]+$/, "")}…`;
}
