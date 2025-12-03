"use client";

import { useEffect, useState, useRef } from "react";

/**
 * SVG Pixel Art Hero Text Component
 * 
 * Displays "Presento" in SVG pixel art style, positioned in an arc
 * that frames the globe from the outside. Letters start at 9 o'clock,
 * curve over the top half, and end at 3 o'clock.
 */

// Pixel patterns for each letter - 6 rows tall, 5 columns wide (R extends to 6 on last row)
// 1 = filled pixel, 0 = empty pixel
const LETTER_PATTERNS: Record<string, number[][]> = {
  // P: Vertical left stem, horizontal top bar, curved right side forming loop
  P: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  // R: Similar to P, with diagonal leg extending from bottom-right of loop
  R: [
    [1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
  ],
  // E: Vertical left bar, three horizontal bars (full top, shorter middle, full bottom)
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  // S: Serpentine curved shape with prominent horizontal middle section
  S: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  // N: Two vertical stems connected by diagonal from top-left to bottom-right
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  // T: Wide horizontal top bar with vertical stem from center
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  // O: Solid enclosed rectangular/rounded rectangular loop
  O: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
};

/**
 * Renders a single letter as SVG pixel art
 */
function LetterSVG({ 
  pattern, 
  blockSize 
}: { 
  pattern: number[][]; 
  blockSize: number;
}) {
  const blocks: React.ReactElement[] = [];
  
  pattern.forEach((row, rowIndex) => {
    row.forEach((pixel, colIndex) => {
      if (pixel === 1) {
        blocks.push(
          <rect
            key={`${rowIndex}-${colIndex}`}
            x={colIndex * blockSize}
            y={rowIndex * blockSize}
            width={blockSize}
            height={blockSize}
            fill="currentColor"
          />
        );
      }
    });
  });

  const width = Math.max(...pattern.map(row => row.length)) * blockSize;
  const height = pattern.length * blockSize;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="block"
    >
      {blocks}
    </svg>
  );
}

interface AsciiHeroTextProps {
  /** Optional className for styling */
  className?: string;
}

export function AsciiHeroText({ className = "" }: AsciiHeroTextProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 586, height: 586 });

  useEffect(() => {
    setMounted(true);

    // Get container dimensions for responsive positioning
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Display "PRESENTO" in SVG pixel art style
  const text = "PRESENTO";
  const letters = text.split("");

  // Calculate arc radius as a percentage of container size
  // Position letters outside the globe - radius should be larger than globe radius
  // Use responsive scaling: larger radius on bigger screens, smaller on mobile
  // Increased multipliers to create more gap between letters and globe glow
  const baseRadius = Math.min(dimensions.width, dimensions.height);
  const arcRadius = baseRadius * (baseRadius > 500 ? 0.65 : baseRadius > 400 ? 0.62 : 0.60);

  // Calculate block size based on container dimensions (responsive)
  // Increased by 75% total (25% + 25% + 25%) for larger letters
  const blockSize = Math.max(4, Math.min(dimensions.width, dimensions.height) / 120) * 1.953125;

  // Calculate positions for each letter along the arc
  const letterPositions = letters.map((letter, index) => {
    // Distribute letters evenly along a 180-degree arc wrapping around the top half
    // Start at 9 o'clock (180 degrees) and end at 3 o'clock (0/360 degrees)
    const startAngle = 180; // 9 o'clock position
    const endAngle = 360; // 3 o'clock position (wraps to 0)
    const totalAngle = endAngle - startAngle; // 180 degrees
    const angleStep = totalAngle / (letters.length - 1);
    const angle = startAngle + angleStep * index;

    // Convert angle to radians
    const angleRad = (angle * Math.PI) / 180;

    // Calculate x and y positions on the circle
    // Center of the circle is at (containerWidth/2, containerHeight/2)
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Position along the arc
    const x = centerX + arcRadius * Math.cos(angleRad);
    const y = centerY + arcRadius * Math.sin(angleRad);

    // Calculate rotation angle to follow the curve
    // The rotation should be perpendicular to the radius at that point
    const rotationAngle = angle + 90; // Add 90 to make text follow the curve

    return {
      letter,
      x,
      y,
      rotationAngle,
      index,
    };
  });

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      {letterPositions.map(({ letter, x, y, rotationAngle, index }) => {
        const pattern = LETTER_PATTERNS[letter];
        if (!pattern) return null;

        return (
          <div
            key={`${letter}-${index}`}
            className="absolute text-foreground"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
              opacity: mounted ? 1 : 0,
              transition: `opacity 0.5s ease ${index * 0.1}s`,
              color: "currentColor",
            }}
          >
            <LetterSVG pattern={pattern} blockSize={blockSize} />
          </div>
        );
      })}
    </div>
  );
}

