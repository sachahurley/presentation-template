"use client";

import { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/toast";
import { Deck } from "@/config/decks";
import { PresentationSlide } from "@/components/presentation/PresentationMode";
import {
  saveDeckToLocalStorage,
  deleteDeckFromLocalStorage,
  exportDeckToConfigCode,
  exportDeckContentToConfigCode,
  copyToClipboard,
  getDeckContentFromLocalStorage,
} from "@/lib/deck-storage";
import { Trash2, Copy, Check, RefreshCw, Upload, X } from "lucide-react";
import { generateGradientSwirl } from "@/lib/gradient-generator";

interface DeckSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deck: Deck | null;
  isLocalStorageDeck: boolean;
  onDelete?: () => void;
}

export function DeckSettingsModal({
  open,
  onOpenChange,
  deck,
  isLocalStorageDeck,
  onDelete,
}: DeckSettingsModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slides, setSlides] = useState<PresentationSlide[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copiedSection, setCopiedSection] = useState<"deck" | "content" | null>(null);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | undefined>(undefined);
  const [gradientSeed, setGradientSeed] = useState<string>("");
  const { addToast } = useToast();

  // Load deck data when modal opens
  useEffect(() => {
    if (open && deck) {
      setTitle(deck.title);
      setDescription(deck.description);
      setThumbnailImageUrl(deck.imageUrl);
      
      // Load slides if localStorage deck
      if (isLocalStorageDeck) {
        const deckSlides = getDeckContentFromLocalStorage(deck.slug);
        setSlides(deckSlides || []);
        
        // If deck has imageUrl but first slide doesn't have backgroundImage, sync them in state
        if (deck.imageUrl && deckSlides && deckSlides.length > 0) {
          const firstSlide = deckSlides[0];
          if (!firstSlide.backgroundImage || firstSlide.backgroundImage !== deck.imageUrl) {
            // Update the first slide's backgroundImage to match the deck's imageUrl
            const updatedSlides = [
              {
                ...firstSlide,
                backgroundImage: deck.imageUrl,
              },
              ...deckSlides.slice(1),
            ];
            setSlides(updatedSlides);
          }
        }
      }
    }
  }, [open, deck, isLocalStorageDeck]);

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

  const handleSave = async () => {
    if (!deck || !title.trim()) {
      alert("Please enter a title");
      return;
    }

    setIsSaving(true);

    try {
      // Update first slide's background image if thumbnail image exists
      let updatedSlides = [...slides];
      
      // Always ensure we have at least one slide
      if (updatedSlides.length === 0 && thumbnailImageUrl) {
        // Create a default title slide with the background image
        updatedSlides = [
          {
            id: 1,
            type: "title",
            title: title.trim(),
            subtitle: description.trim() || undefined,
            backgroundImage: thumbnailImageUrl,
          },
        ];
      } else if (updatedSlides.length > 0) {
        const firstSlide = updatedSlides[0];
        
        if (thumbnailImageUrl) {
          // Apply background image to first slide
          // Ensure first slide is a title slide (backgroundImage only works on title slides)
          updatedSlides = [
            {
              ...firstSlide,
              type: "title", // Ensure it's a title slide
              title: firstSlide.title || firstSlide.headline || title.trim(),
              subtitle: firstSlide.subtitle || firstSlide.description || description.trim() || undefined,
              backgroundImage: thumbnailImageUrl, // Always set this when thumbnailImageUrl exists
            },
            ...updatedSlides.slice(1),
          ];
        } else {
          // If thumbnail is removed, also remove backgroundImage from first slide
          if (firstSlide.backgroundImage) {
            updatedSlides = [
              {
                ...firstSlide,
                backgroundImage: undefined,
              },
              ...updatedSlides.slice(1),
            ];
          }
        }
      }

      const updatedDeck: Deck = {
        ...deck,
        title: title.trim(),
        description: description.trim() || deck.description,
        updatedAt: new Date(),
        imageUrl: thumbnailImageUrl,
      };

      // Save updated deck and slides
      if (isLocalStorageDeck) {
        // Ensure slides are saved with the backgroundImage
        saveDeckToLocalStorage(updatedDeck, updatedSlides);
      }

      // Close modal and reload page to reflect changes
      onOpenChange(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving deck:", error);
      alert("Failed to save deck. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deck || !isLocalStorageDeck) return;

    setIsDeleting(true);

    try {
      const deckTitle = deck.title; // Store title before deletion
      deleteDeckFromLocalStorage(deck.slug);
      onDelete?.();
      
      // Show toast notification with delete icon
      addToast(`${deckTitle} has been deleted`, 4000, "delete");
      
      onOpenChange(false);
      // Navigate to homepage after toast completes its full animation cycle
      // Toast duration (4000ms) + exit animation (300ms) = 4300ms minimum
      setTimeout(() => {
        window.location.href = "/";
      }, 4400); // Add small buffer to ensure smooth animation
    } catch (error) {
      console.error("Error deleting deck:", error);
      alert("Failed to delete deck. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleExportDeck = async () => {
    if (!deck) return;

    const deckCode = exportDeckToConfigCode(deck);
    const fullCode = `// Add this to config/decks.ts\n${deckCode}`;

    const success = await copyToClipboard(fullCode);
    if (success) {
      setCopiedSection("deck");
      setTimeout(() => setCopiedSection(null), 2000);
    } else {
      alert("Failed to copy to clipboard");
    }
  };

  const handleExportContent = async () => {
    if (!deck || slides.length === 0) return;

    const contentCode = exportDeckContentToConfigCode(deck.slug, slides);
    const fullCode = `// Add this to config/deck-content.ts\n\n${contentCode}\n\n// Then add to deckContentMap:\n// "${deck.slug}": ${deck.slug.replace(/-/g, "")}DeckSlides,`;

    const success = await copyToClipboard(fullCode);
    if (success) {
      setCopiedSection("content");
      setTimeout(() => setCopiedSection(null), 2000);
    } else {
      alert("Failed to copy to clipboard");
    }
  };

  if (!deck) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Deck</DialogTitle>
          <DialogDescription>
            {isLocalStorageDeck
              ? "Edit your deck or export it to config files for permanent storage"
              : "This deck is stored in config files. Edit the files directly to make changes."}
          </DialogDescription>
          <DialogClose />
        </DialogHeader>

        <DialogBody className="space-y-6">
          {/* Thumbnail Image/Gradient Selector */}
          {isLocalStorageDeck && (
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
                      No thumbnail selected (will use default gradient)
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
          )}

          {/* Deck Metadata */}
          <div className="space-y-4">
            <div>
              <label htmlFor="settings-title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <Input
                id="settings-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!isLocalStorageDeck}
              />
            </div>
            <div>
              <label htmlFor="settings-description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <Input
                id="settings-description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!isLocalStorageDeck}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <Input
                type="text"
                value={deck.slug}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Slug cannot be changed
              </p>
            </div>
          </div>

          {/* Export Section */}
          {isLocalStorageDeck && (
            <div className="space-y-3 p-4 border border-border rounded-md bg-muted/30">
              <h3 className="text-sm font-medium">Export to Config Files</h3>
              <p className="text-xs text-muted-foreground">
                Copy the generated code and paste it into the respective config files for permanent storage.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportDeck}
                  className="flex items-center gap-2"
                >
                  {copiedSection === "deck" ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Deck Config
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportContent}
                  disabled={slides.length === 0}
                  className="flex items-center gap-2"
                >
                  {copiedSection === "content" ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Content Config
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Delete Section */}
          {isLocalStorageDeck && (
            <div className="space-y-3 p-4 border border-destructive/50 rounded-md bg-destructive/5">
              <h3 className="text-sm font-medium text-destructive">Danger Zone</h3>
              {!showDeleteConfirm ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Delete this deck permanently</p>
                    <p className="text-xs text-muted-foreground">
                      This action cannot be undone
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Are you sure you want to delete "{deck.title}"?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {isLocalStorageDeck && (
            <Button onClick={handleSave} disabled={isSaving || !title.trim()}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

