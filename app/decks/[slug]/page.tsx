import { decks } from "@/config/decks";
import DeckPageClient from "./DeckPageClient";

// Export generateStaticParams for static export
// This tells Next.js which deck slugs to pre-render at build time
// Required for static export with dynamic routes
export function generateStaticParams() {
  return decks.map((deck) => ({
    slug: deck.slug,
  }));
}

// Server component wrapper that exports generateStaticParams
// Renders the client component which handles all interactive logic
export default function DeckPage() {
  return <DeckPageClient />;
}

