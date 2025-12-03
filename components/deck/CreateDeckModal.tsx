"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { parseMarkdownToSlides } from "@/lib/markdown-parser";
import {
  saveDeckToLocalStorage,
  generateSlug,
  ensureUniqueSlug,
  getDecksFromLocalStorage,
} from "@/lib/deck-storage";
import { Deck } from "@/config/decks";
import { decks } from "@/config/decks";
import { PresentationSlide } from "@/components/presentation/PresentationMode";
import { Check, GripVertical, RefreshCw, Upload, Image as ImageIcon, X } from "lucide-react";
import { generateGradientSwirl } from "@/lib/gradient-generator";

type SlideTemplateType = PresentationSlide["type"];

interface TemplateOption {
  type: SlideTemplateType;
  label: string;
  description: string;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  { type: "title", label: "Title", description: "Title slide with subtitle" },
  { type: "headline", label: "Headline", description: "Large headline text" },
  { type: "section", label: "Section", description: "Section divider with title" },
  { type: "bulletList", label: "Bullet List", description: "List of bullet points" },
  { type: "quote", label: "Quote", description: "Quote with attribution" },
  { type: "image", label: "Image", description: "Image with caption" },
  { type: "blank", label: "Blank", description: "Empty slide" },
  { type: "threeColumn", label: "Three Column", description: "Three column layout" },
  { type: "twoColumn", label: "Two Column", description: "Two column layout" },
  { type: "comparison", label: "Comparison", description: "Side-by-side comparison" },
  { type: "timeline", label: "Timeline", description: "Timeline visualization" },
  { type: "iconList", label: "Icon List", description: "List with icons" },
];

const DEFAULT_TEMPLATES: SlideTemplateType[] = ["title", "headline", "bulletList"];

