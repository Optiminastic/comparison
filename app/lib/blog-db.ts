// Satellite blog data is served by Signalor's public blog API (which reads S3
// under Signalor/<folder>/). Read-only here; no DB, no AWS SDK, no credentials.

const FOLDER = "comparison"; // satellite site key

const API_BASE = process.env.NEXT_PUBLIC_BLOG_API_BASE ?? "https://staging.api.signalor.ai";

export interface BlogRow {
  id: number;
  slug: string;
  title: string;
  description: string;
  content_html: string;
  image_url: string;
  category: string;
  brand_url: string;
  published_at: string | null;
}

function normalize(raw: Record<string, unknown>): BlogRow {
  return {
    id: Number(raw.id ?? 0),
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? ""),
    description: String(raw.description ?? ""),
    content_html: String(raw.content_html ?? ""),
    image_url: String(raw.image_url ?? ""),
    category: String(raw.category ?? FOLDER),
    brand_url: String(raw.brand_url ?? ""),
    published_at: (raw.published_at as string) ?? null,
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (e) {
    console.error("[blog-db] fetch failed:", url, e);
    return null;
  }
}

/** Published posts for this site, newest first (from Signalor's blog API). */
export async function getPosts(): Promise<BlogRow[]> {
  const raw = await fetchJson<Record<string, unknown>[]>(
    `${API_BASE}/api/analyzer/public/blog/${FOLDER}/`,
  );
  if (!Array.isArray(raw)) return [];
  return raw.filter((r) => (r.status ?? "published") === "published").map(normalize);
}

export async function getPostBySlug(slug: string): Promise<BlogRow | null> {
  const raw = await fetchJson<Record<string, unknown>>(
    `${API_BASE}/api/analyzer/public/blog/${FOLDER}/${encodeURIComponent(slug)}/`,
  );
  if (!raw || (raw.status && raw.status !== "published")) return null;
  return normalize(raw);
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
