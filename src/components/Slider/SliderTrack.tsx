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
        return {
          background: "bg-gradient-to-b from-slider-green-dark to-slider-green-light",
          border: "border-2 border-slider-green-borderLight"
        };
      case "declining":
        return {
          background: "bg-gradient-to-b from-slider-red-dark to-slider-red-light",
          border: "border-2 border-slider-red-borderLight"
        };
      default:
        return {
          background: "bg-transparent",
          border: "border-2 border-slider-orange-borderLight"
        };
    }
  };

  const styling = getTrackStyling();

  return (
    <div
      className={`relative mx-4 h-full min-h-[128px] w-full max-w-[640px] overflow-hidden rounded-lg sm:mx-10 sm:w-[calc(100%-5rem)] ${styling.background} ${styling.border}`}
    >
      {children}
    </div>
  );
};

export default SliderTrack;
