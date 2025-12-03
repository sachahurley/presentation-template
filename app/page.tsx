"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { decks } from "@/config/decks";
import { DeckThumbnailGradient } from "@/components/deck/DeckThumbnailGradient";
import { CreateDeckModal } from "@/components/deck/CreateDeckModal";
import { DeckSettingsModal } from "@/components/deck/DeckSettingsModal";
import { getDecksFromLocalStorage } from "@/lib/deck-storage";
import { Deck } from "@/config/decks";
import { Edit, Plus } from "lucide-react";
import { GlobeScene } from "@/components/globe/GlobeScene";

export default function Home() {
  const [localStorageDecks, setLocalStorageDecks] = useState<Deck[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [selectedDeckIsLocalStorage, setSelectedDeckIsLocalStorage] = useState(false);

  // Load localStorage decks on mount
  useEffect(() => {
    const storedDecks = getDecksFromLocalStorage();
    setLocalStorageDecks(storedDecks);
  }, []);

  // Combine config decks and localStorage decks
  const allDecks = [...decks, ...localStorageDecks];

  // Sort decks by most recent date (updatedAt if exists, otherwise createdAt), newest first
  const sortedDecks = [...allDecks].sort((a, b) => {
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

  // Check if a deck is from localStorage
  const isLocalStorageDeck = (deck: Deck): boolean => {
    return localStorageDecks.some((d) => d.slug === deck.slug);
  };

  // Handle edit icon click
  const handleSettingsClick = (e: React.MouseEvent, deck: Deck) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDeck(deck);
    setSelectedDeckIsLocalStorage(isLocalStorageDeck(deck));
    setSettingsModalOpen(true);
  };

  // Handle deck deletion
  const handleDeckDelete = () => {
    const storedDecks = getDecksFromLocalStorage();
    setLocalStorageDecks(storedDecks);
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Presento</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="default" asChild>
              <Link href="/design-system">
                Design System
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16">
        {/* Hero section with animated globe - full viewport height */}
        <section className="relative w-full overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="w-full px-4 py-8 md:py-12">
            <div className="flex flex-col items-center gap-8 md:gap-10">
              {/* Page title and subtitle */}
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal" style={{ fontFamily: "'Caudex', serif", letterSpacing: '0.1em' }}>
                  Presento
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-mono text-center">
                  Create and manage your presentation decks
                </p>
              </div>
              
              {/* Globe container - centered, 25% larger */}
              <div className="relative w-full max-w-[586px] h-[391px] md:h-[488px] lg:h-[586px]">
                <GlobeScene size={1.953125} rotationSpeed={1.0} className="w-full h-full" />
                {/* Overlay button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Button
                    size="xl"
                    variant="gradient"
                    className="pointer-events-auto"
                    onClick={() => {
                      const allSection = document.getElementById('all-section');
                      if (allSection) {
                        allSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    <span className="relative z-10">Get Started</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="all-section" className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">All</h2>
              <p className="text-muted-foreground">
                Select a deck to view or create a new presentation
              </p>
            </div>
            <Button onClick={() => setCreateModalOpen(true)}>
              Create
              <Plus className="h-4 w-4 ml-2" />
            </Button>
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
              const isLocalStorage = isLocalStorageDeck(deck);
              return (
                <div key={deck.slug} className="relative group">
                  <Link href={`/decks/${deck.slug}`} className="deck-thumbnail-wrapper block">
                    <Card className="h-full transition-all cursor-pointer flex flex-col bg-card">
                      {/* Thumbnail container - uses same gradient as title slide */}
                      <div className="px-6">
                        <div className="relative w-full h-[192px] flex items-center justify-center overflow-hidden rounded-xl bg-muted">
                          {/* Custom image, example deck placeholder, or gradient */}
                          {deck.imageUrl ? (
                            <img
                              src={deck.imageUrl}
                              alt={deck.title}
                              className="absolute inset-0 w-full h-full object-cover rounded-xl"
                            />
                          ) : deck.slug === "example-deck" ? (
                            <div className="absolute inset-0 bg-muted rounded-xl" />
                          ) : (
                            <DeckThumbnailGradient className="rounded-xl" />
                          )}
                          {/* LocalStorage badge */}
                          {isLocalStorage && (
                            <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-md">
                              Draft
                            </span>
                          )}
                        </div>
                      </div>
                      <CardHeader className="h-[80px] flex flex-col items-start justify-start">
                        <CardTitle className="line-clamp-2">{deck.title}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">{deck.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="mt-auto border-t pt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {deck.updatedAt ? (
                            <>Updated {formatDate(deck.updatedAt)}</>
                          ) : (
                            <>Created {formatDate(deck.createdAt)}</>
                          )}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={(e) => handleSettingsClick(e, deck)}
                          aria-label="Edit deck"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </main>

      {/* Modals */}
      <CreateDeckModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
      <DeckSettingsModal
        open={settingsModalOpen}
        onOpenChange={setSettingsModalOpen}
        deck={selectedDeck}
        isLocalStorageDeck={selectedDeckIsLocalStorage}
        onDelete={handleDeckDelete}
      />
    </div>
  );
}
