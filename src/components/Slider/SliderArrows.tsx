import React, { useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
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

type ArrowAssets = {
  left: string | typeof glowingLeftArrowsAnimation;
  right: string | typeof glowingRightArrowsAnimation;
  useLottie: boolean;
};

// Component to preload all assets
const PreloadAssets: React.FC = () => {
  useEffect(() => {
    // Preload static images
    const images = [
      orangeLeftArrows,
      orangeRightArrows,
      greenLeftArrows,
      greenRightArrows,
      redLeftArrows,
      redRightArrows,
    ];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Preload Lottie animations
    const lottieAnimations = [
      glowingLeftArrowsAnimation,
      glowingRightArrowsAnimation,
    ];
  }, []);

  return null;
};

const SliderArrows: React.FC<SliderArrowsProps> = ({ state }) => {
  // Get the appropriate arrow assets based on state
  const getArrowAssets = (): ArrowAssets => {
    switch (state) {
      case "accepting":
        return { left: greenLeftArrows, right: greenRightArrows, useLottie: false };
      case "declining":
        return { left: redLeftArrows, right: redRightArrows, useLottie: false };
      default:
        return { 
          left: glowingLeftArrowsAnimation, 
          right: glowingRightArrowsAnimation,
          useLottie: true 
        };
    }
  };

  const { left, right, useLottie } = getArrowAssets();

  return (
    <>
      <PreloadAssets />
      <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center">
        {/* Left arrow - positioned 150px to the left of center */}
        <div className="absolute left-[calc(50%-150px)]">
          {useLottie ? (
            <Lottie animationData={left} loop={true} className="h-12 w-12" />
          ) : (
            <img src={left as string} alt="Left arrows" className="h-12 w-12" />
          )}
        </div>

        {/* Right arrow - positioned 150px to the right of center */}
        <div className="absolute right-[calc(50%-150px)]">
          {useLottie ? (
            <Lottie animationData={right} loop={true} className="h-12 w-12" />
          ) : (
            <img src={right as string} alt="Right arrows" className="h-12 w-12" />
          )}
        </div>
      </div>
    </>
  );
};

export default SliderArrows;
