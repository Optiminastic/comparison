// Deterministic, generative cover art for the comparison network: a split panel
// seeded per slug. For a real A-vs-B comparison it shows each side's short label
// and a "VS" badge; for a plain post (no sides) it renders the same split as a
// clean, label-less cover. Muted editorial palette, zero external images.

const PALETTES: { a: string; b: string; aInk: string; bInk: string }[] = [
  { a: "#c9bba6", b: "#7d7468", aInk: "#3a342a", bInk: "#f3f0e8" },
  { a: "#cfc4b0", b: "#6f675a", aInk: "#363024", bInk: "#f3f0e8" },
  { a: "#b9c2b0", b: "#6f6a60", aInk: "#33392e", bInk: "#f3f0e8" },
  { a: "#d8c3b0", b: "#8a6f5e", aInk: "#3d2e22", bInk: "#f8f1ea" },
  { a: "#c2c0c8", b: "#6c6a73", aInk: "#312f38", bInk: "#f3f0e8" },
  { a: "#cdb9a0", b: "#7a6552", aInk: "#3a2c1f", bInk: "#f6efe7" },
  { a: "#b6c0c4", b: "#5f6a6e", aInk: "#28312f", bInk: "#eef3f2" },
];

/** Tiny deterministic hash → 0..1 generator seeded by a string. */
function seeded(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shortLabel(name: string): string {
  // Keep it readable inside the panel: short names whole, long names initialed.
  if (name.length <= 9) return name.toUpperCase();
  const words = name.split(/\s|·/).filter(Boolean);
  if (words.length > 1) {
    return words
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 4);
  }
  return name.slice(0, 8).toUpperCase();
}

export default function VersusArt({
  slug,
  a,
  b,
  className = "",
}: {
  slug: string;
  /** Side labels — present for comparisons, omitted for plain posts. */
  a?: string;
  b?: string;
  className?: string;
}) {
  const rand = seeded(slug);
  const palette = PALETTES[Math.floor(rand() * PALETTES.length)];
  const skew = 12 + Math.floor(rand() * 16); // diagonal offset for the split
  const versus = Boolean(a && b);

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={versus ? `${a} versus ${b} cover artwork` : "Cover artwork"}
    >
      {/* Side A */}
      <polygon points={`0,0 ${200 + skew},0 ${200 - skew},300 0,300`} fill={palette.a} />
      {/* Side B */}
      <polygon
        points={`${200 + skew},0 400,0 400,300 ${200 - skew},300`}
        fill={palette.b}
      />

      {/* Subtle dot grid texture on side A */}
      <g opacity="0.12" fill={palette.aInk}>
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={30 + c * 34} cy={40 + r * 60} r="3" />
          ))
        )}
      </g>

      {/* Labels + VS badge — only for real A-vs-B comparisons */}
      {versus && (
        <>
          <text
            x="92"
            y="160"
            textAnchor="middle"
            fontFamily="var(--font-archivo), Helvetica, sans-serif"
            fontSize="30"
            fontWeight="700"
            fill={palette.aInk}
          >
            {shortLabel(a!)}
          </text>
          <text
            x="312"
            y="160"
            textAnchor="middle"
            fontFamily="var(--font-archivo), Helvetica, sans-serif"
            fontSize="30"
            fontWeight="700"
            fill={palette.bInk}
          >
            {shortLabel(b!)}
          </text>

          <circle cx="200" cy="150" r="30" fill="#1b1a17" />
          <text
            x="200"
            y="151"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="var(--font-archivo), Helvetica, sans-serif"
            fontSize="20"
            fontWeight="800"
            fontStyle="italic"
            fill="#f3f0e8"
          >
            VS
          </text>
        </>
      )}
    </svg>
  );
}
