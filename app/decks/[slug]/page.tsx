import { notFound } from "next/navigation";
import Link from "next/link";
import { getDeckBySlug } from "@/config/decks";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DeckLayout } from "@/components/templates/DeckLayout";
import { ChevronLeft } from "lucide-react";

interface DeckPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);

  if (!deck) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">
              <span className="text-muted-foreground">Presentations</span> / {deck.title}
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Deck content */}
      <main className="pt-16">
        <DeckLayout deck={deck} />
      </main>
    </div>
  );
}

