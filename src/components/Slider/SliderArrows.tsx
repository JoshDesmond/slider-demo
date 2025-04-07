import React from "react";
import Lottie from "lottie-react";
import { SliderState } from "./Slider";

// Import animations
import glowingLeftArrowsAnimation from "../../assets/AnimatedAssets/glowing_left_arrows.json";
import glowingRightArrowsAnimation from "../../assets/AnimatedAssets/glowing_right_arrows.json";

// Import static assets
import orangeLeftArrows from "../../assets/StaticAssets/orange_left_arrows.png";
import orangeRightArrows from "../../assets/StaticAssets/orange_right_arrows.png";
import greenLeftArrows from "../../assets/StaticAssets/green_left_arrows.png";
import greenRightArrows from "../../assets/StaticAssets/green_right_arrows.png";
import redLeftArrows from "../../assets/StaticAssets/red_left_arrows.png";
import redRightArrows from "../../assets/StaticAssets/red_right_arrows.png";

interface SliderArrowsProps {
  state: SliderState;
}

const SliderArrows: React.FC<SliderArrowsProps> = ({ state }) => {
  // Get the appropriate arrow assets based on state
  const getArrowAssets = () => {
    switch (state) {
      case "accepting":
        return { left: greenLeftArrows, right: greenRightArrows };
      case "declining":
        return { left: redLeftArrows, right: redRightArrows };
      default:
        return { left: orangeLeftArrows, right: orangeRightArrows };
    }
  };

  const { left, right } = getArrowAssets();

  return (
    <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center">
      {/* Left arrow - positioned 150px to the left of center */}
      <div className="absolute left-[calc(50%-150px)]">
        <img src={left} alt="Left arrows" className="h-12 w-12" />
      </div>

      {/* Right arrow - positioned 150px to the right of center */}
      <div className="absolute right-[calc(50%-150px)]">
        <img src={right} alt="Right arrows" className="h-12 w-12" />
      </div>
    </div>
  );
};

export default SliderArrows;
