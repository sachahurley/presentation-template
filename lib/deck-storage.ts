import { Deck } from "@/config/decks";
import { PresentationSlide } from "@/components/presentation/PresentationMode";

// Storage keys for localStorage
const DECKS_STORAGE_KEY = "presentation-decks";
const DECK_CONTENT_STORAGE_KEY_PREFIX = "presentation-deck-content-";

/**
 * Generate a URL-safe slug from a title
 * Converts to lowercase, replaces spaces with hyphens, removes special chars
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Ensure slug is unique by appending a number if needed
 */
export function ensureUniqueSlug(slug: string, existingDecks: Deck[]): string {
  const existingSlugs = existingDecks.map((d) => d.slug);
  let uniqueSlug = slug;
  let counter = 1;

  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

/**
 * Save a deck to localStorage
 */
export function saveDeckToLocalStorage(deck: Deck, slides: PresentationSlide[]): void {
  if (typeof window === "undefined") return;

  try {
    // Save deck metadata
    const decks = getDecksFromLocalStorage();
    const existingIndex = decks.findIndex((d) => d.slug === deck.slug);

    if (existingIndex >= 0) {
      // Update existing deck
      decks[existingIndex] = deck;
    } else {
      // Add new deck
      decks.push(deck);
    }

    localStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));

    // Save deck content (slides)
    const contentKey = `${DECK_CONTENT_STORAGE_KEY_PREFIX}${deck.slug}`;
    localStorage.setItem(contentKey, JSON.stringify(slides));
  } catch (error) {
    console.error("Error saving deck to localStorage:", error);
    throw new Error("Failed to save deck. localStorage may be full.");
  }
}

/**
 * Get all decks from localStorage
 */
export function getDecksFromLocalStorage(): Deck[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(DECKS_STORAGE_KEY);
    if (!stored) return [];

    const decks = JSON.parse(stored) as Deck[];
    // Convert date strings back to Date objects
    return decks.map((deck) => ({
      ...deck,
      createdAt: new Date(deck.createdAt),
      updatedAt: deck.updatedAt ? new Date(deck.updatedAt) : undefined,
    }));
  } catch (error) {
    console.error("Error reading decks from localStorage:", error);
    return [];
  }
}

/**
 * Get deck content (slides) from localStorage for a specific deck
 */
export function getDeckContentFromLocalStorage(slug: string): PresentationSlide[] | null {
  if (typeof window === "undefined") return null;

  try {
    const contentKey = `${DECK_CONTENT_STORAGE_KEY_PREFIX}${slug}`;
    const stored = localStorage.getItem(contentKey);
    if (!stored) return null;

    return JSON.parse(stored) as PresentationSlide[];
  } catch (error) {
    console.error("Error reading deck content from localStorage:", error);
    return null;
  }
}

/**
 * Get a specific deck by slug from localStorage
 */
export function getDeckFromLocalStorage(slug: string): Deck | null {
  const decks = getDecksFromLocalStorage();
  return decks.find((d) => d.slug === slug) || null;
}

/**
 * Delete a deck from localStorage
 */
export function deleteDeckFromLocalStorage(slug: string): void {
  if (typeof window === "undefined") return;

  try {
    // Remove deck from list
    const decks = getDecksFromLocalStorage();
    const filtered = decks.filter((d) => d.slug !== slug);
    localStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(filtered));

    // Remove deck content
    const contentKey = `${DECK_CONTENT_STORAGE_KEY_PREFIX}${slug}`;
    localStorage.removeItem(contentKey);
  } catch (error) {
    console.error("Error deleting deck from localStorage:", error);
    throw new Error("Failed to delete deck.");
  }
}

/**
 * Generate TypeScript code for adding a deck to config/decks.ts
 */
export function exportDeckToConfigCode(deck: Deck): string {
  const dateStr = deck.createdAt.toISOString().split("T")[0];
  const updatedStr = deck.updatedAt
    ? `,\n    updatedAt: new Date("${deck.updatedAt.toISOString().split("T")[0]}")`
    : "";

  return `  {
    slug: "${deck.slug}",
    title: "${deck.title.replace(/"/g, '\\"')}",
    description: "${deck.description.replace(/"/g, '\\"')}",
    createdAt: new Date("${dateStr}")${updatedStr}
  },`;
}