interface CreateDeckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDeckModal({ open, onOpenChange }: CreateDeckModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [selectedTemplates, setSelectedTemplates] = useState<SlideTemplateType[]>(DEFAULT_TEMPLATES);
  const [isCreating, setIsCreating] = useState(false);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | undefined>(undefined);
  const [gradientSeed, setGradientSeed] = useState<string>("");

  // Reset form when modal opens
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setTitle("");
      setDescription("");
      setMarkdown("");
      setSelectedTemplates(DEFAULT_TEMPLATES);
      setThumbnailImageUrl(undefined);
      setGradientSeed("");
    }
    onOpenChange(newOpen);
  };

  // Generate new gradient
  const handleGenerateGradient = () => {
    const newSeed = `gradient-${Date.now()}-${Math.random()}`;
    setGradientSeed(newSeed);
    const gradientUrl = generateGradientSwirl(newSeed, 1920, 1080);
    setThumbnailImageUrl(gradientUrl);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailImageUrl(reader.result as string);
        setGradientSeed(""); // Clear gradient seed when using custom image
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle template selection
  const toggleTemplate = (templateType: SlideTemplateType) => {
    setSelectedTemplates((prev) => {
      if (prev.includes(templateType)) {
        // Remove if already selected (but keep at least one)
        if (prev.length > 1) {
          return prev.filter((t) => t !== templateType);
        }
        return prev;
      } else {
        // Add if not selected
        return [...prev, templateType];
      }
    });
  };

  // Preview parsed slides
  const previewSlides = useMemo(() => {
    if (!markdown.trim()) return [];
    return parseMarkdownToSlides(markdown, selectedTemplates);
  }, [markdown, selectedTemplates]);

  // Handle deck creation
  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Please enter a title for your deck");
      return;
    }

    if (selectedTemplates.length === 0) {
      alert("Please select at least one template");
      return;
    }

    setIsCreating(true);

    try {
      // Generate unique slug
      const baseSlug = generateSlug(title);
      const existingDecks = [...decks, ...getDecksFromLocalStorage()];
      const slug = ensureUniqueSlug(baseSlug, existingDecks);

      // Parse markdown to slides
      let slides = markdown.trim()
        ? parseMarkdownToSlides(markdown, selectedTemplates)
        : [
            // Default slides if no markdown
            {
              id: 1,
              type: "title" as SlideTemplateType,
              title: title,
              subtitle: description || undefined,
            },
          ];

      // Apply thumbnail image to first slide's background if it exists
      // Ensure first slide is a title slide and has the background image
      if (slides.length > 0) {
        const firstSlide = slides[0];
        if (thumbnailImageUrl) {
          slides = [
            {
              ...firstSlide,
              type: "title" as SlideTemplateType, // Ensure it's a title slide
              title: firstSlide.title || firstSlide.headline || title,
              subtitle: firstSlide.subtitle || firstSlide.description || description || undefined,
              backgroundImage: thumbnailImageUrl,
            },
            ...slides.slice(1),
          ];
        }
      } else if (thumbnailImageUrl) {
        // If no slides exist, create a default title slide with the background image
        slides = [
          {
            id: 1,
            type: "title" as SlideTemplateType,
            title: title,
            subtitle: description || undefined,
            backgroundImage: thumbnailImageUrl,
          },
        ];
      }

      // Create deck object
      const deck: Deck = {
        slug,
        title: title.trim(),
        description: description.trim() || "A new presentation deck",
        createdAt: new Date(),
        imageUrl: thumbnailImageUrl,
      };

      // Save to localStorage
      saveDeckToLocalStorage(deck, slides);

      // Close modal and navigate to deck
      handleOpenChange(false);
      router.push(`/decks/${slug}`);
    } catch (error) {
      console.error("Error creating deck:", error);
      alert("Failed to create deck. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Presentation</DialogTitle>
          <DialogDescription>
            Set up your presentation template and import content from markdown
          </DialogDescription>
          <DialogClose />
        </DialogHeader>

        <DialogBody className="space-y-6">
          {/* Thumbnail Image/Gradient Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Thumbnail Image
            </label>
            <div className="flex gap-4 items-start">
              {/* Preview - matches deck thumbnail card ratio */}
              <div className="relative w-[320px] h-[192px] rounded-xl overflow-hidden border border-border bg-muted flex-shrink-0">
                {thumbnailImageUrl ? (
                  <>
                    <img
                      src={thumbnailImageUrl}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                    {/* X button overlay */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => {
                        setThumbnailImageUrl(undefined);
                        setGradientSeed("");
                      }}
                      className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm border border-border hover:bg-background"
                      aria-label="Remove thumbnail"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    No thumbnail selected
                  </div>
                )}
              </div>
              {/* Controls - stacked vertically */}
              <div className="flex flex-col gap-2 flex-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateGradient}
                  className="flex items-center gap-2 w-fit"
                >
                  <RefreshCw className="h-4 w-4" />
                  Generate Gradient
                </Button>
                <label className="cursor-pointer w-fit">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 w-fit"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </Button>
                </label>
              </div>
            </div>
          </div>

          {/* Deck Metadata */}
          <div className="space-y-4">
            <div>
              <label htmlFor="deck-title" className="block text-sm font-medium mb-2">
                Title *
              </label>
              <Input
                id="deck-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Presentation"
              />
            </div>
            <div>
              <label htmlFor="deck-description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <Input
                id="deck-description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of your presentation"
              />
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Slide Templates (select in order)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-border rounded-md">
              {TEMPLATE_OPTIONS.map((option) => {
                const isSelected = selectedTemplates.includes(option.type);
                const index = selectedTemplates.indexOf(option.type);

                return (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() => toggleTemplate(option.type)}
                    className={`
                      relative p-3 text-left border rounded-md transition-all
                      ${isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                      }
                    `}
                  >
                    <div className="flex items-start gap-2">
                      {isSelected && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <GripVertical className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                          <span className={`text-sm font-medium ${isSelected ? "text-primary" : ""}`}>
                            {option.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedTemplates.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Selected templates will be applied in order: {selectedTemplates.join(" → ")}
              </p>
            )}
          </div>

          {/* Markdown Import */}
          <div>
            <label htmlFor="markdown-input" className="block text-sm font-medium mb-2">
              Markdown Content (optional)
            </label>
            <Textarea
              id="markdown-input"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder={`Paste your markdown content here...

Example:
# My Presentation Title
A subtitle or description

---

## Introduction
Welcome to my presentation

- First point
- Second point
- Third point

---

> This is a quote
— Attribution`}
              className="h-48 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Use --- to separate slides, or let the parser auto-detect sections
            </p>
          </div>

          {/* Preview */}
          {previewSlides.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Preview ({previewSlides.length} slides)
              </label>
              <div className="max-h-48 overflow-y-auto space-y-2 p-2 border border-border rounded-md bg-muted/30">
                {previewSlides.map((slide, index) => (
                  <Card key={index} className="p-3">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          {index + 1}.
                        </span>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-primary">
                            {slide.type}
                          </span>
                          {slide.title && (
                            <p className="text-sm mt-1">{slide.title}</p>
                          )}
                          {slide.headline && (
                            <p className="text-sm mt-1">{slide.headline}</p>
                          )}
                          {slide.items && slide.items.length > 0 && (
                            <ul className="text-xs mt-1 list-disc list-inside">
                              {slide.items.slice(0, 3).map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                              {slide.items.length > 3 && (
                                <li className="text-muted-foreground">
                                  +{slide.items.length - 3} more
                                </li>
                              )}
                            </ul>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogBody>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isCreating || !title.trim()}>
            {isCreating ? "Creating..." : "Create Deck"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

