import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import orangeButton from "../../assets/StaticAssets/orange_button.png";
import greenButton from "../../assets/StaticAssets/green_button.png";
import redButton from "../../assets/StaticAssets/red_button.png";

// Additional margin offset (in pixels) to allow the orb to visually reach the track edges
export const SLIDER_ORB_MARGIN_OFFSET = 0;

interface SliderOrbProps {
  onDrag: (x: number) => void;
  onRelease: () => void;
  maxLeft: number;
  maxRight: number;
}

const SliderOrb: React.FC<SliderOrbProps> = ({
  onDrag,
  onRelease,
  maxLeft,
  maxRight,
}) => {
  const controls = useAnimation();
  const lastX = useRef(0);

  // Get button image based on x position
  const getButtonImage = (x: number) => {
    if (x > 0) return greenButton;
    if (x < 0) return redButton;
    return orangeButton;
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{
        left: maxLeft - SLIDER_ORB_MARGIN_OFFSET,
        right: maxRight + SLIDER_ORB_MARGIN_OFFSET,
      }}
      dragElastic={0.1}
      dragMomentum={false}
      animate={controls}
      onDrag={(_, info) => {
        lastX.current = info.offset.x;
        onDrag(info.offset.x);
      }}
      onDragEnd={async () => {
        await controls.start({
          x: 0,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.5,
            restDelta: 0.001
          }
        });
        onRelease();
      }}
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-grab select-none"
    >
      <motion.img
        src={orangeButton}
        alt="Slider button"
        className="h-16 w-16 select-none pointer-events-none"
        draggable="false"
        whileDrag={{
          scale: 1.1
        }}
      />
    </motion.div>
  );
};

export default SliderOrb;
