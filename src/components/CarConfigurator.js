"use client";

import { useState, useEffect } from "react";
import { Palette, Settings, RotateCcw, Download } from "lucide-react";
import CarViewer from "./CarViewer";
import ColorPicker from "./ColorPicker";
import CustomizationPanel from "./CustomizationPanel";

export default function CarConfigurator() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Customization state
  const [selectedColor, setSelectedColor] = useState("#ff0000"); // Default red
  const [selectedRims, setSelectedRims] = useState("default");
  const [selectedGrill, setSelectedGrill] = useState("chrome");
  const [activePanel, setActivePanel] = useState("colors");

  useEffect(() => {
    // Initialize with static GLB models
    initializeCarModels();
  }, []);

  const initializeCarModels = () => {
    // Static car models using GLB files
    const staticCarModels = [
      {
        id: "real-car",
        name: "Real Car Model",
        description: "Actual GLB model for testing",
        glbUrl: "/models/car.glb",
        thumbnail: "/images/car-thumb.jpg",
        author: "ECD Auto Design",
        likeCount: 150,
        viewCount: 1200,
      },
      // {
      //   id: "lamborghini-huracan",
      //   name: "Lamborghini Huracán",
      //   description: "Italian supercar with aggressive styling",
      //   glbUrl: "/models/lamborghini-huracan.glb",
      //   thumbnail: "/images/lamborghini-huracan-thumb.jpg",
      //   author: "ECD Auto Design",
      //   likeCount: 89,
      //   viewCount: 856,
      // },
      // {
      //   id: "ferrari-f8",
      //   name: "Ferrari F8 Tributo",
      //   description: "Prancing horse with exceptional performance",
      //   glbUrl: "/models/ferrari-f8.glb",
      //   thumbnail: "/images/ferrari-f8-thumb.jpg",
      //   author: "ECD Auto Design",
      //   likeCount: 203,
      //   viewCount: 1534,
      // },
      // {
      //   id: "bmw-m4",
      //   name: "BMW M4 Competition",
      //   description: "German engineering at its finest",
      //   glbUrl: "/models/bmw-m4.glb",
      //   thumbnail: "/images/bmw-m4-thumb.jpg",
      //   author: "ECD Auto Design",
      //   likeCount: 112,
      //   viewCount: 978,
      // },
    ];

    setModels(staticCarModels);
    setSelectedModel(staticCarModels[0]); // Select first model
    setLoading(false);
  };

  const resetCustomization = () => {
    setSelectedColor("#ff0000");
    setSelectedRims("default");
    setSelectedGrill("chrome");
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white">
            Loading Car Models...
          </h2>
          <p className="text-gray-400 mt-2">
            Please wait while we load the GLB models
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Settings className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={initializeCarModels}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              ECD Car Configurator
            </h1>
            <p className="text-gray-400">Customize your dream car</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetCustomization}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Model Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Select Model
              </h3>
              <div className="space-y-3">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedModel?.id === model.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="font-medium">{model.name}</div>
                    <div className="text-sm opacity-75 mt-1">
                      {model.author}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Panels */}
            <div className="mt-6 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActivePanel("colors")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activePanel === "colors"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <Palette className="h-4 w-4" />
                  Colors
                </button>
                <button
                  onClick={() => setActivePanel("parts")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activePanel === "parts"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Parts
                </button>
              </div>

              {activePanel === "colors" && (
                <ColorPicker
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              )}

              {activePanel === "parts" && (
                <CustomizationPanel
                  selectedRims={selectedRims}
                  selectedGrill={selectedGrill}
                  onRimsChange={setSelectedRims}
                  onGrillChange={setSelectedGrill}
                />
              )}
            </div>
          </div>

          {/* Main Car Viewer */}
          <div className="lg:col-span-3">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              <CarViewer
                model={selectedModel}
                color={selectedColor}
                rims={selectedRims}
                grill={selectedGrill}
              />
            </div>

            {/* Model Info */}
            {selectedModel && (
              <div className="mt-4 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {selectedModel.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {selectedModel.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>By {selectedModel.author}</span>
                  <span>♥ {selectedModel.likeCount || 0}</span>
                  <span>👁 {selectedModel.viewCount || 0}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
