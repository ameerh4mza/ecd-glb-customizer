"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { CarWithCustomRims } from "./CarWithCustomRims";

// Car Model with Customization
function CustomizableCarModel({ color, rims, grill }) {
  const groupRef = useRef();
  const modelRef = useRef();

  // Rotate the car slightly for better view
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Apply color customization to paint material
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          // Look for paint material specifically
          if (child.material.name && child.material.name.includes("Paint")) {
            child.material.color.setHex(color.replace("#", "0x"));
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [color]);

  return (
    <group ref={groupRef}>
      <CarWithCustomRims ref={modelRef} selectedRim={rims} />
    </group>
  );
}

// Scene Component
function Scene({ color, rims, grill }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Car Model */}
      <CustomizableCarModel color={color} rims={rims} grill={grill} />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Ground Shadow */}
      <ContactShadows
        opacity={0.4}
        scale={10}
        blur={1}
        far={10}
        resolution={256}
        color="#000000"
      />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main Component
export default function GltCarViewer({ model, color, rims, grill }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5, 3, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <Scene color={color} rims={rims} grill={grill} />
      </Canvas>
    </div>
  );
}
