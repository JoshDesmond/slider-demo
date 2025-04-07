import { useState } from "react";
import SliderTrack from "./SliderTrack.tsx";
import SliderOrb from "./SliderOrb.tsx";
import SliderDisplay from "./SliderDisplay.tsx";
import SliderGlow from "./SliderGlow.tsx";
import SliderArrows from "./SliderArrows.tsx";

// Define the slider states as a type
export type SliderState = "neutral" | "accepting" | "declining";

interface SliderProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export const Slider: React.FC<SliderProps> = ({ onAccept, onDecline }) => {
  // Main state of the slider
  const [sliderState, setSliderState] = useState<SliderState>("neutral");

  // Handle state changes from the orb
  const handleStateChange = (newState: SliderState) => {
    setSliderState(newState);
  };

  // Handle completion of slide action
  const handleActionComplete = (state: SliderState) => {
    if (state === "accepting") {
      onAccept?.();
    } else if (state === "declining") {
      onDecline?.();
    }
    setSliderState("neutral");
  };

  return (
    <SliderTrack state={sliderState}>
      <SliderDisplay state={sliderState} />
      {/*<SliderGlow visible={sliderState === "neutral"} />*/}
      <SliderArrows state={sliderState} />
      <SliderOrb
        onStateChange={handleStateChange}
        onActionComplete={handleActionComplete}
      />
    </SliderTrack>
  );
};

export default Slider;
