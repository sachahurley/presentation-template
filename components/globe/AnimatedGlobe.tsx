"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/**
 * AnimatedGlobe Component
 * 
 * Creates a 3D rotating globe with hologram-style digital noise effect.
 * The globe is theme-aware and adjusts its appearance based on light/dark mode.
 * 
 * Features:
 * - Slow continuous rotation
 * - Custom shader material with digital noise
 * - Scanline overlay effect
 * - Edge glow for hologram appearance
 * - Theme-aware colors and intensity
 */

// Vertex shader - handles 3D positioning of vertices
const vertexShader = `
  precision highp float;
  
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec2 vUv;

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    
    // Calculate world position for proper view direction calculation
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    
    // Calculate world normal for fresnel effect
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - creates the hologram effect with noise, scanlines, and glow
const fragmentShader = `
  precision highp float;
  
  uniform float uTime;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform float uNoiseIntensity;
  uniform float uGlowIntensity;
  uniform float uScanlineIntensity;
  uniform bool uIsDark;
  uniform sampler2D uEarthTexture;
  uniform float uTextureIntensity;

  uniform vec3 uCameraPosition;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec2 vUv;

  // Simple noise function for digital noise effect
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // Seamless/tileable noise function that wraps around edges
  float noiseSeamless(vec2 st) {
    // Wrap coordinates to create seamless tiling
    st = mod(st, 1.0);
    
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    // Sample corners with wrapping
    float a = random(mod(i, 1.0));
    float b = random(mod(i + vec2(1.0, 0.0), 1.0));
    float c = random(mod(i + vec2(0.0, 1.0), 1.0));
    float d = random(mod(i + vec2(1.0, 1.0), 1.0));
    
    // Smooth interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // 2D noise function with seamless wrapping for X axis (longitude)
  float noise(vec2 st) {
    // Wrap X coordinate to create seamless horizontal wrapping
    st.x = mod(st.x, 1.0);
    
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    // Sample with wrapping on X axis
    float a = random(vec2(mod(i.x, 1.0), i.y));
    float b = random(vec2(mod(i.x + 1.0, 1.0), i.y));
    float c = random(vec2(mod(i.x, 1.0), i.y + 1.0));
    float d = random(vec2(mod(i.x + 1.0, 1.0), i.y + 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractal noise for more complex patterns with seamless wrapping
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    vec2 samplePos = st;
    
    for(int i = 0; i < 4; i++) {
      // Use seamless noise for each octave
      value += amplitude * noise(samplePos);
      samplePos *= 2.0;
      // Wrap sample position to maintain seamlessness
      samplePos.x = mod(samplePos.x, 1.0);
      amplitude *= 0.5;
    }
    return value;
  }
  
  // Smooth blending function for UV seam (where u wraps from 0 to 1)
  float smoothSeam(float u, float blendWidth) {
    // Create smooth transition at edges (0 and 1)
    float edge0 = blendWidth;
    float edge1 = 1.0 - blendWidth;
    
    if (u < edge0) {
      // Smooth transition near 0
      return smoothstep(0.0, edge0, u);
    } else if (u > edge1) {
      // Smooth transition near 1
      return smoothstep(1.0, edge1, u);
    }
    return 1.0;
  }

  void main() {
    // Create seamless UV coordinates with blending at edges to smooth stitch lines
    // Blend zone width for seamless wrapping - wider for smoother transition
    float blendWidth = 0.05; // 5% blend zone at edges for smoother seams
    
    // Sample texture at current position and at wrapped positions for seamless blending
    vec2 baseUV = vec2(vUv.x, vUv.y);
    
    // Normalize UV to [0, 1] range for texture sampling
    float normalizedX = mod(baseUV.x, 1.0);
    
    // Sample at current position
    vec2 textureUV1 = vec2(normalizedX, baseUV.y);
    vec3 color1 = texture2D(uEarthTexture, textureUV1).rgb;
    
    // Sample at wrapped positions for seamless blending at edges
    vec2 textureUV2 = vec2(normalizedX + 1.0, baseUV.y);
    vec2 textureUV3 = vec2(normalizedX - 1.0, baseUV.y);
    vec3 color2 = texture2D(uEarthTexture, textureUV2).rgb;
    vec3 color3 = texture2D(uEarthTexture, textureUV3).rgb;
    
    // Use smoothstep for smoother blending transitions
    float blendFactor;
    vec3 earthTextureColor;
    
    if (normalizedX < blendWidth) {
      // Near left edge (u=0), blend with right side
      blendFactor = smoothstep(0.0, blendWidth, normalizedX);
      earthTextureColor = mix(color2, color1, blendFactor);
    } else if (normalizedX > 1.0 - blendWidth) {
      // Near right edge (u=1), blend with left side
      blendFactor = smoothstep(1.0, 1.0 - blendWidth, normalizedX);
      earthTextureColor = mix(color3, color1, blendFactor);
    } else {
      // Middle area, use center color
      earthTextureColor = color1;
    }
    
    // Adjust texture intensity based on theme
    // In dark mode, make it brighter; in light mode, keep it natural
    float brightness = uIsDark ? 1.1 : 0.95;
    earthTextureColor *= brightness * uTextureIntensity;
    
    // Use Earth texture as base color
    vec3 earthColor = earthTextureColor;
    
    // Digital noise overlay for hologram effect - make it seamless
    vec2 noiseUV = baseUV * vec2(200.0, 200.0) + uTime * 2.0;
    noiseUV.x = mod(noiseUV.x, 200.0); // Wrap X coordinate for seamless tiling
    float digitalNoise = random(floor(noiseUV) / 200.0);
    digitalNoise = mix(0.5, digitalNoise, uNoiseIntensity);
    
    // Scanline effect - horizontal lines for hologram look
    float scanline = sin(baseUV.y * 800.0 + uTime * 2.0) * 0.5 + 0.5;
    scanline = mix(1.0, scanline, uScanlineIntensity);
    
    // Edge glow - brighter at edges for hologram effect
    float edgeDistance = length(baseUV - 0.5) * 2.0;
    float edgeGlow = 1.0 - smoothstep(0.7, 1.0, edgeDistance);
    edgeGlow = pow(edgeGlow, 2.0) * uGlowIntensity;
    
    // Fresnel effect - brighter at edges when viewed at an angle
    // Calculate view direction from camera to fragment position
    vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
    // Use the world normal passed from vertex shader
    float fresnel = pow(1.0 - max(dot(vWorldNormal, viewDirection), 0.0), 2.0);
    
    // Combine all effects
    vec3 finalColor = earthColor;
    finalColor *= digitalNoise; // Apply noise
    finalColor *= scanline; // Apply scanlines
    finalColor += edgeGlow * uColorPrimary; // Add edge glow
    finalColor += fresnel * 0.3 * uColorPrimary; // Add fresnel glow
    
    // Adjust opacity based on theme - more transparent in dark mode for stronger effect
    float alpha = uIsDark ? 0.85 : 0.9;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface AnimatedGlobeProps {
  /** Size of the globe in 3D units */
  size?: number;
  /** Rotation speed multiplier (default: 1.0) */
  rotationSpeed?: number;
}

export function AnimatedGlobe({ size = 2, rotationSpeed = 1.0 }: AnimatedGlobeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme, resolvedTheme } = useTheme();
  
  // Determine if we're in dark mode
  const isDark = resolvedTheme === "dark" || theme === "dark";

  // Theme-aware colors
  // Light mode: softer blues and cyans
  // Dark mode: brighter, more vibrant cyans and blues with stronger glow
  const colors = useMemo(() => {
    if (isDark) {
      return {
        primary: new THREE.Color(0x00d4ff), // Bright cyan
        secondary: new THREE.Color(0x0066ff), // Bright blue
        noiseIntensity: 0.15, // More noise in dark mode
        glowIntensity: 0.4, // Stronger glow in dark mode
        scanlineIntensity: 0.2, // More visible scanlines
      };
    } else {
      return {
        primary: new THREE.Color(0x4dd0e1), // Softer cyan
        secondary: new THREE.Color(0x42a5f5), // Softer blue
        noiseIntensity: 0.1, // Subtle noise in light mode
        glowIntensity: 0.2, // Subtle glow in light mode
        scanlineIntensity: 0.1, // Subtle scanlines
      };
    }
  }, [isDark]);

  // Load Earth texture - using NASA Blue Marble texture
  // This is a high-quality Earth texture that's free to use
  // Using a reliable CDN URL for the Earth texture
  const earthTexture = useTexture("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg");
  
  // Configure texture settings for proper wrapping
  useEffect(() => {
    if (earthTexture) {
      earthTexture.wrapS = THREE.RepeatWrapping;
      earthTexture.wrapT = THREE.ClampToEdgeWrapping;
      earthTexture.flipY = true; // Flip Y to correct orientation
    }
  }, [earthTexture]);

  // Shader uniforms - create once and update values
  const uniforms = useRef({
    uTime: { value: 0 },
    uColorPrimary: { value: new THREE.Color(0x4dd0e1) },
    uColorSecondary: { value: new THREE.Color(0x42a5f5) },
    uNoiseIntensity: { value: 0.1 },
    uGlowIntensity: { value: 0.2 },
    uScanlineIntensity: { value: 0.1 },
    uIsDark: { value: false },
    uCameraPosition: { value: new THREE.Vector3(0, 0, 5) },
    uEarthTexture: { value: null as THREE.Texture | null },
    uTextureIntensity: { value: 1.0 },
  }).current;

  // Update uniform values when colors, theme, or texture change
  useEffect(() => {
    uniforms.uColorPrimary.value.copy(colors.primary);
    uniforms.uColorSecondary.value.copy(colors.secondary);
    uniforms.uNoiseIntensity.value = colors.noiseIntensity;
    uniforms.uGlowIntensity.value = colors.glowIntensity;
    uniforms.uScanlineIntensity.value = colors.scanlineIntensity;
    uniforms.uIsDark.value = isDark;
    uniforms.uEarthTexture.value = earthTexture;
    // Adjust texture intensity based on theme - slightly brighter in dark mode
    uniforms.uTextureIntensity.value = isDark ? 1.0 : 0.95;
  }, [colors, isDark, uniforms, earthTexture]);

  // Animation loop - updates rotation and time uniform
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow rotation around Y axis (vertical)
      meshRef.current.rotation.y += delta * 0.2 * rotationSpeed;
      
      // Update time uniform for shader animations
      uniforms.uTime.value += delta;
      
      // Update camera position uniform for fresnel effect
      uniforms.uCameraPosition.value.copy(state.camera.position);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Sphere geometry - creates the 3D globe shape */}
      <sphereGeometry args={[size, 64, 64]} />
      
      {/* Custom shader material with hologram effect */}
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

