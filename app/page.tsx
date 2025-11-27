import Link from "next/link";
import Image from "next/image";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { decks, getDeckWithImage } from "@/config/decks";

export default function Home() {
  // Sort decks by creation date, newest first and ensure they have images
  const sortedDecks = [...decks]
    .map(deck => getDeckWithImage(deck))
    .sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
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
              // Ensure we have an imageUrl for this deck
              const deckWithImage = getDeckWithImage(deck);
              const hasDataUrl = deckWithImage.imageUrl?.startsWith('data:');
              
              return (
                <Link key={deck.slug} href={`/decks/${deck.slug}`}>
                  <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer flex flex-col">
                    {/* Image container - shows image if available, placeholder if not */}
                    <div className="px-6">
                      <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl bg-muted">
                        {deckWithImage.imageUrl ? (
                          // Use background-image for data URLs (SVG gradients) or Image component for regular URLs
                          hasDataUrl ? (
                            <div
                              className="absolute inset-0 w-full h-full rounded-xl"
                              style={{
                                backgroundImage: `url(${deckWithImage.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                              }}
                              aria-hidden="true"
                            />
                          ) : (
                            <Image
                              src={deckWithImage.imageUrl}
                              alt={`${deck.title} preview`}
                              fill
                              className="object-cover rounded-xl"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          )
                        ) : (
                          <div className="absolute inset-0 w-full h-full bg-muted/50 flex items-center justify-center rounded-xl">
                            <span className="text-xs text-muted-foreground">No image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  <CardHeader>
                    <CardTitle>{deck.title}</CardTitle>
                    <CardDescription>{deck.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto border-t pt-4">
                    <span className="text-xs text-muted-foreground">
                      Created {formatDate(deckWithImage.createdAt)}
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
