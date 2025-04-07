import React from "react";
import { SliderState } from "./Slider";
import whiteCheckIcon from "../../assets/StaticAssets/white_check.png";
import whiteCloseIcon from "../../assets/StaticAssets/white_close.png";
import greenCheckIcon from "../../assets/StaticAssets/green_check.png";
import greenCloseIcon from "../../assets/StaticAssets/green_close.png";
import redCloseIcon from "../../assets/StaticAssets/red_close.png";
import redCheckIcon from "../../assets/StaticAssets/red_check.png";

interface SliderDisplayProps {
  state: SliderState;
}

const SliderDisplay: React.FC<SliderDisplayProps> = ({ state }) => {
  // Get icons and text color based on state
  const getDisplayProps = () => {
    switch (state) {
      case "declining":
        return {
          leftIcon: redCloseIcon,
          rightIcon: redCheckIcon,
          textColor: "text-slider-red-text"
        };
      case "accepting":
        return {
          leftIcon: greenCloseIcon,
          rightIcon: greenCheckIcon,
          textColor: "text-slider-green-text"
        };
      default:
        return {
          leftIcon: whiteCloseIcon,
          rightIcon: whiteCheckIcon,
          textColor: "text-white"
        };
    }
  };

  const { leftIcon, rightIcon, textColor } = getDisplayProps();

  return (
    <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-between px-8">
      {/* Left side - Decline */}
      <div className="flex items-center space-x-2">
        <img src={leftIcon} alt="Decline icon" className="h-6 w-6" />
        <span className={`text-xl font-medium ${textColor}`}>Decline</span>
      </div>

      {/* Right side - Accept */}
      <div className="flex items-center space-x-2">
        <span className={`text-xl font-medium ${textColor}`}>Accept</span>
        <img src={rightIcon} alt="Accept icon" className="h-6 w-6" />
      </div>
    </div>
  );
};

export default SliderDisplay;
