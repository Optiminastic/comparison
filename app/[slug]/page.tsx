import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopNav from "@/app/components/TopNav";
import SiteFooter from "@/app/components/SiteFooter";
import JsonLd from "@/app/components/JsonLd";
import { getPosts, getPostBySlug, formatDate } from "@/app/lib/blog-db";
import {
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  stripHtml,
  truncate,
} from "@/app/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found", robots: { index: false } };

  const description = truncate(
    post.description || stripHtml(post.content_html),
  );
  const url = `/${post.slug}`;
  const images = post.image_url
    ? [{ url: post.image_url, alt: post.title }]
    : [OG_IMAGE];

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: post.title,
      description,
      publishedTime: post.published_at ?? undefined,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/${post.slug}`;
  const description = truncate(post.description || stripHtml(post.content_html));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    ...(post.image_url ? { image: post.image_url } : {}),
    ...(post.published_at
      ? { datePublished: post.published_at, dateModified: post.published_at }
      : {}),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <TopNav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 sm:px-8">
        <article className="pb-20 pt-10 sm:pt-14">
          <Link href="/" className="eyebrow text-ink-soft transition-colors hover:text-ink">
            ← Home
          </Link>
          <header className="mt-6 border-b border-line pb-8">
            <time className="eyebrow text-ink-faint">{formatDate(post.published_at)}</time>
            <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            {post.description ? (
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{post.description}</p>
            ) : null}
          </header>
          {post.image_url ? (
            <div className="mt-8 overflow-hidden rounded-lg border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image_url} alt={post.title} className="w-full object-cover" />
            </div>
          ) : null}
          <div
            className="mt-8 [&_a]:text-accent [&_a]:underline [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:text-ink-soft [&_p]:mt-4 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-ink-soft [&_ul]:mt-4"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
