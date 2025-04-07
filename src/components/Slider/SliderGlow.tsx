import React from "react";
import Lottie from "lottie-react";
import glowingCircleAnimation from "../../assets/AnimatedAssets/glowing_circle.json";

interface SliderGlowProps {
  visible: boolean;
}

const SliderGlow: React.FC<SliderGlowProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Lottie
        animationData={glowingCircleAnimation}
        loop={true}
        autoplay={true}
        className="h-20 w-20" // Placeholder size
      />
    </div>
  );
};

export default SliderGlow;
