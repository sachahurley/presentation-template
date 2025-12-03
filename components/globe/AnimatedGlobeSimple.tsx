"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Simple test version of the globe to verify rendering works
 */

interface AnimatedGlobeSimpleProps {
  size?: number;
  rotationSpeed?: number;
}

export function AnimatedGlobeSimple({ size = 1.25, rotationSpeed = 1.0 }: AnimatedGlobeSimpleProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2 * rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial color="#4dd0e1" />
    </mesh>
  );
}

