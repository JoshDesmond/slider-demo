import React from "react";
import { SliderState } from "./Slider";

interface SliderTrackProps {
  state: SliderState;
  children: React.ReactNode;
}

const SliderTrack: React.FC<SliderTrackProps> = ({ state, children }) => {
  // Determine background and border styling based on state
  const getTrackStyling = () => {
    switch (state) {
      case "accepting":
        return "bg-slider-green-light border-slider-green-borderDark";
      case "declining":
        return "bg-slider-red-light border-slider-red-borderDark";
      default:
        // Adding a subtle background color for better visibility in neutral state
        return "bg-transparent border-yellow-400";
    }
  };

  return (
    <div
      className={`relative mx-4 h-full min-h-[128px] w-full max-w-[640px] overflow-hidden border-2 sm:mx-10 sm:w-[calc(100%-5rem)] ${getTrackStyling()}`}
    >
      {children}
    </div>
  );
};

export default SliderTrack;
