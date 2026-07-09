import Link from "next/link";
import type { FeedItem } from "@/app/lib/feed";
import VersusArt from "./VersusArt";

// Grid card for the homepage blog feed — a comparison OR a published Signalor
// post. Both use the same split cover art (labelled A-vs-B for comparisons, a
// clean label-less cover for posts) with the title below. Matches the "grid"
// scale of ComparisonCard.
export default function FeedCard({ item }: { item: FeedItem }) {
  return (
    <article className="group">
      <Link href={item.href} className="block focus:outline-none">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <VersusArt
            slug={item.slug}
            a={item.a}
            b={item.b}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-3">
          <h3 className="font-display clamp-2 mt-2 text-base font-semibold leading-[1.12] tracking-tight text-ink transition-colors group-hover:text-accent sm:text-lg">
            {item.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
