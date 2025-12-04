import React from "react";
import { Model as CarModel } from "./Car";
import { Rim1Model } from "./Rim1";
import { Rim2Model } from "./Rim2";
// import { Rim3Model } from "./Rim3";

export function CarWithCustomRims(props) {
  const { selectedRim = "default", ...carProps } = props;

  // Function to render custom rim at specific position with rim-specific scaling
  const renderCustomRim = (position, rotation, key) => {
    // Different scales for each rim to normalize their sizes
    const rimScales = {
      rim1: [0.04, 0.04, 0.04], // Rotiform IHR
      rim2: [0.035, 0.035, 0.035], // Vörsteiner VFE405 (slightly smaller)
      // rim3: [0.045, 0.045, 0.045]  // Vörsteiner VFE 401 (slightly larger)
    };

    const scale = rimScales[selectedRim] || [0.04, 0.04, 0.04];

    switch (selectedRim) {
      case "rim1":
        return (
          <Rim1Model
            key={key}
            position={position}
            rotation={rotation}
            scale={scale}
          />
        );
      case "rim2":
        return (
          <Rim2Model
            key={key}
            position={position}
            rotation={rotation}
            scale={scale}
          />
        );
      // case "rim3":
      //   return (
      //     <Rim3Model
      //       key={key}
      //       position={position}
      //       rotation={rotation}
      //       scale={scale}
      //     />
      //   );
      default:
        return null;
    }
  };

  const showCustomRims = selectedRim && selectedRim !== "default";

  return (
    <group>
      {/* Render the original car with wheels hidden when custom rims are selected */}
      <CarModel {...carProps} hideOriginalWheels={showCustomRims} />

      {/* Render custom rims if selected */}
      {showCustomRims && (
        <group>
          {/* Front Left Wheel */}
          {renderCustomRim(
            [0.8, 0.34, 1.16],
            [0, 1.5, Math.PI / 2],
            "front-left"
          )}

          {/* Front Right Wheel */}
          {renderCustomRim(
            [-0.8, 0.34, 1.16],
            [0, -1.5, -Math.PI / 2],
            "front-right"
          )}

          {/* Rear Left Wheel */}
          {renderCustomRim(
            [0.8, 0.34, -1.31],
            [0, 1.5, Math.PI / 2],
            "rear-left"
          )}

          {/* Rear Right Wheel */}
          {renderCustomRim(
            [-0.8, 0.34, -1.31],
            [0, -1.5, -Math.PI / 2],
            "rear-right"
          )}
        </group>
      )}
    </group>
  );
}
