"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { TestCarModel } from "./TestCarModel";

// Dynamic Car Model Component
function DynamicCarModel({ url, color, rims, grill, onLoadComplete, onError }) {
  const groupRef = useRef();
  const [carParts, setCarParts] = useState({
    body: [],
    wheels: [],
    grill: [],
    other: [],
  });

  let scene, nodes, materials;

  try {
    const gltfData = useGLTF(url);
    scene = gltfData.scene;
    nodes = gltfData.nodes;
    materials = gltfData.materials;
  } catch (error) {
    console.error("Failed to load GLB model:", error);
    onError?.(error);
    return <TestCarModel color={color} rims={rims} grill={grill} />;
  }

  // Clone the scene to avoid modification of the original
  const clonedScene = useMemo(() => {
    if (scene) {
      const cloned = scene.clone();
      return cloned;
    }
    return null;
  }, [scene]);

  // Identify and categorize car parts
  useEffect(() => {
    if (clonedScene) {
      const parts = { body: [], wheels: [], grill: [], other: [] };

      clonedScene.traverse((child) => {
        if (child.isMesh) {
          const name = child.name.toLowerCase();

          if (
            name.includes("body") ||
            name.includes("chassis") ||
            name.includes("paint") ||
            name.includes("exterior") ||
            name.includes("door") ||
            name.includes("hood") ||
            name.includes("trunk") ||
            name.includes("roof")
          ) {
            parts.body.push(child);
          } else if (
            name.includes("wheel") ||
            name.includes("tire") ||
            name.includes("rim") ||
            name.includes("disc") ||
            name.includes("brake")
          ) {
            parts.wheels.push(child);
          } else if (
            name.includes("grill") ||
            name.includes("grille") ||
            name.includes("bumper")
          ) {
            parts.grill.push(child);
          } else {
            parts.other.push(child);
          }
        }
      });

      setCarParts(parts);
      onLoadComplete?.(parts);
    }
  }, [clonedScene, onLoadComplete]);

  // Apply color customization
  useEffect(() => {
    if (carParts.body.length > 0) {
      carParts.body.forEach((part) => {
        if (part.material) {
          if (part.material.color) {
            part.material.color.setHex(color.replace("#", "0x"));
          }
          part.material.needsUpdate = true;
        }
      });
    }
  }, [color, carParts.body]);

  // Apply rim customization
  useEffect(() => {
    if (carParts.wheels.length > 0) {
      const rimColors = {
        sport: 0x333333,
        luxury: 0xcccccc,
        racing: 0x111111,
        classic: 0x999999,
      };

      const rimColor = rimColors[rims] || rimColors.sport;

      carParts.wheels.forEach((part) => {
        if (part.material && part.name.toLowerCase().includes("rim")) {
          if (part.material.color) {
            part.material.color.setHex(rimColor);
          }
          part.material.needsUpdate = true;
        }
      });
    }
  }, [rims, carParts.wheels]);

  // Apply grill customization
  useEffect(() => {
    if (carParts.grill.length > 0) {
      const grillColors = {
        chrome: 0xcccccc,
        black: 0x111111,
        carbon: 0x333333,
        sport: 0x555555,
      };

      const grillColor = grillColors[grill] || grillColors.chrome;

      carParts.grill.forEach((part) => {
        if (part.material) {
          if (part.material.color) {
            part.material.color.setHex(grillColor);
          }
          part.material.needsUpdate = true;
        }
      });
    }
  }, [grill, carParts.grill]);

  // Rotate the car slowly
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  if (!clonedScene) {
    return <TestCarModel color={color} rims={rims} grill={grill} />;
  }

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Main 3D Scene Component
export default function ThreeJSCarViewer({ model, color, rims, grill }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carParts, setCarParts] = useState(null);
  const [useTestModel, setUseTestModel] = useState(false);

  const handleLoadComplete = (parts) => {
    setCarParts(parts);
    setLoading(false);
    console.log("🚗 Car parts identified:", parts);
  };

  const handleError = (err) => {
    setError(err);
    setLoading(false);
    setUseTestModel(true);
    console.error("❌ Error loading car model, using test model:", err);
  };

  // Auto-switch to test model if GLB file doesn't exist
  useEffect(() => {
    if (model?.glbUrl) {
      setLoading(true);
      setError(null);
      setUseTestModel(false);

      // Check if GLB file exists
      fetch(model.glbUrl, { method: "HEAD" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("GLB file not found");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("GLB file not found, using test model");
          handleError(error);
        });
    } else {
      setUseTestModel(true);
      setLoading(false);
    }
  }, [model]);

  return (
    <div className="w-full h-[600px] relative bg-gray-900 rounded-lg overflow-hidden">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white">Loading 3D Model...</p>
            <p className="text-gray-400 text-sm mt-1">{model?.name}</p>
          </div>
        </div>
      )}

      {/* Test Model Indicator */}
      {useTestModel && (
        <div className="absolute top-16 left-4 bg-yellow-600/80 backdrop-blur-sm rounded-lg p-2 z-10">
          <p className="text-white text-xs">Demo Model (GLB not found)</p>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: [15, 8, 15],
          fov: 50,
        }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {/* Environment */}
        <Environment preset="city" />

        {/* Car Model */}
        {model?.glbUrl && !useTestModel ? (
          <DynamicCarModel
            url={model.glbUrl}
            color={color}
            rims={rims}
            grill={grill}
            onLoadComplete={handleLoadComplete}
            onError={handleError}
          />
        ) : (
          <TestCarModel color={color} rims={rims} grill={grill} />
        )}

        {/* Ground */}
        <ContactShadows
          opacity={0.4}
          scale={30}
          blur={1}
          far={20}
          resolution={256}
          color="#000000"
        />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={0.5}
          minDistance={8}
          maxDistance={50}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* Car Parts Info */}
      {carParts && (
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
          <div className="space-y-1">
            <div>Body Parts: {carParts.body.length}</div>
            <div>Wheel Parts: {carParts.wheels.length}</div>
            <div>Grill Parts: {carParts.grill.length}</div>
            <div>Other Parts: {carParts.other.length}</div>
          </div>
        </div>
      )}
    </div>
  );
}
