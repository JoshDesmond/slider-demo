import React, { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import orangeButton from "../../assets/StaticAssets/orange_button.png";
import greenButton from "../../assets/StaticAssets/green_button.png";
import redButton from "../../assets/StaticAssets/red_button.png";
import { SliderState } from "./Slider";

/**
 * Configuration for the slider orb component.
 * 
 * The component uses two distinct size concepts:
 * - buttonSize: The actual clickable/interactive area (122x122px)
 * - imageSize: The full visual size including glow effects (265x228px)
 * 
 * The dragDistance determines how far the orb can be dragged left/right
 * The actionThreshold determines what percentage of dragDistance is needed to trigger an action
 */
const ORB_CONFIG = {
  buttonSize: 122,
  imageWidth: 265,
  imageHeight: 228,
  dragDistance: 200,
  actionThreshold: 0.9
} as const;

/**
 * Animation configuration for the spring animation when returning to center
 */
const SPRING_CONFIG = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.5,
  restDelta: 0.001
} as const;

interface SliderOrbProps {
  onStateChange: (state: SliderState) => void;
  onActionComplete: (state: SliderState) => void;
}

/**
 * SliderOrb Component
 * 
 * A draggable orb component that can be pulled left or right to trigger actions.
 * The component has several key implementation details:
 * 
 * 1. Visual vs Interactive Area:
 *    - The clickable area is a 122x122px circle (buttonSize)
 *    - The visual element is a 265x228px image that extends beyond the clickable area
 *    - This allows for glow effects to visually extend beyond the track while keeping
 *      the interaction area contained
 * 
 * 2. State Management:
 *    - Uses lastX ref to track the final position after drag
 *    - Determines state based on x position (left = declining, right = accepting)
 *    - Triggers action when dragged beyond threshold
 * 
 * 3. Animation:
 *    - Uses Framer Motion for smooth dragging and spring animations
 *    - Returns to center with spring physics after drag ends
 *    - Scales up slightly during drag for better feedback
 */
const SliderOrb: React.FC<SliderOrbProps> = ({
  onStateChange,
  onActionComplete,
}) => {
  const controls = useAnimation();
  const lastX = useRef(0);
  const [currentState, setCurrentState] = useState<SliderState>("neutral");

  /**
   * Determines which button image to display based on current state
   */
  const getButtonImage = (state: SliderState) => {
    if (state === "accepting") return greenButton;
    if (state === "declining") return redButton;
    return orangeButton;
  };

  /**
   * Determines the slider state based on x position
   */
  const getSliderState = (x: number): SliderState => {
    if (x > 0) return "accepting";
    if (x < 0) return "declining";
    return "neutral";
  };

  /**
   * Handles the end of a drag operation
   * - Checks if drag distance exceeded threshold
   * - Triggers appropriate action if threshold met
   * - Returns orb to center with spring animation
   */
  const handleDragEnd = async () => {
    // Set state to neutral immediately when drag ends
    setCurrentState("neutral");
    onStateChange("neutral");
    
    const finalState = getSliderState(lastX.current);
    const threshold = ORB_CONFIG.dragDistance * ORB_CONFIG.actionThreshold;

    if (Math.abs(lastX.current) >= threshold) {
      onActionComplete(finalState);
    }

    await controls.start({
      x: 0,
      transition: SPRING_CONFIG
    });
    lastX.current = 0;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ minWidth: ORB_CONFIG.buttonSize }}>
        <motion.div
          className="cursor-grab"
          style={{
            width: ORB_CONFIG.buttonSize,
            height: ORB_CONFIG.buttonSize,
            flexShrink: 0
          }}
          drag="x"
          dragConstraints={{
            left: -ORB_CONFIG.dragDistance,
            right: ORB_CONFIG.dragDistance,
          }}
          dragElastic={0.1}
          dragMomentum={false}
          animate={controls}
          onDrag={(_, info) => {
            const x = info.offset.x;
            lastX.current = x;
            const newState = getSliderState(x);
            setCurrentState(newState);
            onStateChange(newState);
          }}
          onDragEnd={handleDragEnd}
        >
          {/* Clickable hit area - constrained to buttonSize */}
          <div className="w-full h-full rounded-full bg-transparent" />
          
          {/* Visual element container - sized to full image dimensions */}
          <div className="absolute left-1/2 top-1/2" style={{
            width: ORB_CONFIG.imageWidth,
            height: ORB_CONFIG.imageHeight,
            transform: 'translate(-50%, -50%)'
          }}>
            <motion.img
              src={getButtonImage(currentState)}
              alt="Slider button"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              className="select-none pointer-events-none"
              draggable="false"
              whileDrag={{ scale: 1.1 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SliderOrb;
