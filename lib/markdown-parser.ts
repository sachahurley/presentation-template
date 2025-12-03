import { PresentationSlide } from "@/components/presentation/PresentationMode";

export type SlideTemplateType = PresentationSlide["type"];

/**
 * Parse markdown text into slide sections
 * Supports both structured format (--- separators) and freeform format
 */
export function parseMarkdownToSections(markdown: string): string[] {
  if (!markdown.trim()) return [];

  // First, try structured format with --- separators
  const structuredSections = markdown.split(/^---+\s*$/m).filter((s) => s.trim());

  if (structuredSections.length > 1) {
    return structuredSections.map((s) => s.trim());
  }

  // Try # Slide headers as separators
  const slideHeaderSections = markdown.split(/^#\s+Slide\s*\d*\s*$/im).filter((s) => s.trim());

  if (slideHeaderSections.length > 1) {
    return slideHeaderSections.map((s) => s.trim());
  }

  // Freeform: split by major headers (## or #)
  // This creates sections based on top-level headers
  const freeformSections = markdown
    .split(/^(?=#{1,2}\s+)/m)
    .filter((s) => s.trim())
    .map((s) => s.trim());

  if (freeformSections.length > 1) {
    return freeformSections;
  }

  // If no clear separators, treat entire content as one section
  return [markdown.trim()];
}

/**
 * Extract title from markdown section (first # header or first line)
 */
function extractTitle(section: string): { title: string; remaining: string } {
  // Look for # Title pattern
  const titleMatch = section.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    const remaining = section.replace(/^#\s+.+$/m, "").trim();
    return { title, remaining };
  }

  // Look for ## Title pattern
  const sectionMatch = section.match(/^##\s+(.+)$/m);
  if (sectionMatch) {
    const title = sectionMatch[1].trim();
    const remaining = section.replace(/^##\s+.+$/m, "").trim();
    return { title, remaining };
  }

  // Use first line as title if it's short and not a list
  const lines = section.split("\n");
  const firstLine = lines[0]?.trim() || "";
  if (firstLine && !firstLine.startsWith("-") && !firstLine.startsWith("*") && !firstLine.startsWith(">") && firstLine.length < 100) {
    return { title: firstLine, remaining: lines.slice(1).join("\n").trim() };
  }

  return { title: "", remaining: section };
}

/**
 * Extract bullet list items from markdown
 */
function extractBulletList(content: string): string[] {
  const items: string[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    // Match bullet points (-, *, +) and numbered lists
    const bulletMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    const numberedMatch = trimmed.match(/^\d+\.\s+(.+)$/);

    if (bulletMatch) {
      items.push(bulletMatch[1].trim());
    } else if (numberedMatch) {
      items.push(numberedMatch[1].trim());
    }
  }

  return items;
}

/**
 * Extract quote from markdown
 */
function extractQuote(content: string): { quote: string; attribution?: string } | null {
  const lines = content.split("\n");
  const quoteLines: string[] = [];
  let attribution: string | undefined;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith(">")) {
      const quoteText = trimmed.slice(1).trim();
      if (quoteText) {
        quoteLines.push(quoteText);
      }
    } else if (trimmed && !quoteLines.length) {
      // Not a quote line and no quotes found yet, skip
      break;
    } else if (trimmed && quoteLines.length) {
      // Attribution line after quote
      attribution = trimmed;
      break;
    }
  }

  if (quoteLines.length > 0) {
    return {
      quote: quoteLines.join(" "),
      attribution,
    };
  }

  return null;
}

/**
 * Extract image from markdown
 */
function extractImage(content: string): { src: string; alt: string; caption?: string } | null {
  const imageMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  if (imageMatch) {
    const alt = imageMatch[1] || "";
    const src = imageMatch[2] || "";

    // Try to find caption on next line
    const lines = content.split("\n");
    const imageLineIndex = lines.findIndex((line) => line.includes(`![${alt}](${src})`));
    if (imageLineIndex >= 0 && imageLineIndex < lines.length - 1) {
      const nextLine = lines[imageLineIndex + 1]?.trim();
      if (nextLine && !nextLine.startsWith("!") && !nextLine.startsWith("[")) {
        return { src, alt, caption: nextLine };
      }
    }

    return { src, alt };
  }

  return null;
}

/**
 * Detect content type from markdown section
 */
function detectContentType(content: string): SlideTemplateType {
  const trimmed = content.toLowerCase().trim();

  // Check for quote
  if (trimmed.startsWith(">") || trimmed.includes("\n>")) {
    return "quote";
  }

  // Check for image
  if (trimmed.includes("![") && trimmed.includes("](")) {
    return "image";
  }

  // Check for bullet list
  if (trimmed.match(/^[-*+]\s+/m) || trimmed.match(/^\d+\.\s+/m)) {
    return "bulletList";
  }

  // Check for headline (short text, no structure)
  if (trimmed.length < 200 && !trimmed.includes("\n\n")) {
    return "headline";
  }

  // Default to section
  return "section";
}

/**
 * Parse a markdown section into a PresentationSlide based on template type
 */
function parseSectionToSlide(
  section: string,
  templateType: SlideTemplateType,
  slideId: number
): PresentationSlide {
  const { title, remaining } = extractTitle(section);
  const content = remaining || section;

  const baseSlide: PresentationSlide = {
    id: slideId,
    type: templateType,
  };

  switch (templateType) {
    case "title":
      return {
        ...baseSlide,
        title: title || "Untitled",
        subtitle: content.split("\n")[0]?.trim() || undefined,
      };

    case "headline":
      return {
        ...baseSlide,
        headline: title || content.split("\n")[0]?.trim() || "Headline",
      };

    case "section":
      return {
        ...baseSlide,
        title: title || "Section",
        description: content.split("\n\n")[0]?.trim() || undefined,
      };

    case "bulletList": {
      const items = extractBulletList(content);
      return {
        ...baseSlide,
        title: title || "Bullet Points",
        items: items.length > 0 ? items : [content.trim() || "Item"],
      };
    }

    case "quote": {
      const quoteData = extractQuote(section);
      if (quoteData) {
        return {
          ...baseSlide,
          quote: quoteData.quote,
          attribution: quoteData.attribution,
        };
      }
      // Fallback if quote extraction fails
      return {
        ...baseSlide,
        quote: title || content.split("\n")[0]?.trim() || "Quote",
        attribution: content.split("\n")[1]?.trim() || undefined,
      };
    }

    case "image": {
      const imageData = extractImage(section);
      if (imageData) {
        return {
          ...baseSlide,
          title: title || undefined,
          src: imageData.src,
          alt: imageData.alt,
          caption: imageData.caption,
        };
      }
      // Fallback
      return {
        ...baseSlide,
        title: title || "Image",
        src: "",
        alt: "",
      };
    }

    case "blank":
      return {
        ...baseSlide,
        title: title || undefined,
      };

    default:
      // For other types, use basic structure
      return {
        ...baseSlide,
        title: title || "Slide",
        description: content.split("\n\n")[0]?.trim() || undefined,
      };
  }
}

/**
 * Parse markdown into PresentationSlide array using selected templates
 * @param markdown - The markdown text to parse
 * @param templates - Array of template types to use, in order
 * @returns Array of PresentationSlide objects
 */
export function parseMarkdownToSlides(
  markdown: string,
  templates: SlideTemplateType[]
): PresentationSlide[] {
  if (!markdown.trim() || templates.length === 0) {
    return [];
  }

  const sections = parseMarkdownToSections(markdown);
  const slides: PresentationSlide[] = [];

  // If we have more sections than templates, cycle through templates
  // If we have fewer sections, use templates in order
  sections.forEach((section, index) => {
    const templateIndex = index % templates.length;
    const templateType = templates[templateIndex];
    const slideId = index + 1;

    const slide = parseSectionToSlide(section, templateType, slideId);
    slides.push(slide);
  });

  // Ensure we always have at least a title slide
  if (slides.length === 0 && templates.length > 0) {
    slides.push({
      id: 1,
      type: templates[0],
      title: "New Presentation",
    });
  }

  return slides;
}

