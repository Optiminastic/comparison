import type { MetadataRoute } from "next";
import { getAllComparisons } from "@/app/lib/comparisons";
import { getPosts } from "@/app/lib/blog-db";
import { SITE_URL } from "@/app/lib/seo";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Local comparisons — always available (in-memory data).
  const comparisons: MetadataRoute.Sitemap = getAllComparisons().map((c) => ({
    url: `${SITE_URL}/comparison/${c.slug}`,
    lastModified: new Date(c.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // DB-backed posts — network fetch, must never break the build.
  let posts: MetadataRoute.Sitemap = [];
  try {
    posts = (await getPosts()).map((p) => ({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: p.published_at ? new Date(p.published_at) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    posts = [];
  }

  return [...home, ...comparisons, ...posts];
}
