// Data layer for Versus — the side-by-side comparison journal.
// Single source of truth for comparison blog posts. Presentation components
// depend on these types, never the other way around.

export type Category =
  | "Automotive"
  | "AI Tools"
  | "Careers"
  | "Software & Web"
  | "Gadgets";

export interface Side {
  name: string;
  /** A one-line positioning statement. */
  tagline: string;
  pros: string[];
  /** "Choose this if…" guidance. */
  bestFor: string;
}

export interface Dimension {
  /** What's being compared, e.g. "Price", "Learning curve". */
  aspect: string;
  a: string;
  b: string;
  /** Which side has the edge on this row: "a", "b", or "tie". */
  edge: "a" | "b" | "tie";
}

export interface Comparison {
  slug: string;
  /** e.g. "BMW vs Audi". */
  title: string;
  /** Kept only for the generative cover art theming — not shown as navigation. */
  category: Category;
  excerpt: string;
  /** ISO date string (server-stable, no client clock). */
  date: string;
  readingTime: number;
  author: string;
  authorRole: string;
  intro: string[];
  a: Side;
  b: Side;
  dimensions: Dimension[];
  verdict: string;
  featured?: boolean;
}

const COMPARISONS: Comparison[] = [
  {
    slug: "bmw-vs-audi",
    title: "BMW vs Audi",
    category: "Automotive",
    excerpt:
      "Two German icons, two philosophies. One chases the driver; the other chases the road. Here's which badge actually fits your life.",
    date: "2026-06-21",
    readingTime: 8,
    author: "Daniel Roth",
    authorRole: "Automotive Editor",
    featured: true,
    intro: [
      "Ask ten enthusiasts whether to buy a BMW or an Audi and you'll get ten confident, contradictory answers. The truth is that both build excellent cars — they just disagree about what a car should feel like.",
      "BMW still organizes everything around the person holding the wheel. Audi organizes everything around composure, technology, and all-weather confidence. Neither is wrong; they're aimed at different drivers.",
    ],
    a: {
      name: "BMW",
      tagline: "The driver's car.",
      pros: [
        "Sharper steering and a more engaging rear-biased chassis",
        "Punchy, characterful inline-six engines",
        "Better resale on M and performance trims",
      ],
      bestFor:
        "Drivers who want feedback and will happily take the long way home.",
    },
    b: {
      name: "Audi",
      tagline: "The all-weather all-rounder.",
      pros: [
        "Quattro all-wheel drive grips in rain and snow",
        "Calmer, more refined cabin and ride",
        "Cleaner, more cohesive interior tech",
      ],
      bestFor:
        "Buyers who prize comfort, traction, and a serene daily commute.",
    },
    dimensions: [
      { aspect: "Driving feel", a: "Engaging, rear-drive bias", b: "Planted, grippy, neutral", edge: "a" },
      { aspect: "Interior & tech", a: "Driver-focused, iDrive", b: "Polished, Virtual Cockpit", edge: "b" },
      { aspect: "Bad-weather traction", a: "RWD (xDrive optional)", b: "Standard Quattro AWD", edge: "b" },
      { aspect: "Ride comfort", a: "Firmer, sportier", b: "Softer, quieter", edge: "b" },
      { aspect: "Performance halo", a: "M division legacy", b: "RS, strong but younger", edge: "a" },
    ],
    verdict:
      "Buy the BMW if driving is the point and you live somewhere mild. Buy the Audi if you want a quiet, grippy, beautifully built car that shrugs off weather. Most people will be happier in the Audi; enthusiasts will keep choosing the BMW.",
  },
  {
    slug: "electric-vs-petrol-cars",
    title: "Electric vs Petrol Cars",
    category: "Automotive",
    excerpt:
      "Lower running costs and instant torque, or range freedom and a five-minute fill-up? The honest trade-offs in 2026.",
    date: "2026-05-30",
    readingTime: 9,
    author: "Daniel Roth",
    authorRole: "Automotive Editor",
    intro: [
      "The electric-versus-petrol question has finally moved from ideology to logistics. Both can be the right answer — it depends almost entirely on how and where you drive.",
      "The deciding factor is rarely the car itself. It's whether you can charge where you park.",
    ],
    a: {
      name: "Electric",
      tagline: "Cheaper to run, quieter to drive.",
      pros: [
        "Far lower energy and maintenance costs",
        "Instant torque and near-silent cabin",
        "Charges at home overnight — no fuel stops",
      ],
      bestFor:
        "Drivers with home or workplace charging and mostly local mileage.",
    },
    b: {
      name: "Petrol",
      tagline: "Refuel anywhere in five minutes.",
      pros: [
        "Long range with a nationwide fuel network",
        "Lower upfront price on most models",
        "No range anxiety on long road trips",
      ],
      bestFor:
        "High-mileage drivers, frequent road-trippers, and those without home charging.",
    },
    dimensions: [
      { aspect: "Running cost", a: "Very low per mile", b: "Higher fuel + servicing", edge: "a" },
      { aspect: "Upfront price", a: "Higher (falling fast)", b: "Lower on average", edge: "b" },
      { aspect: "Refuel/recharge", a: "Slow away from home", b: "Five-minute fill-up", edge: "b" },
      { aspect: "Driving experience", a: "Instant, silent torque", b: "Engine character & sound", edge: "tie" },
      { aspect: "Long trips", a: "Needs charge planning", b: "Go anywhere", edge: "b" },
    ],
    verdict:
      "If you can charge at home and drive mostly locally, electric wins on cost and daily ease. If you rack up long highway miles or can't charge where you park, petrol is still the pragmatic choice — for now.",
  },
  {
    slug: "claude-code-vs-codex",
    title: "Claude Code vs Codex",
    category: "AI Tools",
    excerpt:
      "Two terminal-native coding agents, two styles of autonomy. Which one actually ships working code on your repo?",
    date: "2026-06-19",
    readingTime: 10,
    author: "Priya Nair",
    authorRole: "Developer Tools",
    featured: true,
    intro: [
      "AI coding agents have graduated from autocomplete to teammates that read a repo, edit files, run commands, and explain themselves. Claude Code and Codex are the two most capable terminal-native options — and they make different bets about how much rope to give the model.",
      "The right pick depends on how much you want to supervise versus delegate.",
    ],
    a: {
      name: "Claude Code",
      tagline: "A careful, explainable pair-programmer.",
      pros: [
        "Strong long-context reasoning across large codebases",
        "Transparent plans and step-by-step approvals",
        "Excellent at refactors and writing tests",
      ],
      bestFor:
        "Developers who want a teammate they can review like a pull request.",
    },
    b: {
      name: "Codex",
      tagline: "Fast, autonomous task completion.",
      pros: [
        "Aggressive end-to-end task automation",
        "Tight integration with the wider tooling ecosystem",
        "Quick scaffolding of new features",
      ],
      bestFor:
        "Engineers who want to hand off a whole task and check the result.",
    },
    dimensions: [
      { aspect: "Reasoning depth", a: "Deep, deliberate", b: "Fast, action-first", edge: "a" },
      { aspect: "Autonomy", a: "Approval-gated by default", b: "More hands-off", edge: "tie" },
      { aspect: "Code review fit", a: "Reviewable diffs, clear plans", b: "Larger batched changes", edge: "a" },
      { aspect: "Ecosystem", a: "Growing fast", b: "Broad integrations", edge: "b" },
      { aspect: "Best at", a: "Refactors, tests, explanation", b: "Greenfield scaffolding", edge: "tie" },
    ],
    verdict:
      "Reach for Claude Code when you want to understand and review every change, especially on a codebase you care about. Reach for Codex when you want to delegate a contained task and move on. Many teams keep both in the toolbox.",
  },
  {
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude",
    category: "AI Tools",
    excerpt:
      "The two assistants most people actually use. One is the versatile generalist; the other is the careful long-form thinker.",
    date: "2026-06-08",
    readingTime: 8,
    author: "Priya Nair",
    authorRole: "Developer Tools",
    intro: [
      "For everyday work, the assistant race has narrowed to two names. ChatGPT and Claude are both excellent — and they have genuinely different temperaments.",
      "Pick based on the kind of work you do most.",
    ],
    a: {
      name: "ChatGPT",
      tagline: "The versatile generalist.",
      pros: [
        "Huge plugin and tooling ecosystem",
        "Strong at quick, varied everyday tasks",
        "Wide availability across apps and devices",
      ],
      bestFor: "Users who want one flexible tool for a bit of everything.",
    },
    b: {
      name: "Claude",
      tagline: "The careful long-form thinker.",
      pros: [
        "Excellent long-context reading and writing",
        "Measured, on-the-nose tone for serious drafts",
        "Strong, careful reasoning on complex problems",
      ],
      bestFor:
        "Writers and analysts working with long documents and nuanced tasks.",
    },
    dimensions: [
      { aspect: "Everyday versatility", a: "Very broad", b: "Broad", edge: "a" },
      { aspect: "Long-document work", a: "Good", b: "Excellent", edge: "b" },
      { aspect: "Writing tone", a: "Flexible", b: "Polished, careful", edge: "b" },
      { aspect: "Ecosystem & plugins", a: "Extensive", b: "Growing", edge: "a" },
      { aspect: "Complex reasoning", a: "Strong", b: "Strong", edge: "tie" },
    ],
    verdict:
      "Choose ChatGPT as a flexible all-rounder with the deepest ecosystem. Choose Claude when the work is long-form, nuanced, or writing-heavy. Plenty of professionals pay for both and switch by task.",
  },
  {
    slug: "software-engineer-vs-software-developer",
    title: "Software Engineer vs Software Developer",
    category: "Careers",
    excerpt:
      "The titles are used interchangeably — until they aren't. What actually separates the two, and which path pays.",
    date: "2026-06-15",
    readingTime: 7,
    author: "Sofia Lang",
    authorRole: "Careers Editor",
    featured: true,
    intro: [
      "Recruiters swap these titles freely, which is exactly why the distinction confuses people. In practice there is a difference in emphasis, even when the day-to-day overlaps heavily.",
      "Think of it as scope of concern: one leans toward building, the other toward engineering systems.",
    ],
    a: {
      name: "Software Developer",
      tagline: "Builds the product, feature by feature.",
      pros: [
        "Hands-on, fast iteration on real features",
        "Often closer to product and users",
        "Lower barrier to entry early in a career",
      ],
      bestFor:
        "People who love shipping tangible features and seeing quick results.",
    },
    b: {
      name: "Software Engineer",
      tagline: "Designs the system around the product.",
      pros: [
        "Owns architecture, scale, and reliability",
        "Applies engineering rigor and trade-off analysis",
        "Typically higher ceiling on pay and seniority",
      ],
      bestFor:
        "People who enjoy systems design, scale, and long-term trade-offs.",
    },
    dimensions: [
      { aspect: "Primary focus", a: "Building features", b: "Designing systems", edge: "tie" },
      { aspect: "Scope", a: "Component / product", b: "System / architecture", edge: "b" },
      { aspect: "Rigor", a: "Pragmatic", b: "Formal engineering", edge: "b" },
      { aspect: "Entry barrier", a: "Lower", b: "Higher", edge: "a" },
      { aspect: "Typical pay ceiling", a: "High", b: "Higher", edge: "b" },
    ],
    verdict:
      "The titles overlap, but 'engineer' usually signals broader ownership of systems, scale, and trade-offs, while 'developer' signals hands-on feature building. Judge the job by its actual responsibilities, not the word in the title.",
  },
  {
    slug: "react-vs-vue",
    title: "React vs Vue",
    category: "Software & Web",
    excerpt:
      "The most popular UI library against the most approachable framework. Which should your next project bet on?",
    date: "2026-06-11",
    readingTime: 8,
    author: "Sam Okafor",
    authorRole: "Web Engineering",
    intro: [
      "React and Vue solve the same problem — building interactive UIs — with different philosophies about how much the framework should hold your hand.",
    ],
    a: {
      name: "React",
      tagline: "The flexible industry standard.",
      pros: [
        "Largest ecosystem and job market",
        "Backed by a vast component and tooling community",
        "Maximum flexibility in how you structure apps",
      ],
      bestFor: "Teams that value ecosystem, hiring, and flexibility.",
    },
    b: {
      name: "Vue",
      tagline: "The approachable, batteries-included framework.",
      pros: [
        "Gentle learning curve and clear conventions",
        "Excellent official router and state libraries",
        "Clean single-file component model",
      ],
      bestFor: "Teams that want productivity and convention over assembly.",
    },
    dimensions: [
      { aspect: "Learning curve", a: "Steeper", b: "Gentler", edge: "b" },
      { aspect: "Ecosystem size", a: "Largest", b: "Large", edge: "a" },
      { aspect: "Job market", a: "Biggest", b: "Solid", edge: "a" },
      { aspect: "Conventions", a: "Assemble your own", b: "Batteries included", edge: "b" },
      { aspect: "Performance", a: "Excellent", b: "Excellent", edge: "tie" },
    ],
    verdict:
      "Pick React for the biggest ecosystem and the easiest hiring. Pick Vue for a smoother learning curve and a more cohesive out-of-the-box experience. Both are safe, fast, and production-proven.",
  },
  {
    slug: "sql-vs-nosql",
    title: "SQL vs NoSQL",
    category: "Software & Web",
    excerpt:
      "Structured tables and guarantees, or flexible documents and scale? The choice that shapes your whole backend.",
    date: "2026-05-21",
    readingTime: 8,
    author: "Sam Okafor",
    authorRole: "Web Engineering",
    intro: [
      "The SQL-versus-NoSQL debate is really about trade-offs between consistency and flexibility. Most teams end up using both — but the default matters.",
    ],
    a: {
      name: "SQL",
      tagline: "Structure, relationships, guarantees.",
      pros: [
        "Strong consistency and ACID transactions",
        "Powerful joins and ad-hoc queries",
        "Decades of tooling and expertise",
      ],
      bestFor:
        "Apps with clear relationships and a need for data integrity.",
    },
    b: {
      name: "NoSQL",
      tagline: "Flexible schemas, horizontal scale.",
      pros: [
        "Flexible, evolving document schemas",
        "Scales out easily for huge workloads",
        "Great fit for unstructured or varied data",
      ],
      bestFor:
        "High-scale, fast-evolving data that doesn't fit neat tables.",
    },
    dimensions: [
      { aspect: "Schema", a: "Fixed, relational", b: "Flexible, dynamic", edge: "tie" },
      { aspect: "Consistency", a: "Strong (ACID)", b: "Often eventual", edge: "a" },
      { aspect: "Scaling", a: "Vertical-leaning", b: "Horizontal-native", edge: "b" },
      { aspect: "Complex queries", a: "Excellent (joins)", b: "Limited", edge: "a" },
      { aspect: "Flexibility", a: "Lower", b: "Higher", edge: "b" },
    ],
    verdict:
      "Default to SQL when your data has clear relationships and integrity matters — which is most apps. Reach for NoSQL when you need flexible schemas or massive horizontal scale. Mixing both is common and fine.",
  },
  {
    slug: "iphone-vs-android",
    title: "iPhone vs Android",
    category: "Gadgets",
    excerpt:
      "Seamless and curated, or open and customizable? The oldest debate in tech, settled by how you actually use a phone.",
    date: "2026-06-04",
    readingTime: 7,
    author: "Maya Brooks",
    authorRole: "Consumer Tech",
    intro: [
      "After more than a decade, the iPhone-versus-Android question is less about raw capability and more about values: control versus choice.",
    ],
    a: {
      name: "iPhone",
      tagline: "Seamless, curated, long-supported.",
      pros: [
        "Tight hardware-software integration",
        "Years of software updates and resale value",
        "Best-in-class app quality and privacy defaults",
      ],
      bestFor: "People who want it to just work and stay supported for years.",
    },
    b: {
      name: "Android",
      tagline: "Open, flexible, endlessly varied.",
      pros: [
        "Huge range of hardware at every price",
        "Deep customization and sideloading",
        "More flexible defaults and file access",
      ],
      bestFor: "People who want choice, customization, and price options.",
    },
    dimensions: [
      { aspect: "Ecosystem", a: "Tightly integrated", b: "Open & varied", edge: "tie" },
      { aspect: "Customization", a: "Limited", b: "Extensive", edge: "b" },
      { aspect: "Hardware choice", a: "Few models", b: "Every price point", edge: "b" },
      { aspect: "Software updates", a: "Long & consistent", b: "Varies by maker", edge: "a" },
      { aspect: "Resale value", a: "Strong", b: "Weaker", edge: "a" },
    ],
    verdict:
      "Pick iPhone for seamless integration, long support, and resale value. Pick Android for choice, customization, and price flexibility. Your existing devices usually tip the balance.",
  },
];

/** Comparisons sorted newest-first. */
export function getAllComparisons(): Comparison[] {
  return [...COMPARISONS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}

/** Featured items for the homepage hero pair (falls back to newest). */
export function getFeatured(count = 2): Comparison[] {
  const all = getAllComparisons();
  const featured = all.filter((c) => c.featured);
  const rest = all.filter((c) => !c.featured);
  return [...featured, ...rest].slice(0, count);
}

/** Stable formatter — avoids locale/clock differences between server/client. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}
