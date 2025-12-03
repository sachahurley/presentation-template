"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

/**
 * GlobeShadow Component
 * 
 * Creates a circular shadow plane beneath the globe with a radial gradient fade.
 * The shadow is more subtle and fades to 0 opacity at the edges.
 * Reacts to theme changes for appropriate visibility.
 */

// Vertex shader for shadow plane
const shadowVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader creates radial gradient fading to 0 at edges
const shadowFragmentShader = `
  uniform float uMaxOpacity;
  
  varying vec2 vUv;

  void main() {
    // Calculate distance from center (0.0 to 1.0)
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Create smooth radial fade
    // Center is at full opacity, edges fade to 0
    float fade = 1.0 - smoothstep(0.0, 0.7, dist * 2.0);
    
    // Apply the max opacity uniform (theme-aware)
    float alpha = fade * uMaxOpacity;
    
    gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
  }
`;

interface GlobeShadowProps {
  /** Size of the shadow (should match or be slightly larger than globe size) */
  size?: number;
  /** Y position of the shadow (beneath the globe) */
  positionY?: number;
}

export function GlobeShadow({ size = 1.25, positionY = -1.5 }: GlobeShadowProps) {
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  // Theme-aware shadow opacity - more subtle overall
  const maxOpacity = useMemo(() => {
    if (isDark) {
      // Dark mode: very subtle shadow
      return 0.08;
    } else {
      // Light mode: subtle but visible shadow
      return 0.15;
    }
  }, [isDark]);

  // Shader material with radial gradient
  const shadowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: shadowVertexShader,
      fragmentShader: shadowFragmentShader,
      uniforms: {
        uMaxOpacity: { value: maxOpacity },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false, // Prevents shadow from interfering with depth
    });
  }, [maxOpacity]);

  // Create a circular shadow using a circle geometry
  const shadowGeometry = useMemo(() => {
    return new THREE.CircleGeometry(size * 1.2, 32); // Slightly larger than globe
  }, [size]);

  return (
    <mesh
      geometry={shadowGeometry}
      material={shadowMaterial}
      position={[0, positionY, 0]}
      rotation={[-Math.PI / 2, 0, 0]} // Rotate to lie flat on the ground
    />
  );
}

