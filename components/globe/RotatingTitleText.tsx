"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/**
 * RotatingTitleText Component
 * 
 * Displays text that rotates around the globe vertically (top to bottom, clockwise).
 * The text follows a circular path around the globe's vertical axis.
 */

interface RotatingTitleTextProps {
  /** Text to display */
  text?: string;
  /** Size of the globe (to position text around it) */
  globeSize?: number;
  /** Rotation speed multiplier */
  rotationSpeed?: number;
  /** Font size */
  fontSize?: number;
}

function RotatingTitleContent({
  text = "Deckard",
  globeSize = 1.25,
  rotationSpeed = 1.0,
  fontSize = 0.4,
}: RotatingTitleTextProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  // Theme-aware text color
  const textColor = isDark ? "#e0e0e0" : "#1a1a1a";

  // Track rotation angle for vertical circular path
  const rotationRef = useRef(0);

  // Rotate text around the globe vertically (clockwise from top to bottom)
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Increment rotation angle (clockwise around Y axis)
      rotationRef.current += delta * 0.2 * rotationSpeed;
      
      // Calculate position on vertical circle (in XZ plane, Y varies)
      // Starting at top (y = radius), moving clockwise
      const radius = globeSize * 1.4;
      const x = Math.sin(rotationRef.current) * radius;
      const z = Math.cos(rotationRef.current) * radius;
      const y = 0; // Keep at equator level for vertical rotation
      
      // Update text position
      groupRef.current.position.set(x, y, z);
      
      // Rotate text to face outward from the globe
      // Text should be perpendicular to the radius vector
      groupRef.current.rotation.y = rotationRef.current;
      groupRef.current.rotation.x = Math.PI / 2; // Face outward
    }
  });

  const radius = globeSize * 1.4;

  return (
    <group ref={groupRef} position={[0, 0, radius]}>
      <Text
        position={[0, 0, 0]}
        fontSize={fontSize}
        color={textColor}
        font={undefined} // Use drei's default font
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 2, 0, 0]} // Initial rotation to face outward
      >
        {text}
      </Text>
    </group>
  );
}

export function RotatingTitleText({
  text = "Deckard",
  globeSize = 1.25,
  rotationSpeed = 1.0,
  fontSize = 0.4,
}: RotatingTitleTextProps) {
  return (
    <Suspense fallback={null}>
      <RotatingTitleContent
        text={text}
        globeSize={globeSize}
        rotationSpeed={rotationSpeed}
        fontSize={fontSize}
      />
    </Suspense>
  );
}

