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
  Sparkles
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
        text: "Code first. You need to be working in the material of the end user.",
        icon: FileCode,
      },
      {
        text: "Always demo. This means that you're always creating an artifact that generates alignment and can generate a stronger opinion.",
        icon: Play,
      },
      {
        text: "High fidelity. Build in production-quality environments from day one. Constraints reveal design opportunities.",
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
        heading: "Vision Loop (Strategy)",
        bullets: [
          "Define what you're building and why",
          "Create your PRD as a conversation with AI",
          "Refine until the vision is crystal clear",
        ],
      },
      {
        heading: "Build Loop (Reality)",
        bullets: [
          "Establish patterns, components, color tokens",
          "Design system first approach",
          "If you don't have a design system, do it in a lightweight way until it's ready",
          "Generate working components with pixel-perfect specs",
          "Test, fix, and verify against PRD",
        ],
      },
      {
        heading: "Iterate Loop (Fidelity)",
        bullets: [
          "Fine-tuning and doing the final 20%",
          "Iterate on visual language until it's exactly right",
          "Go back and forth between Build and Iterate loops",
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
        bullets: [
          "Share all research and current documentation",
          "Instead of writing requirements alone, have a conversation",
          "Ask: 'Here's what I'm thinking... what am I missing?'",
          "'What technical constraints should I consider?'",
          "'How should this work across different states?'",
        ],
      },
      {
        heading: "PRD as Living Document",
        bullets: [
          "Captures core concept and user flows",
          "Documents persistent systems (data, state, currency)",
          "Includes technical requirements and platform decisions",
          "Provides phase breakdown for iterative delivery",
        ],
      },
      {
        heading: "Quick Visual Workflows",
        bullets: [
          "Quick generation of UI - 0 to 1 components",
          "Get a sense of what your PRD is creating",
          "Do this in a lightweight way",
          "Use Figma Make, v0, or Lovable",
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
        bullets: [
          "Get access to your GitHub repository",
          "Get access to the code files and codebase",
          "Set up your IDE",
        ],
      },
      {
        heading: "Set Your Design System",
        bullets: [
          "Set your design system within the project file",
          "Set up components as widgets that can be reused throughout the project",
          "If you change the widget, you're changing all components using that widget",
        ],
      },
      {
        heading: "Use Your PRD to Produce Flows",
        bullets: [
          "Have Cursor or your IDE agent produce entire flows based on your PRD",
          "Create a wireframe or quick version of the entire flow",
          "Example: For a marketplace, set up the complete flow quickly",
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
        heading: "Create Examples",
        bullets: [
          "Use v0 AND Figma Make to generate variations",
          "Import both into Figma using html.to.design plugin",
          "Why Both Tools? Different AI models interpret prompts differently",
          "Creating in both gives you more options and reveals different possibilities",
        ],
      },
      {
        heading: "Generate Cursor Prompts with Figma MCP",
        bullets: [
          "Your AI can now see your Figma designs directly",
          "Include links to specific Figma components",
          "Specify explicit pixel-perfect replication requirements",
          "Define target platform specifications (Flutter, Swift, web)",
        ],
      },
      {
        heading: "Refine to Desired Fidelity",
        bullets: [
          "Now you're in familiar territory—push the design to perfection in Figma",
          "But you started from working code, not a blank canvas",
        ],
      },
    ],
  },
  {
    id: 9,
    type: "bulletList",
    title: "Quality & Iteration Strategy",
    items: [
      "You'll constantly update your PRD, redesign components at the design system level, and iterate between Figma, code, and PRD",
      "Be prepared for this iterative back and forth as you nail everything down",
      "Critical Testing: Preview builds locally constantly, test component reusability with different content, fix bugs immediately (especially in reusable components)",
      "Your components will be used again—make them solid now",
    ],
  },
  {
    id: 10,
    type: "bulletList",
    title: "Compounding Benefits",
    items: [
      "Faster Validation: Get real feedback from working prototypes in days, not months. Stakeholders can actually use what you're proposing.",
      "Design Systems That Evolve: Every project builds your component library. Document and consolidate components post-project for future reuse.",
      "Designer as Builder: You're no longer dependent on engineering timelines for exploration. You can answer your own 'what if?' questions.",
      "Better Handoffs: When you do hand off to engineering, you're giving them working code with clear specs, not just pretty pictures.",
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

