import { PresentationSlide } from "@/components/presentation/PresentationMode";
import { 
  Figma, 
  Layout, 
  Palette, 
  Zap, 
  Code, 
  TestTube,
  FileCode,
  Play,
  Sparkles,
  RefreshCw,
  Bug,
  CheckCircle
} from "lucide-react";

// Example deck slides (fallback content)
const exampleDeckSlides: PresentationSlide[] = [
  {
    id: 1,
    type: "title",
    title: "Example Deck",
    subtitle: "A sample presentation deck to demonstrate the system",
    // backgroundImage will be auto-generated theme-aware by TitleSlide component
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

// AI-First Design Philosophy deck slides
const cursorLLMsDeckSlides: PresentationSlide[] = [
  {
    id: 1,
    type: "title",
    title: "AI Assisted Design Process",
    subtitle: "How to augment your process with LLMs",
    // backgroundImage will be auto-generated theme-aware by TitleSlide component
  },
  {
    id: 2,
    type: "bulletList",
    title: "The Traditional Process is Breaking",
    items: [
      "Figma → Wireframe → Mockup → Prototype → Handoff → Development → Testing",
      "6-12 weeks from concept to working code",
      "We spend weeks perfecting pixels that die in implementation",
      "We debate interactions in static frames",
      "We guess at technical constraints until it's too late",
    ],
  },
  {
    id: 3,
    type: "iconList",
    title: "The Philosophy",
    iconItems: [
      {
        text: "Code first|You need to be working in the material of the end user",
        icon: FileCode,
      },
      {
        text: "Always demo|This means that you're always creating an artifact that generates alignment and can generate a stronger opinion",
        icon: Play,
      },
      {
        text: "Design System|Build in production-quality environments from day one Constraints reveal design opportunities",
        icon: Sparkles,
      },
    ],
  },
  {
    id: 4,
    type: "threeColumn",
    title: "The Mental Model",
    columns: [
      {
        heading: "Vision and Strategy",
        backgroundColor: "red-100",
        bullets: [
          "Define what you're building and why",
          "Create PRD",
          "Refine until clear",
        ],
      },
      {
        heading: "Building",
        backgroundColor: "blue-100",
        bullets: [
          "Set up IDE, GitHub, and project",
          "Set up design system",
          "Start lightweight if needed",
          "Generate components",
          "Implement flows",
        ],
      },
      {
        heading: "Iteration",
        backgroundColor: "purple-100",
        bullets: [
          "Recognize missing components",
          "Fine-tune details",
          "Refine visual language",
          "Cycle between Build and Iterate",
        ],
      },
    ],
  },
  {
    id: 5,
    type: "threeColumn",
    title: "Vision and Strategy",
    columns: [
      {
        heading: "Interview Your AI",
        backgroundColor: "red-100",
        bullets: [
          "Share research and documentation",
          "Have a conversation instead of writing alone",
          "Ask what you're missing",
          "Consider technical constraints",
        ],
      },
      {
        heading: "PRD as Living Document",
        backgroundColor: "red-100",
        bullets: [
          "Capture core concept and flows",
          "Document systems and state",
          "Include technical requirements",
          "Break down into phases",
        ],
      },
    ],
  },
  {
    id: 6,
    type: "threeColumn",
    title: "Building",
    columns: [
      {
        heading: "Set Up Your Project",
        backgroundColor: "blue-100",
        bullets: [
          "Access GitHub repository",
          "Set up IDE",
        ],
      },
      {
        heading: "Set Your Design System",
        backgroundColor: "blue-100",
        bullets: [
          "Set design system in project",
          "Create reusable component widgets",
          "Changes propagate to all instances",
        ],
      },
      {
        heading: "Quick Visual Workflows",
        backgroundColor: "blue-100",
        bullets: [
          "Generate UI quickly",
          "Visualize your PRD",
          "Focus on structure, not visual perfection",
          "Implement flows",
          "Keep it lightweight",
          "Use v0, Figma Make, or Lovable",
        ],
      },
    ],
  },
  {
    id: 7,
    type: "threeColumn",
    title: "Iteration",
    columns: [
      {
        heading: "Explore Variations",
        backgroundColor: "purple-100",
        bullets: [
          "Use v0 and Figma Make for variations",
          "Import into Figma with html.to.design",
          "Different tools reveal different possibilities",
        ],
      },
      {
        heading: "Implement Precisely",
        backgroundColor: "purple-100",
        bullets: [
          "AI sees your Figma designs directly",
          "Link to specific components",
          "Specify pixel-perfect requirements",
          "Define platform specs",
        ],
      },
      {
        heading: "Refine Details",
        backgroundColor: "purple-100",
        bullets: [
          "Refine design in Figma",
          "Start from working code, not blank canvas",
          "Add refined components to design system",
          "Apply changes holistically",
        ],
      },
    ],
  },
  {
    id: 9,
    type: "bulletList",
    title: "Best Practices",
    items: [
      "You'll constantly update your PRD, redesign components at the design system level, and iterate between Figma, code, and PRD",
      "Be prepared for this iterative back and forth as you nail everything down",
      "Critical Testing: Preview builds locally constantly, test component reusability with different content, fix bugs immediately (especially in reusable components)",
      "Your components will be used again - make them solid now",
    ],
  },
  {
    id: 10,
    type: "iconList",
    title: "Compounding Benefits",
    iconItems: [
      {
        text: "Faster Validation|Get feedback from working prototypes in days, not months",
        icon: Zap,
      },
      {
        text: "Design Systems That Evolve|Every project builds your component library",
        icon: Sparkles,
      },
      {
        text: "Designer as Builder|Answer your own 'what if?' questions without waiting for engineering",
        icon: Code,
      },
      {
        text: "Better Handoffs|Give engineering working code with clear specs",
        icon: Figma,
      },
    ],
  },
  {
    id: 11,
    type: "twoColumn",
    title: "Mental Model Recap",
    showBottomBar: false,
    columns: [
      {
        heading: "Old Way",
        bullets: [
          "Design is a blueprint for someone else to build",
          "Feedback comes after implementation",
          "Designers describe, developers interpret",
          "Working software is the end goal",
        ],
      },
      {
        heading: "New Way",
        bullets: [
          "Design is building in a high-fidelity sandbox",
          "Feedback comes from implementation",
          "Designers demonstrate, developers enhance",
          "Working software is the design tool",
        ],
      },
    ],
  },
  {
    id: 12,
    type: "bulletList",
    title: "Getting Started",
    items: [
      "Week 1: Pick an IDE - Choose Visual Studio, Cursor, or anti-gravity, and get connected to either your own GitHub or your company codebase.",
      "Week 2: Choose a Small Feature - Pick something real but contained. A settings screen. A detail view. One complete flow.",
      "Week 3: Run the Full Loop - Vision → Design → Build. Don't skip steps. Learn the rhythm.",
      "Week 4: Reflect and Refine - What worked? What felt clunky? Where did the process break down? Adjust your approach.",
      "Remember: This is a new way of thinking, not just new tools. Give yourself permission to experiment and iterate on the process itself.",
    ],
  },
  {
    id: 13,
    type: "bulletList",
    title: "Key Principles Summary",
    items: [
      "Working beats explaining - Always prefer demos to documentation",
      "Iterate in reality - Design constraints reveal opportunities",
      "AI as collaborator - Interview, don't command",
      "Components as artifacts - Every project builds your library",
      "PRDs as conversations - Living documents, not requirements lockdown",
      "Fidelity from day one - Polish reveals problems early",
      "Loops, not stages - Any loop can restart independently",
    ],
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
  
  // Title slides will auto-generate theme-aware backgrounds in the TitleSlide component
  // No need to pre-generate here since theme detection happens client-side
  return slides;
}

