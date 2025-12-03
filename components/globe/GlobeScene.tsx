"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatedGlobe } from "./AnimatedGlobe";
import { AnimatedGlobeSimple } from "./AnimatedGlobeSimple";
import { GlobeGlow } from "./GlobeGlow";

/**
 * GlobeScene Component
 * 
 * Wrapper component that sets up the React Three Fiber Canvas
 * and renders the AnimatedGlobe component.
 * 
 * The Canvas component creates a WebGL context for 3D rendering.
 * Suspense is used to handle loading states gracefully.
 */

interface GlobeSceneProps {
  /** Size of the globe in 3D units */
  size?: number;
  /** Rotation speed multiplier */
  rotationSpeed?: number;
  /** Additional CSS classes */
  className?: string;
}

export function GlobeScene({ size = 2, rotationSpeed = 1.0, className = "" }: GlobeSceneProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ minHeight: '250px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
        style={{ display: 'block' }}
      >
        {/* Suspense allows us to show a loading state if needed */}
        <Suspense fallback={null}>
          {/* Ambient light - soft overall lighting */}
          <ambientLight intensity={0.5} />
          
          {/* Point light - creates highlights and depth */}
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Subtle glow around the globe */}
          <GlobeGlow size={size} rotationSpeed={rotationSpeed} />
          
          {/* The animated globe component */}
          <AnimatedGlobe size={size} rotationSpeed={rotationSpeed} />
        </Suspense>
      </Canvas>
    </div>
  );
}

