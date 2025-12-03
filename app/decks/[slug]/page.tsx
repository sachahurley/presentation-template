"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { getDeckBySlug, decks } from "@/config/decks";
import { getDeckFromLocalStorage } from "@/lib/deck-storage";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DeckLayout } from "@/components/templates/DeckLayout";
import { ChevronLeft } from "lucide-react";
import { Deck } from "@/config/decks";

export default function DeckPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [deck, setDeck] = useState<Deck | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // Try to get deck from config first
    let foundDeck = getDeckBySlug(slug);

    // If not found in config, try localStorage
    if (!foundDeck) {
      foundDeck = getDeckFromLocalStorage(slug);
    }

    setDeck(foundDeck || null);
    setIsLoading(false);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

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
              <span className="text-muted-foreground">Presento</span> / {deck.title}
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

