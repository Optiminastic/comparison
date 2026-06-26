import TopNav from "@/app/components/TopNav";
import ComparisonCard from "@/app/components/ComparisonCard";
import Newsletter from "@/app/components/Newsletter";
import SiteFooter from "@/app/components/SiteFooter";
import LatestFromBlog from "@/app/components/LatestFromBlog";
import { getAllComparisons, getFeatured } from "@/app/lib/comparisons";

export const revalidate = 300;

export default function Home() {
  const featured = getFeatured(2);
  const featuredSlugs = new Set(featured.map((c) => c.slug));
  const rest = getAllComparisons().filter((c) => !featuredSlugs.has(c.slug));

  return (
    <>
      <TopNav />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        <LatestFromBlog />
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

        {/* Grid of the rest */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((c) => (
            <ComparisonCard key={c.slug} comparison={c} />
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
