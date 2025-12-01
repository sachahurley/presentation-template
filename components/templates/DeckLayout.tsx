"use client";

import { useState, useEffect, useCallback } from "react";
import { Deck } from "@/config/decks";
import { getDeckContent } from "@/config/deck-content";
import { SlideTemplate } from "./SlideTemplate";
import { PresentationMode, PresentationSlide } from "@/components/presentation/PresentationMode";
import { DeckFooterControls } from "@/components/presentation/DeckFooterControls";
import { TitleSlide } from "./slides/TitleSlide";
import { HeadlineSlide } from "./slides/HeadlineSlide";
import { SectionSlide } from "./slides/SectionSlide";
import { BulletListSlide } from "./slides/BulletListSlide";
import { QuoteSlide } from "./slides/QuoteSlide";
import { ImageSlide } from "./slides/ImageSlide";
import { BlankSlide } from "./slides/BlankSlide";
import { ThreeColumnSlide } from "./slides/ThreeColumnSlide";
import { TwoColumnSlide } from "./slides/TwoColumnSlide";
import { TimelineSlide } from "./slides/TimelineSlide";
import { IconListSlide } from "./slides/IconListSlide";

interface DeckLayoutProps {
  deck: Deck;
}

export function DeckLayout({ deck }: DeckLayoutProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);

  // Get slides from deck content configuration, with fallback to default title slide
  const deckSlides = getDeckContent(deck.slug);
  const slides: PresentationSlide[] = deckSlides.length > 0 
    ? deckSlides 
    : [
        {
          id: 1,
          type: "title",
          title: deck.title,
          subtitle: deck.description,
        },
      ];

  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;
  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === totalSlides - 1;

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, totalSlides]);

  const handlePrevious = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  }, [currentSlideIndex]);

  // Fullscreen toggle - enters presentation mode and attempts browser fullscreen
  const handleToggleFullscreen = useCallback(() => {
    console.log("Fullscreen button clicked, isFullscreenMode:", isFullscreenMode);
    if (!isFullscreenMode) {
      // Enter presentation mode immediately (works regardless of browser fullscreen support)
      console.log("Entering presentation mode...");
      setIsFullscreenMode(true);
      
      // Try to request browser fullscreen in the background (may not work in embedded browsers)
      // This is a bonus feature - presentation mode will work even if this fails
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log("Browser fullscreen not available (this is OK):", err.message);
        });
      }
    } else {
      console.log("Exiting fullscreen...");
      // Exit fullscreen mode if active
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      // Exit presentation mode
      setIsFullscreenMode(false);
    }
  }, [isFullscreenMode]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      // Use functional update to avoid stale closure issues
      setIsFullscreenMode((prev) => {
        if (isCurrentlyFullscreen && !prev) {
          // Fullscreen was entered, switch to PresentationMode
          return true;
        } else if (!isCurrentlyFullscreen && prev) {
          // Fullscreen was exited, return to deck view
          return false;
        }
        return prev;
      });
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []); // No dependencies - use functional updates instead

  // Keyboard navigation for slides
  useEffect(() => {
    // Don't handle keyboard if in fullscreen presentation mode
    if (isFullscreenMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for navigation keys
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === " "
      ) {
        e.preventDefault();
      }

      // Navigation
      if (e.key === "ArrowRight" || e.key === " ") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "f" || e.key === "F") {
        handleToggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlideIndex, handleNext, handlePrevious, handleToggleFullscreen, isFullscreenMode]);

  // Render slide component based on type
  const renderSlide = (slide: PresentationSlide) => {
    if (!slide) return null;

    switch (slide.type) {
      case "title":
        return (
          <TitleSlide
            title={slide.title || ""}
            subtitle={slide.subtitle}
            backgroundImage={slide.backgroundImage}
          />
        );
      case "headline":
        return <HeadlineSlide headline={slide.headline || ""} />;
      case "section":
        return (
          <SectionSlide
            title={slide.title || ""}
            description={slide.description}
          />
        );
      case "bulletList":
        return (
          <BulletListSlide
            title={slide.title}
            items={slide.items || []}
          />
        );
      case "image":
        return (
          <ImageSlide
            src={slide.src || ""}
            alt={slide.alt || ""}
            caption={slide.caption}
            title={slide.title}
          />
        );
      case "quote":
        return (
          <QuoteSlide
            quote={slide.quote || ""}
            attribution={slide.attribution}
          />
        );
      case "blank":
        return <BlankSlide>{slide.children}</BlankSlide>;
      case "threeColumn":
        return (
          <ThreeColumnSlide
            title={slide.title}
            columns={slide.columns || []}
          />
        );
      case "twoColumn":
        return (
          <TwoColumnSlide
            title={slide.title}
            columns={slide.columns || []}
            showBottomBar={slide.showBottomBar !== false}
          />
        );
      case "timeline":
        return (
          <TimelineSlide
            title={slide.title}
            items={slide.timelineItems || []}
            timeIndicator={slide.timeIndicator}
          />
        );
      case "iconList":
        return (
          <IconListSlide
            title={slide.title}
            items={slide.iconItems || []}
          />
        );
      default:
        return null;
    }
  };

  // If in fullscreen mode, show full presentation mode
  if (isFullscreenMode) {
    return (
      <PresentationMode
        slides={slides}
        initialSlideIndex={currentSlideIndex}
        onExit={() => {
          setIsFullscreenMode(false);
          // Exit fullscreen if it's active
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
        }}
      />
    );
  }

  const secondSlide = slides[1]; // "Welcome to the Presentation" card

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Current Slide Embedded - Interactive Preview */}
      <div className="mb-12">
        <div
          className="relative w-full bg-card border border-border rounded-lg overflow-hidden shadow-lg"
          style={{ aspectRatio: "16/9", minHeight: "60vh" }}
        >
          {/* Current Slide Content */}
          <div className="absolute inset-0 overflow-hidden">
            {renderSlide(currentSlide)}
          </div>

          {/* Footer Controls */}
          <div onClick={(e) => e.stopPropagation()}>
            <DeckFooterControls
              currentSlide={currentSlideIndex + 1}
              totalSlides={totalSlides}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isFirstSlide={isFirstSlide}
              isLastSlide={isLastSlide}
              isFullscreen={false}
              onToggleFullscreen={handleToggleFullscreen}
            />
          </div>
        </div>
      </div>

      {/* Second Slide Always Visible - "Welcome to the Presentation" Card */}
      {secondSlide && (
        <div className="space-y-8">
          {secondSlide.type === "headline" && (
            <SlideTemplate
              slide={{
                id: secondSlide.id,
                type: "content",
                title: "Notes",
                content: "",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
