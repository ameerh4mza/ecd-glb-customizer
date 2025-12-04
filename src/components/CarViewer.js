"use client";

import { useState, useEffect, useRef } from "react";
import { Maximize2, RotateCw } from "lucide-react";
import GltCarViewer from "./GltCarViewer";

export default function CarViewer({ model, color, rims, grill }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      container?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (!model) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-800/50 rounded-lg">
        <div className="text-center">
          <div className="text-gray-400 mb-2">
            <RotateCw className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-400">Select a car model to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-900 rounded-lg overflow-hidden"
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={toggleFullscreen}
          className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-colors backdrop-blur-sm"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Color Indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-lg p-2">
        <div
          className="w-4 h-4 rounded-full border-2 border-white transition-colors duration-300"
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-white text-sm font-medium">
          {color.toUpperCase()}
        </span>
      </div>

      {/* Customization Info */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-sm rounded-lg p-3">
        <div className="text-white text-sm space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Rims:</span>
            <span className="capitalize font-medium">{rims}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Grill:</span>
            <span className="capitalize font-medium">{grill}</span>
          </div>
        </div>
      </div>

      {/* Three.js Car Viewer */}
      <GltCarViewer model={model} color={color} rims={rims} grill={grill} />
    </div>
  );
}
