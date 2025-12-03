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

// Fragment shader creates a soft glow effect with softer, blurred edges
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
    // Reduced power from 2.0 to 1.2 for softer, more gradual falloff
    // Lower power = softer transition from center to edge
    float fresnel = pow(1.0 - max(dot(vWorldNormal, viewDirection), 0.0), 1.2);
    
    // Create a softer edge glow using smoothstep for ultra-smooth blending
    // smoothstep creates a smooth S-curve transition, perfect for blurred edges
    // The range (0.2, 0.8) means the glow starts fading earlier and more gradually
    float softGlow = smoothstep(0.2, 0.8, fresnel);
    
    // Apply additional smoothing for even softer edges
    // This creates a more gradual falloff at the very outer edge
    float blurredEdge = smoothstep(0.0, 0.6, fresnel);
    
    // Combine both effects for maximum softness
    // The blurredEdge adds extra softness at the outer perimeter
    float combinedGlow = mix(softGlow, blurredEdge, 0.3);
    
    // Create soft glow that's stronger at edges but with smoother, more blurred falloff
    float glow = combinedGlow * uGlowIntensity;
    
    // Very subtle overall glow for ambient effect
    glow += 0.05 * uGlowIntensity;
    
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

  // Slightly larger sphere for glow - increased from 5% to 8% for more blur distance
  // This creates more space for the glow to fade, resulting in a softer, more blurred edge
  const glowGeometry = useMemo(() => {
    return new THREE.SphereGeometry(size * 1.08, 64, 64); // 8% larger than globe for softer blur
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

