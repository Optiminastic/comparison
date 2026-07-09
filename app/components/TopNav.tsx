import Link from "next/link";

// Top bar: wordmark left, primary nav + actions right — mirroring the
// reference editorial header.
export default function TopNav() {
  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
            <path d="M4 5 H14 V27 H4 Z" fill="#1b1a17" />
            <path d="M18 5 H28 V27 H18 Z" fill="#b15b3c" />
          </svg>
          <span className="font-display text-lg font-bold uppercase tracking-tight text-ink">
            Better Versus
          </span>
        </Link>

        <Link
          href="/#newsletter"
          className="inline-flex items-center bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-accent"
        >
          Let&apos;s Talk
        </Link>
      </nav>
    </header>
  );
}
