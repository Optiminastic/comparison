import TopNav from "@/app/components/TopNav";
import ComparisonCard from "@/app/components/ComparisonCard";
import FeedCard from "@/app/components/FeedCard";
import Newsletter from "@/app/components/Newsletter";
import SiteFooter from "@/app/components/SiteFooter";
import JsonLd from "@/app/components/JsonLd";
import { getFeatured } from "@/app/lib/comparisons";
import { getFeedItems } from "@/app/lib/feed";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/app/lib/seo";

export const revalidate = 300;

export default async function Home() {
  const featured = getFeatured(2);
  const featuredSlugs = new Set(featured.map((c) => c.slug));
  const gridItems = (await getFeedItems()).filter((it) => !featuredSlugs.has(it.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        description: SITE_TAGLINE,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <TopNav />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        {/* Blog hero */}
        <section id="blog" className="pt-10 sm:pt-14">
          <div>
            <h1 className="font-display text-6xl font-bold tracking-tight text-ink sm:text-7xl">
              Blog
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              Honest, side-by-side comparisons — from BMW vs Audi to Claude
              Code vs Codex. The differences that actually matter, with a
              clear verdict.
            </p>
          </div>
        </section>

        <hr className="mt-8 border-line" />

        {/* Featured pair */}
        <section className="grid grid-cols-1 gap-x-10 gap-y-10 py-12 md:grid-cols-2 md:divide-x md:divide-line">
          {featured.map((c, i) => (
            <div key={c.slug} className={i === 1 ? "md:pl-10" : ""}>
              <ComparisonCard comparison={c} variant="featured" />
            </div>
          ))}
        </section>

        <hr className="border-line" />

        {/* Grid — remaining comparisons + published posts, newest first */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {gridItems.map((item) => (
            <FeedCard key={`${item.kind}-${item.slug}`} item={item} />
          ))}
        </section>

        {/* Pagination (single page of content — shown for parity with the design) */}
        <nav
          aria-label="Pagination"
          className="flex items-center justify-between border-t border-line py-8"
        >
          <span className="eyebrow cursor-not-allowed border border-line px-4 py-2 text-ink-faint">
            Previous
          </span>
          <span className="eyebrow text-ink-faint">Page 1 of 1</span>
          <span className="eyebrow cursor-not-allowed border border-line px-4 py-2 text-ink-faint">
            Next
          </span>
        </nav>
      </main>

      <Newsletter />
      <SiteFooter />
    </>
  );
}
