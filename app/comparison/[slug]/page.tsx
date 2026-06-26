import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopNav from "@/app/components/TopNav";
import Newsletter from "@/app/components/Newsletter";
import SiteFooter from "@/app/components/SiteFooter";
import ComparisonCard from "@/app/components/ComparisonCard";
import VersusArt from "@/app/components/VersusArt";
import {
  formatDate,
  getAllComparisons,
  getAllSlugs,
  getComparisonBySlug,
  type Side,
} from "@/app/lib/comparisons";

// Pre-render every comparison at build time.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) return { title: "Not found — Versus" };
  return { title: `${c.title} — Versus`, description: c.excerpt };
}

function SideCard({ side, accent }: { side: Side; accent: "a" | "b" }) {
  return (
    <div className="border border-line bg-paper-raised p-6">
      <div className="eyebrow text-ink-faint">
        {accent === "a" ? "Option A" : "Option B"}
      </div>
      <h3 className="font-display mt-1 text-2xl font-bold tracking-tight text-ink">
        {side.name}
      </h3>
      <p className="mt-1 text-sm italic text-ink-soft">{side.tagline}</p>

      <ul className="mt-5 space-y-2.5">
        {side.pros.map((pro) => (
          <li key={pro} className="flex items-start gap-2.5 text-sm text-ink-soft">
            <span aria-hidden className="mt-0.5 text-accent">
              +
            </span>
            <span className="leading-relaxed">{pro}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-line pt-4 text-sm text-ink">
        <span className="eyebrow text-ink-faint">Best for </span>
        <br />
        {side.bestFor}
      </p>
    </div>
  );
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) notFound();

  const related = getAllComparisons()
    .filter((c) => c.slug !== comparison.slug)
    .slice(0, 3);

  return (
    <>
      <TopNav />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 sm:px-8">
        <article className="pt-10 sm:pt-14">
          <Link
            href="/#blog"
            className="eyebrow text-ink-faint transition-colors hover:text-ink"
          >
            ← All comparisons
          </Link>

          {/* Header */}
          <header className="mt-6 border-b border-line pb-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="eyebrow text-ink-faint">
                {formatDate(comparison.date)} · {comparison.readingTime} min read
              </span>
            </div>

            <h1 className="font-display mt-5 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
              {comparison.title}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {comparison.excerpt}
            </p>
          </header>

          {/* Cover */}
          <div className="mt-8 overflow-hidden">
            <VersusArt comparison={comparison} className="aspect-[16/7] w-full" />
          </div>

          {/* Intro */}
          <div className="mt-8 space-y-4">
            {comparison.intro.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-ink first-letter:font-display first-letter:mr-2 first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-accent"
                    : "text-lg leading-relaxed text-ink-soft"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* The two contenders */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <SideCard side={comparison.a} accent="a" />
            <SideCard side={comparison.b} accent="b" />
          </div>

          {/* Head-to-head table */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              Head to head
            </h2>
            <div className="mt-5 overflow-hidden border border-line">
              {/* Header row */}
              <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-ink text-paper">
                <div className="eyebrow px-4 py-3">Aspect</div>
                <div className="eyebrow px-4 py-3">{comparison.a.name}</div>
                <div className="eyebrow px-4 py-3">{comparison.b.name}</div>
              </div>
              {comparison.dimensions.map((d, i) => (
                <div
                  key={d.aspect}
                  className={`grid grid-cols-[1.1fr_1fr_1fr] text-sm ${
                    i % 2 ? "bg-paper-raised" : "bg-paper"
                  }`}
                >
                  <div className="border-t border-line px-4 py-3 font-medium text-ink">
                    {d.aspect}
                  </div>
                  <div
                    className={`border-l border-t border-line px-4 py-3 ${
                      d.edge === "a" ? "font-semibold text-ink" : "text-ink-soft"
                    }`}
                  >
                    {d.a}
                    {d.edge === "a" && <span className="ml-1 text-accent">✓</span>}
                  </div>
                  <div
                    className={`border-l border-t border-line px-4 py-3 ${
                      d.edge === "b" ? "font-semibold text-ink" : "text-ink-soft"
                    }`}
                  >
                    {d.b}
                    {d.edge === "b" && <span className="ml-1 text-accent">✓</span>}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              ✓ marks the side with the edge on that row. Rows without a mark are
              a genuine tie.
            </p>
          </section>

          {/* Verdict */}
          <section className="mt-12 border border-line-strong bg-ink p-6 text-paper sm:p-8">
            <div className="eyebrow text-paper/60">The verdict</div>
            <p className="mt-3 font-display text-xl leading-relaxed sm:text-2xl">
              {comparison.verdict}
            </p>
          </section>

          {/* Author */}
          <div className="mt-10 flex items-center gap-3 border-t border-line pt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-medium text-paper">
              {comparison.author
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <div className="text-sm font-medium text-ink">
                {comparison.author}
              </div>
              <div className="eyebrow text-ink-faint">
                {comparison.authorRole}
              </div>
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-line py-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              More comparisons
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <ComparisonCard key={c.slug} comparison={c} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Newsletter />
      <SiteFooter />
    </>
  );
}
