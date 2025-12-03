"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DeckThumbnailGradient } from "@/components/deck/DeckThumbnailGradient";

interface TitleSlideProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string; // Optional background image (data URL or regular URL) - overrides gradient
}

export function TitleSlide({ title, subtitle, backgroundImage }: TitleSlideProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If custom background image is provided, use it
  // Check for truthy and non-empty string, but data URLs don't need trim check
  if (backgroundImage && typeof backgroundImage === 'string' && backgroundImage.length > 0) {
    return (
      <div 
        className="h-full flex flex-col items-center justify-center text-center px-8 relative"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">{title}</h1>
          {subtitle && (
            <p className="text-2xl md:text-3xl text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    );
  }

  // Prevent hydration mismatch by not rendering gradient until mounted
  if (!mounted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8 relative">
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">{title}</h1>
          {subtitle && (
            <p className="text-2xl md:text-3xl text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8 relative overflow-hidden">
      {/* Soft gradient background - same as deck thumbnails */}
      <DeckThumbnailGradient />
      
      {/* Content layer - above gradients */}
      <div className="relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">{title}</h1>
        {subtitle && (
          <p className="text-2xl md:text-3xl text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

