import Link from "next/link";
import type { Comparison } from "@/app/lib/comparisons";
import VersusArt from "./VersusArt";

// One comparison rendered as an editorial card. `variant` controls the scale:
// "featured" for the hero pair, "grid" for the dense lower grid.
export default function ComparisonCard({
  comparison,
  variant = "grid",
}: {
  comparison: Comparison;
  variant?: "featured" | "grid";
}) {
  const isFeatured = variant === "featured";

  return (
    <article className="group">
      <Link href={`/comparison/${comparison.slug}`} className="block focus:outline-none">
        <div
          className={`relative w-full overflow-hidden ${
            isFeatured ? "aspect-[16/11]" : "aspect-[16/10]"
          }`}
        >
          <VersusArt
            comparison={comparison}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className={isFeatured ? "mt-5" : "mt-3"}>
          <h3
            className={`font-display mt-2 font-semibold leading-[1.12] tracking-tight text-ink transition-colors group-hover:text-accent ${
              isFeatured
                ? "text-2xl sm:text-[1.7rem]"
                : "clamp-2 text-base sm:text-lg"
            }`}
          >
            {comparison.title}
            {isFeatured && (
              <span className="text-ink-soft">
                {" "}
                — {comparison.a.name} or {comparison.b.name}?
              </span>
            )}
          </h3>
        </div>
      </Link>
    </article>
  );
}
