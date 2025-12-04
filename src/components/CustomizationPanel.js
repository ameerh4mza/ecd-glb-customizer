"use client";

import { useState } from "react";
import { Check, Circle, Square, Star, Hexagon } from "lucide-react";

const rimOptions = [
  {
    id: "default",
    name: "Original Rims",
    description: "Factory default wheels",
    icon: Square,
    price: "Standard",
  },
  {
    id: "rim1",
    name: "Rotiform IHR",
    description: "Lightweight alloy wheels",
    icon: Circle,
    price: "+$1,200",
  },
  {
    id: "rim2",
    name: "Vörsteiner VFE405",
    description: "Premium luxury wheels",
    icon: Star,
    price: "+$2,500",
  },
  // {
  //   id: "rim3",
  //   name: "Vörsteiner VFE 401",
  //   description: "High-performance wheels",
  //   icon: Hexagon,
  //   price: "+$3,800",
  // },
];

// const grillOptions = [
//   {
//     id: "chrome",
//     name: "Chrome Grill",
//     description: "Polished chrome finish",
//     pattern: "horizontal",
//     price: "+$800",
//   },
//   {
//     id: "black",
//     name: "Matte Black",
//     description: "Stealth black finish",
//     pattern: "mesh",
//     price: "+$600",
//   },
//   {
//     id: "carbon",
//     name: "Carbon Fiber",
//     description: "Lightweight carbon fiber",
//     pattern: "diamond",
//     price: "+$1,500",
//   },
//   {
//     id: "sport",
//     name: "Sport Grill",
//     description: "Aggressive sport design",
//     pattern: "vertical",
//     price: "+$1,200",
//   },
// ];

const GrillPattern = ({ pattern, isSelected }) => {
  const baseClasses = `w-8 h-6 rounded border-2 transition-colors ${
    isSelected ? "border-blue-400" : "border-gray-600"
  }`;

  switch (pattern) {
    case "horizontal":
      return (
        <div
          className={
            baseClasses + " bg-gradient-to-b from-gray-300 to-gray-600"
          }
        >
          <div className="h-full w-full bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_3px)]"></div>
        </div>
      );
    case "mesh":
      return (
        <div className={baseClasses + " bg-gray-800"}>
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,transparent_1px,rgba(255,255,255,0.2)_1px)]"></div>
        </div>
      );
    case "diamond":
      return (
        <div
          className={baseClasses + " bg-gradient-to-br from-gray-700 to-black"}
        >
          <div className="h-full w-full bg-[conic-gradient(from_45deg,transparent,rgba(255,255,255,0.1),transparent)]"></div>
        </div>
      );
    case "vertical":
      return (
        <div
          className={
            baseClasses + " bg-gradient-to-r from-gray-400 to-gray-700"
          }
        >
          <div className="h-full w-full bg-[repeating-linear-gradient(to_right,transparent_0px,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_3px)]"></div>
        </div>
      );
    default:
      return <div className={baseClasses + " bg-gray-600"}></div>;
  }
};

export default function CustomizationPanel({
  selectedRims,
  selectedGrill,
  onRimsChange,
  onGrillChange,
}) {
  const [activeTab, setActiveTab] = useState("rims");

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex bg-gray-800/50 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("rims")}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === "rims"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Rims
        </button>
        {/* <button
          onClick={() => setActiveTab("grills")}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === "grills"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Grills
        </button> */}
      </div>

      {/* Rims Section */}
      {activeTab === "rims" && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Wheel Options</h4>
          {rimOptions.map((rim) => {
            const IconComponent = rim.icon;
            return (
              <button
                key={rim.id}
                onClick={() => onRimsChange(rim.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  selectedRims === rim.id
                    ? "border-blue-400 bg-blue-500/10"
                    : "border-gray-600 bg-gray-800/30 hover:border-gray-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedRims === rim.id ? "bg-blue-500" : "bg-gray-700"
                    }`}
                  >
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{rim.name}</span>
                      {selectedRims === rim.id && (
                        <Check className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {rim.description}
                    </p>
                    <p className="text-xs text-blue-400 mt-1">{rim.price}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Grills Section */}
      {/* {activeTab === "grills" && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Grill Options</h4>
          {grillOptions.map((grill) => (
            <button
              key={grill.id}
              onClick={() => onGrillChange(grill.id)}
              className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                selectedGrill === grill.id
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-gray-600 bg-gray-800/30 hover:border-gray-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <GrillPattern
                  pattern={grill.pattern}
                  isSelected={selectedGrill === grill.id}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{grill.name}</span>
                    {selectedGrill === grill.id && (
                      <Check className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {grill.description}
                  </p>
                  <p className="text-xs text-blue-400 mt-1">{grill.price}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )} */}

      {/* Summary */}
      <div className="mt-6 p-3 bg-gray-800/50 rounded-lg">
        <h5 className="text-sm font-medium text-white mb-2">
          Current Selection
        </h5>
        <div className="space-y-1 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>Rims:</span>
            <span className="text-white">
              {rimOptions.find((r) => r.id === selectedRims)?.name}
            </span>
          </div>
          {/* <div className="flex justify-between">
            <span>Grill:</span>
            <span className="text-white">
              {grillOptions.find((g) => g.id === selectedGrill)?.name}
            </span>
          </div> */}
        </div>
        <div className="mt-3 pt-2 border-t border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Total Upgrades:</span>
            <span className="text-blue-400 font-medium">
              {(() => {
                const rimPrice = rimOptions.find(
                  (r) => r.id === selectedRims
                )?.price;
                // const grillPrice = grillOptions.find(
                //   (g) => g.id === selectedGrill
                // )?.price;
                if (rimPrice === "Standard") {
                  return "Standard";
                } else if (rimPrice?.includes("+")) {
                  return rimPrice;
                }
                return "Standard";
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
