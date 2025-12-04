"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const predefinedColors = [
  { name: "Racing Red", color: "#DC2626", category: "Classic" },
  { name: "Midnight Blue", color: "#1E3A8A", category: "Classic" },
  { name: "Forest Green", color: "#166534", category: "Classic" },
  { name: "Pure White", color: "#FFFFFF", category: "Classic" },
  { name: "Jet Black", color: "#000000", category: "Classic" },
  { name: "Silver Metallic", color: "#9CA3AF", category: "Metallic" },
  { name: "Gold Chrome", color: "#D97706", category: "Metallic" },
  { name: "Bronze Metallic", color: "#92400E", category: "Metallic" },
  { name: "Titanium Gray", color: "#4B5563", category: "Metallic" },
  { name: "Pearl White", color: "#F8FAFC", category: "Pearl" },
  { name: "Electric Blue", color: "#3B82F6", category: "Premium" },
  { name: "Neon Green", color: "#22C55E", category: "Premium" },
  { name: "Purple Storm", color: "#8B5CF6", category: "Premium" },
  { name: "Sunset Orange", color: "#EA580C", category: "Premium" },
  { name: "Carbon Fiber", color: "#111827", category: "Special" },
];

const categories = [
  "All",
  "Classic",
  "Metallic",
  "Pearl",
  "Premium",
  "Special",
];

export default function ColorPicker({ selectedColor, onColorChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [customColor, setCustomColor] = useState("#FF0000");

  const filteredColors =
    selectedCategory === "All"
      ? predefinedColors
      : predefinedColors.filter((item) => item.category === selectedCategory);

  const handleColorSelect = (color) => {
    onColorChange(color);
  };

  const handleCustomColorChange = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    onColorChange(color);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-white font-medium">Paint Colors</h4>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-md text-xs transition-colors ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Predefined Colors Grid */}
      <div className="grid grid-cols-4 gap-2">
        {filteredColors.map((colorItem) => (
          <button
            key={colorItem.name}
            onClick={() => handleColorSelect(colorItem.color)}
            className={`relative aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
              selectedColor === colorItem.color
                ? "border-blue-400 ring-2 ring-blue-400/50"
                : "border-gray-600 hover:border-gray-400"
            }`}
            style={{ backgroundColor: colorItem.color }}
            title={colorItem.name}
          >
            {selectedColor === colorItem.color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check
                  className={`h-4 w-4 ${
                    colorItem.color === "#FFFFFF" ||
                    colorItem.color === "#F8FAFC"
                      ? "text-black"
                      : "text-white"
                  }`}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Color Info */}
      <div className="bg-gray-800/50 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg border-2 border-gray-600"
            style={{ backgroundColor: selectedColor }}
          ></div>
          <div>
            <div className="text-white font-medium">
              {predefinedColors.find((c) => c.color === selectedColor)?.name ||
                "Custom Color"}
            </div>
            <div className="text-gray-400 text-sm">
              {selectedColor.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Color Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Custom Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="w-12 h-10 rounded-lg border-2 border-gray-600 bg-transparent cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => handleCustomColorChange(e)}
            placeholder="#FF0000"
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Color Suggestions */}
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-gray-300">
          Popular Combinations
        </h5>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: "Classic", colors: ["#DC2626", "#FFFFFF"] },
            { name: "Sport", colors: ["#000000", "#D97706"] },
            { name: "Luxury", colors: ["#1E3A8A", "#9CA3AF"] },
          ].map((combo) => (
            <button
              key={combo.name}
              onClick={() => handleColorSelect(combo.colors[0])}
              className="flex items-center gap-1 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex">
                {combo.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-gray-600"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-300">{combo.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
