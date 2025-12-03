"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

/**
 * GlobeGlow Component
 * 
 * Creates a subtle glowing aura around the globe.
 * The glow is theme-aware and provides a soft atmospheric effect.
 */

// Vertex shader for glow sphere
const glowVertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    // Calculate world normal for fresnel effect
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader creates a soft glow effect
const glowFragmentShader = `
  uniform vec3 uGlowColor;
  uniform float uGlowIntensity;
  uniform vec3 uCameraPosition;
  
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;

  void main() {
    // Calculate view direction for fresnel effect
    vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
    // Use the world normal passed from vertex shader
    float fresnel = pow(1.0 - max(dot(vWorldNormal, viewDirection), 0.0), 2.0);
    
    // Create soft glow that's stronger at edges
    float glow = fresnel * uGlowIntensity;
    
    // Very subtle overall glow
    glow += 0.1 * uGlowIntensity;
    
    gl_FragColor = vec4(uGlowColor, glow);
  }
`;

interface GlobeGlowProps {
  /** Size of the glow (should be slightly larger than globe) */
  size?: number;
  /** Rotation speed multiplier (should match globe) */
  rotationSpeed?: number;
}

export function GlobeGlow({ size = 1.25, rotationSpeed = 1.0 }: GlobeGlowProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";

  // Theme-aware glow color and intensity
  const glowSettings = useMemo(() => {
    if (isDark) {
      // Dark mode: subtle cyan/blue glow
      return {
        color: new THREE.Color(0x66d9ff), // Soft cyan-blue
        intensity: 0.15, // Subtle glow
      };
    } else {
      // Light mode: very subtle blue glow
      return {
        color: new THREE.Color(0x87ceeb), // Sky blue
        intensity: 0.1, // Very subtle glow
      };
    }
  }, [isDark]);

  // Glow material
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: glowVertexShader,
      fragmentShader: glowFragmentShader,
      uniforms: {
        uGlowColor: { value: glowSettings.color },
        uGlowIntensity: { value: glowSettings.intensity },
        uCameraPosition: { value: new THREE.Vector3(0, 0, 5) },
      },
      transparent: true,
      side: THREE.BackSide, // Render from inside to create outer glow
      depthWrite: false,
      blending: THREE.AdditiveBlending, // Additive blending for glow effect
    });
  }, [glowSettings]);

  // Slightly larger sphere for glow
  const glowGeometry = useMemo(() => {
    return new THREE.SphereGeometry(size * 1.05, 64, 64); // 5% larger than globe
  }, [size]);

  // Update camera position and rotate with globe in animation loop
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate glow with the globe (same rotation speed)
      meshRef.current.rotation.y += delta * 0.2 * rotationSpeed;
      
      // Update camera position for fresnel effect
      if (glowMaterial.uniforms.uCameraPosition) {
        glowMaterial.uniforms.uCameraPosition.value.copy(state.camera.position);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={glowGeometry}
      material={glowMaterial}
      position={[0, 0, 0]}
    />
  );
}

