"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Minimize } from "lucide-react";

interface PresentationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onExit: () => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function PresentationControls({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onExit,
  isFirstSlide,
  isLastSlide,
  isFullscreen,
  onToggleFullscreen,
}: PresentationControlsProps) {
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

      {/* Right side - Exit button only */}
      <div className="flex items-center gap-2">
        {/* Close button - shows Minimize icon when in fullscreen, X icon when not */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onExit}
          aria-label={isFullscreen ? "Exit fullscreen" : "Exit presentation"}
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </Button>
      </div>
    </footer>
  );
}

