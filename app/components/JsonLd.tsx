// Reusable JSON-LD injector. Renders a <script type="application/ld+json">
// with the given structured-data object. Server component — no client JS.

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, server-generated content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
