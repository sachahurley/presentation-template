import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { decks } from "@/config/decks";
import { DeckThumbnailGradient } from "@/components/deck/DeckThumbnailGradient";

export default function Home() {
  // Sort decks by most recent date (updatedAt if exists, otherwise createdAt), newest first
  const sortedDecks = [...decks].sort((a, b) => {
    // Get the most recent date for each deck (updatedAt if it exists, otherwise createdAt)
    const dateA = a.updatedAt?.getTime() || a.createdAt.getTime();
    const dateB = b.updatedAt?.getTime() || b.createdAt.getTime();
    // Sort descending (newest first)
    return dateB - dateA;
  });

  // Format date for display (e.g., "Dec 20, 2024")
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Presentations</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/design-system"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Design System
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">All Decks</h2>
            <p className="text-muted-foreground">
              Select a deck to view or create a new presentation
            </p>
          </div>

        {/* Deck grid */}
        {sortedDecks.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No decks yet</CardTitle>
              <CardDescription>
                Create your first deck by adding it to the config/decks.ts file
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedDecks.map((deck) => {
              return (
                <Link key={deck.slug} href={`/decks/${deck.slug}`} className="deck-thumbnail-wrapper block">
                  <Card className="h-full transition-all cursor-pointer flex flex-col bg-card">
                    {/* Thumbnail container - uses same gradient as title slide */}
                    <div className="px-6">
                      <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl bg-muted">
                        {/* Example deck uses simple gray placeholder, others use gradient */}
                        {deck.slug === "example-deck" ? (
                          <div className="absolute inset-0 bg-muted rounded-xl" />
                        ) : (
                          <DeckThumbnailGradient className="rounded-xl" />
                        )}
                      </div>
                    </div>
                  <CardHeader>
                    <CardTitle>{deck.title}</CardTitle>
                    <CardDescription>{deck.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto border-t pt-4">
                    <span className="text-xs text-muted-foreground">
                      {deck.updatedAt ? (
                        <>Updated {formatDate(deck.updatedAt)}</>
                      ) : (
                        <>Created {formatDate(deck.createdAt)}</>
                      )}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            );
            })}
          </div>
        )}
        </div>
      </main>
    </div>
  );
}
