"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface DeckThumbnailGradientProps {
  className?: string;
}

/**
 * Reusable gradient component that matches the TitleSlide gradient
 * Theme-aware: uses different gradients for light and dark modes
 */
export function DeckThumbnailGradient({ className = "" }: DeckThumbnailGradientProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode is active
  const isDark = resolvedTheme === "dark" || (resolvedTheme === undefined && theme === "dark");

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className={`absolute inset-0 ${className}`} />;
  }

  // Different gradient configurations for light vs dark mode
  // Same as TitleSlide - dark mode has 6 color blobs, light mode has 3 softer ones
  const gradientLayers = isDark ? (
    // Dark mode - 6 color blobs using all chart colors
    <>
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 15% 25%, var(--chart-1) 0%, transparent 60%)`,
          filter: 'blur(50px)',
          transform: 'scale(1.2)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 80% at 85% 15%, var(--chart-2) 0%, transparent 55%)`,
          filter: 'blur(50px)',
          transform: 'scale(1.2)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 35% 75%, var(--chart-3) 0%, transparent 65%)`,
          filter: 'blur(50px)',
          transform: 'scale(1.2)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 75% 65% at 95% 85%, var(--chart-4) 0%, transparent 60%)`,
          filter: 'blur(50px)',
          transform: 'scale(1.2)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 75% at 5% 95%, var(--chart-5) 0%, transparent 70%)`,
          filter: 'blur(50px)',
          transform: 'scale(1.2)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 50% at 55% 45%, var(--chart-1) 0%, transparent 75%)`,
          filter: 'blur(50px)',
          transform: 'scale(1.2)',
        }}
      />
    </>
  ) : (
    // Light mode - 3 softer color blobs
    <>
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 20% 30%, var(--chart-2) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          transform: 'scale(1.2)',
          opacity: 0.4,
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 80% 70%, var(--chart-4) 0%, transparent 65%)`,
          filter: 'blur(60px)',
          transform: 'scale(1.2)',
          opacity: 0.35,
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 100% 50% at 50% 50%, var(--chart-3) 0%, transparent 80%)`,
          filter: 'blur(70px)',
          transform: 'scale(1.2)',
          opacity: 0.25,
        }}
      />
    </>
  );

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {gradientLayers}
    </div>
  );
}


