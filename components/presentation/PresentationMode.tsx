"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PresentationControls } from "./PresentationControls";
import { TitleSlide } from "@/components/templates/slides/TitleSlide";
import { HeadlineSlide } from "@/components/templates/slides/HeadlineSlide";
import { SectionSlide } from "@/components/templates/slides/SectionSlide";
import { BulletListSlide } from "@/components/templates/slides/BulletListSlide";
import { ImageSlide } from "@/components/templates/slides/ImageSlide";
import { QuoteSlide } from "@/components/templates/slides/QuoteSlide";
import { BlankSlide } from "@/components/templates/slides/BlankSlide";
import { ThreeColumnSlide } from "@/components/templates/slides/ThreeColumnSlide";
import { TwoColumnSlide } from "@/components/templates/slides/TwoColumnSlide";

export interface PresentationSlide {
  id: number;
  type: "title" | "headline" | "section" | "bulletList" | "image" | "quote" | "blank" | "threeColumn" | "twoColumn";
  title?: string;
  subtitle?: string;
  headline?: string;
  description?: string;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  quote?: string;
  attribution?: string;
  backgroundImage?: string; // Optional background image URL (data URL or regular URL)
  children?: React.ReactNode;
  columns?: Array<{ heading: string; body?: string; bullets?: string[] }>; // For threeColumn and twoColumn slide types
  showBottomBar?: boolean; // For twoColumn slide type to control bottom bar visibility
}

interface PresentationModeProps {
  slides: PresentationSlide[];
  onExit: () => void;
  initialSlideIndex?: number;
}

export function PresentationMode({ slides, onExit, initialSlideIndex = 0 }: PresentationModeProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);
  // Initialize fullscreen state - check if already in fullscreen
  const [isFullscreen, setIsFullscreen] = useState(() => {
    if (typeof document !== 'undefined') {
      return !!document.fullscreenElement;
    }
    return false;
  });

  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

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

  // Fullscreen handling - since we auto-enter fullscreen, toggle only exits
  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  // Handle exit - exit fullscreen (fullscreenchange handler will call onExit)
  const handleExit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      // If already not in fullscreen, call onExit directly
      onExit();
    }
  }, [onExit]);

  // Track if we're in the initial mount phase to prevent premature exit
  const isInitialMount = useRef(true);

  // Initialize fullscreen state and mark initial mount complete
  useEffect(() => {
    // Check current fullscreen state
    setIsFullscreen(!!document.fullscreenElement);
    
    // Mark initial mount as complete after a brief delay
    const timer = setTimeout(() => {
      isInitialMount.current = false;
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      // If user exits fullscreen via ESC key, exit presentation mode
      // But don't exit during initial mount phase
      if (!isCurrentlyFullscreen && !isInitialMount.current) {
        onExit();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [onExit]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for navigation keys
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === " " ||
        e.key === "Escape" ||
        e.key === "f" ||
        e.key === "F"
      ) {
        e.preventDefault();
      }

      // Navigation
      if (e.key === "ArrowRight" || e.key === " ") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onExit();
        }
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious, onExit, toggleFullscreen]);

  const renderSlide = () => {
    if (!currentSlide) return null;

    switch (currentSlide.type) {
      case "title":
        return (
          <TitleSlide
            title={currentSlide.title || ""}
            subtitle={currentSlide.subtitle}
            backgroundImage={currentSlide.backgroundImage}
          />
        );
      case "headline":
        return <HeadlineSlide headline={currentSlide.headline || ""} />;
      case "section":
        return (
          <SectionSlide
            title={currentSlide.title || ""}
            description={currentSlide.description}
          />
        );
      case "bulletList":
        return (
          <BulletListSlide
            title={currentSlide.title}
            items={currentSlide.items || []}
          />
        );
      case "image":
        return (
          <ImageSlide
            src={currentSlide.src || ""}
            alt={currentSlide.alt || ""}
            caption={currentSlide.caption}
            title={currentSlide.title}
          />
        );
      case "quote":
        return (
          <QuoteSlide
            quote={currentSlide.quote || ""}
            attribution={currentSlide.attribution}
          />
        );
      case "blank":
        return <BlankSlide>{currentSlide.children}</BlankSlide>;
      case "threeColumn":
        return (
          <ThreeColumnSlide
            title={currentSlide.title}
            columns={currentSlide.columns || []}
          />
        );
      case "twoColumn":
        return (
          <TwoColumnSlide
            title={currentSlide.title}
            columns={currentSlide.columns || []}
            showBottomBar={currentSlide.showBottomBar !== false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-hidden">
      {/* 16:9 Aspect Ratio Container */}
      <div className="w-full h-full flex items-center justify-center p-4">
        <div
          className="relative w-full bg-card border border-border rounded-lg overflow-hidden shadow-2xl"
          style={{ aspectRatio: "16/9", maxHeight: "100vh", maxWidth: "100vw" }}
        >
          {/* Slide Content */}
          <div className="absolute inset-0 overflow-hidden">
            {renderSlide()}
          </div>

          {/* Controls Footer */}
          <PresentationControls
            currentSlide={currentSlideIndex + 1}
            totalSlides={totalSlides}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onExit={handleExit}
            isFirstSlide={currentSlideIndex === 0}
            isLastSlide={currentSlideIndex === totalSlides - 1}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
}

