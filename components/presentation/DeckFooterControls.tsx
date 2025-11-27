"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";

interface DeckFooterControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function DeckFooterControls({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  isFirstSlide,
  isLastSlide,
  isFullscreen,
  onToggleFullscreen,
}: DeckFooterControlsProps) {
  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-6 py-3 flex items-center justify-between z-50">
      {/* Left side - Navigation buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={isFirstSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={isLastSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Center - Page counter */}
      <div className="text-sm text-muted-foreground">
        {currentSlide} of {totalSlides}
      </div>

      {/* Right side - Fullscreen toggle only */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Fullscreen button clicked in DeckFooterControls");
            onToggleFullscreen();
          }}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </Button>
      </div>
    </footer>
  );
}

