// Unified homepage feed: locally-authored comparisons + published Signalor blog
// posts, merged into ONE stream of `FeedItem`s so every entry renders through the
// same card. Comparisons carry A/B side labels; posts don't. DB posts win on
// slug clash; a failed DB fetch degrades to just the local comparisons.

import { getAllComparisons, type Comparison } from "./comparisons";
import { getPosts, type BlogRow } from "./blog-db";

export interface FeedItem {
  slug: string;
  title: string;
  /** ISO date-only (YYYY-MM-DD). */
  date: string;
  /** Route to the full page. */
  href: string;
  kind: "comparison" | "post";
  /** Side labels — comparisons only. */
  a?: string;
  b?: string;
}

function comparisonToItem(c: Comparison): FeedItem {
  return {
    slug: c.slug,
    title: c.title,
    date: c.date,
    href: `/comparison/${c.slug}`,
    kind: "comparison",
    a: c.a.name,
    b: c.b.name,
  };
}

/** Keep only genuine published posts — drop placeholder/test rows. */
function isRealPost(p: BlogRow): boolean {
  const title = (p.title ?? "").trim();
  if (!title) return false;
  if (/^test\b/i.test(title) || /\btest (post|backlink)\b/i.test(title)) return false;
  return true;
}

function postToItem(p: BlogRow): FeedItem {
  return {
    slug: p.slug,
    title: p.title,
    date: (p.published_at ?? "").slice(0, 10),
    href: `/${p.slug}`,
    kind: "post",
  };
}

function timeOf(d: string): number {
  return d ? new Date(d).getTime() || 0 : 0;
}

/** Every comparison + every published Signalor post, newest first. */
export async function getFeedItems(): Promise<FeedItem[]> {
  const comparisons = getAllComparisons().map(comparisonToItem);
  let posts: FeedItem[] = [];
  try {
    posts = (await getPosts()).filter(isRealPost).map(postToItem);
  } catch {
    posts = [];
  }
  const seen = new Set(posts.map((p) => p.slug));
  return [...posts, ...comparisons.filter((c) => !seen.has(c.slug))].sort(
    (a, b) => timeOf(b.date) - timeOf(a.date),
  );
}
