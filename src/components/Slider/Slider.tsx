import { useState } from "react";
import SliderTrack from "./SliderTrack.tsx";
import SliderOrb, { SLIDER_ORB_MARGIN_OFFSET } from "./SliderOrb.tsx";
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
  const [currentX, setCurrentX] = useState(0);

  // Constants for drag limits
  const MAX_DRAG_DISTANCE = 200; // pixels
  const maxLeft = -MAX_DRAG_DISTANCE;
  const maxRight = MAX_DRAG_DISTANCE;

  // Handle orb drag
  const handleOrbDrag = (x: number) => {
    setCurrentX(x);
    // Only update visual state during drag
    if (x > 0) {
      setSliderState("accepting");
    } else if (x < 0) {
      setSliderState("declining");
    } else {
      setSliderState("neutral");
    }
  };

  // Handle orb release
  const handleOrbRelease = () => {
    // Only trigger actions if the orb is at the extended extremes
    if (currentX >= maxRight + SLIDER_ORB_MARGIN_OFFSET * 0.95) {
      onAccept?.();
    } else if (currentX <= maxLeft - SLIDER_ORB_MARGIN_OFFSET * 0.95) {
      onDecline?.();
    }
    // Reset to neutral state
    setSliderState("neutral");
    setCurrentX(0);
  };

  return (
    <SliderTrack state={sliderState}>
      <SliderDisplay state={sliderState} />
      {/*<SliderGlow visible={sliderState === "neutral"} />*/}
      <SliderArrows state={sliderState} />
      <SliderOrb
        onDrag={handleOrbDrag}
        onRelease={handleOrbRelease}
        maxLeft={maxLeft}
        maxRight={maxRight}
      />
    </SliderTrack>
  );
};

export default Slider;
