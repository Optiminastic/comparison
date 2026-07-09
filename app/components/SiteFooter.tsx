import Link from "next/link";

const FOLLOW = ["Twitter", "Instagram", "YouTube", "LinkedIn"];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center border border-line-strong text-[10px]">
              ▢
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-tight text-ink">
              Better Versus
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            Honest, side-by-side comparisons that help you decide — the
            differences that actually matter.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-ink-faint">Better Versus</h3>
          <ul className="mt-4 space-y-2.5">
            {["About", "How we compare", "Suggest a matchup", "Contact"].map(
              (link) => (
                <li key={link}>
                  <Link
                    href="/#blog"
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {link}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-ink-faint">Follow</h3>
          <ul className="mt-4 space-y-2.5">
            {FOLLOW.map((f) => (
              <li key={f}>
                <Link
                  href="/#newsletter"
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {f}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="eyebrow">© 2026 Better Versus. All rights reserved.</span>
          <span className="eyebrow flex gap-5">
            <Link href="/" className="transition-colors hover:text-ink">Privacy</Link>
            <Link href="/" className="transition-colors hover:text-ink">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