/**
 * Generate TypeScript code for adding deck content to config/deck-content.ts
 */
export function exportDeckContentToConfigCode(
  slug: string,
  slides: PresentationSlide[]
): string {
  // Convert slides to TypeScript object format
  const slidesCode = slides
    .map((slide, index) => {
      const slideId = slide.id || index + 1;
      let slideCode = `  {\n    id: ${slideId},\n    type: "${slide.type}"`;

      // Add slide-specific fields
      if (slide.title) {
        slideCode += `,\n    title: ${JSON.stringify(slide.title)}`;
      }
      if (slide.subtitle) {
        slideCode += `,\n    subtitle: ${JSON.stringify(slide.subtitle)}`;
      }
      if (slide.headline) {
        slideCode += `,\n    headline: ${JSON.stringify(slide.headline)}`;
      }
      if (slide.description) {
        slideCode += `,\n    description: ${JSON.stringify(slide.description)}`;
      }
      if (slide.items && slide.items.length > 0) {
        slideCode += `,\n    items: [\n${slide.items.map((item) => `      ${JSON.stringify(item)}`).join(",\n")}\n    ]`;
      }
      if (slide.quote) {
        slideCode += `,\n    quote: ${JSON.stringify(slide.quote)}`;
      }
      if (slide.attribution) {
        slideCode += `,\n    attribution: ${JSON.stringify(slide.attribution)}`;
      }
      if (slide.src) {
        slideCode += `,\n    src: ${JSON.stringify(slide.src)}`;
      }
      if (slide.alt) {
        slideCode += `,\n    alt: ${JSON.stringify(slide.alt)}`;
      }
      if (slide.caption) {
        slideCode += `,\n    caption: ${JSON.stringify(slide.caption)}`;
      }
      if (slide.columns && slide.columns.length > 0) {
        slideCode += `,\n    columns: [\n${slide.columns
          .map((col) => {
            let colCode = `      {\n        heading: ${JSON.stringify(col.heading)}`;
            if (col.body) {
              colCode += `,\n        body: ${JSON.stringify(col.body)}`;
            }
            if (col.bullets && col.bullets.length > 0) {
              colCode += `,\n        bullets: [\n${col.bullets
                .map((b) => `          ${JSON.stringify(b)}`)
                .join(",\n")}\n        ]`;
            }
            if (col.backgroundColor) {
              colCode += `,\n        backgroundColor: ${JSON.stringify(col.backgroundColor)}`;
            }
            colCode += "\n      }";
            return colCode;
          })
          .join(",\n")}\n    ]`;
      }
      if (slide.iconItems && slide.iconItems.length > 0) {
        // Note: iconItems with icons can't be fully exported as TypeScript
        // This is a simplified version
        slideCode += `,\n    iconItems: [\n${slide.iconItems
          .map((item) => `      { text: ${JSON.stringify(item.text)} }`)
          .join(",\n")}\n    ]`;
      }
      if (slide.timelineItems && slide.timelineItems.length > 0) {
        slideCode += `,\n    timelineItems: [\n${slide.timelineItems
          .map((item) => {
            let itemCode = `      { label: ${JSON.stringify(item.label)}`;
            if (item.description) {
              itemCode += `, description: ${JSON.stringify(item.description)}`;
            }
            itemCode += " }";
            return itemCode;
          })
          .join(",\n")}\n    ]`;
      }
      if (slide.showBottomBar !== undefined) {
        slideCode += `,\n    showBottomBar: ${slide.showBottomBar}`;
      }

      slideCode += "\n  }";
      return slideCode;
    })
    .join(",\n");

  return `const ${slug.replace(/-/g, "")}DeckSlides: PresentationSlide[] = [\n${slidesCode}\n];`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined" || !navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

