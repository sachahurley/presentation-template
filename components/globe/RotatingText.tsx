"use client";

import { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/**
 * RotatingTextRing Component
 * 
 * Creates a Saturn-like ring effect with text rotating around the globe.
 * The text forms a continuous ring by repeating the text around the circle.
 * Uses EB Garamond font (similar to Garamond) and is theme-aware.
 */

interface RotatingTextRingProps {
  /** Text to display (will be repeated to form a ring) */
  text?: string;
  /** Size of the globe (to position text around it) */
  globeSize?: number;
  /** Rotation speed multiplier (negative to rotate opposite direction) */
  rotationSpeed?: number;
  /** Font size */
  fontSize?: number;
  /** Number of text segments around the ring */
  segments?: number;
}

// Load EB Garamond font
function TextRingContent({
  text = "Betterfly",
  globeSize = 1.25,
  rotationSpeed = 1.0,
  fontSize = 0.3,
  segments = 24,
}: RotatingTextRingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  // Load font - useFont returns null if loading fails, which is fine
  // We'll use drei's default font if this fails (which is serif-like)
  // For now, skip custom font loading to avoid 404 errors
  // drei's default font is readable and works reliably
  const font = null; // Using drei's default font for now

  // Theme-aware text color
  const textColor = useMemo(() => {
    if (isDark) {
      return "#e0e0e0"; // Light gray for dark mode
    } else {
      return "#1a1a1a"; // Dark gray for light mode
    }
  }, [isDark]);

  // Rotate ring in opposite direction (negative rotation)
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate around Y axis in opposite direction of globe
      groupRef.current.rotation.y -= delta * 0.2 * Math.abs(rotationSpeed);
    }
  });

  // Position text around the globe horizontally (ring at equator)
  const radius = globeSize * 1.5; // Position text outside the globe
  const yPosition = 0; // At the equator (same level as globe center)

  // Calculate positions for text segments around the circle
  const textSegments = useMemo(() => {
    const positions: Array<{ angle: number; position: [number, number, number]; rotation: [number, number, number] }> = [];
    const angleStep = (Math.PI * 2) / segments;
    
    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // Position and rotation to face outward from the globe
      positions.push({
        angle,
        position: [x, yPosition, z],
        rotation: [0, angle + Math.PI / 2, 0], // Face outward, tangent to circle
      });
    }
    
    return positions;
  }, [radius, yPosition, segments]);

  // Use drei's default font (undefined)
  // This avoids font loading errors and works reliably
  const fontData = undefined;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {textSegments.map((segment, index) => (
        <Text
          key={index}
          position={segment.position}
          fontSize={fontSize}
          color={textColor}
          font={fontData}
          anchorX="center"
          anchorY="middle"
          rotation={segment.rotation}
        >
          {text}
        </Text>
      ))}
    </group>
  );
}

export function RotatingText({ 
  text = "Betterfly", 
  globeSize = 1.25, 
  rotationSpeed = 1.0,
  fontSize = 0.3,
  segments = 24,
}: RotatingTextRingProps) {
  return (
    <Suspense fallback={null}>
      <TextRingContent
        text={text}
        globeSize={globeSize}
        rotationSpeed={rotationSpeed}
        fontSize={fontSize}
        segments={segments}
      />
    </Suspense>
  );
}

