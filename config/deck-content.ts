import { PresentationSlide } from "@/components/presentation/PresentationMode";
import { getDeckBackgroundImage } from "@/lib/gradient-generator";

// Example deck slides (fallback content)
const exampleDeckSlides: PresentationSlide[] = [
  {
    id: 1,
    type: "title",
    title: "Example Deck",
    subtitle: "A sample presentation deck to demonstrate the system",
    backgroundImage: getDeckBackgroundImage("example-deck"),
  },
  {
    id: 2,
    type: "headline",
    headline: "Welcome to the Presentation",
  },
  {
    id: 3,
    type: "section",
    title: "Introduction",
    description: "Let's get started with our presentation",
  },
  {
    id: 4,
    type: "bulletList",
    title: "Key Points",
    items: [
      "This is the first key point",
      "Here's another important point",
      "And a third point to consider",
    ],
  },
  {
    id: 5,
    type: "quote",
    quote: "The only way to do great work is to love what you do.",
    attribution: "Steve Jobs",
  },
];

// Cursor + LLMs Product Designer deck slides
const cursorLLMsDeckSlides: PresentationSlide[] = [
  {
    id: 1,
    type: "title",
    title: "Redefining Product Design with Cursor + LLMs",
    subtitle: "How AI-first tools are transforming the product designer role",
    backgroundImage: getDeckBackgroundImage("cursor-llms-product-designer"),
  },
  {
    id: 2,
    type: "headline",
    headline: "Design-system-first has become essential, not optional",
  },
  {
    id: 3,
    type: "section",
    title: "The Philosophy",
    description: "The quality of your input—whether design tokens in Figma or a code-based design system—directly determines the quality and accuracy of AI-generated outputs.",
  },
  {
    id: 4,
    type: "bulletList",
    title: "The Challenge",
    items: [
      "No design system exists",
      "Design system only exists in code",
      "Robust systems exist in both Figma and code, but they're disconnected",
    ],
  },
  {
    id: 5,
    type: "section",
    title: "The Approach",
    description: "The Cursor → Figma → Cursor loop creates a bidirectional workflow that keeps design and implementation synchronized",
  },
  {
    id: 6,
    type: "bulletList",
    title: "The Workflow",
    items: [
      "Use Cursor agents to generate HTML documentation from design tokens",
      "Pull components into Figma using HTML-to-Figma plugin",
      "Refine visual expression and tokenize elements in Figma",
      "Use Figma MCP to create links back to Cursor",
      "Replace initial documentation with pixel-perfect implementation",
    ],
  },
  {
    id: 7,
    type: "section",
    title: "The Payoff",
    description: "A well-documented design system with accurate token naming allows rapid assembly of components when working with AI agents, ensuring consistency and quality while dramatically accelerating development speed.",
  },
];

// Map deck slugs to their slide content
const deckContentMap: Record<string, PresentationSlide[]> = {
  "example-deck": exampleDeckSlides,
  "cursor-llms-product-designer": cursorLLMsDeckSlides,
};

/**
 * Get slide content for a specific deck by slug
 * Automatically adds background images to title slides if they don't have one
 * @param slug - The deck slug identifier
 * @returns Array of PresentationSlide objects, or empty array if deck not found
 */
export function getDeckContent(slug: string): PresentationSlide[] {
  const slides = deckContentMap[slug] || [];
  
  // Ensure title slides have background images (auto-generate if missing)
  return slides.map((slide) => {
    if (slide.type === "title" && !slide.backgroundImage) {
      return {
        ...slide,
        backgroundImage: getDeckBackgroundImage(slug),
      };
    }
    return slide;
  });
}

