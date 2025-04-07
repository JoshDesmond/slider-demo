import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import orangeButton from "../../assets/StaticAssets/orange_button.png";
import greenButton from "../../assets/StaticAssets/green_button.png";
import redButton from "../../assets/StaticAssets/red_button.png";

// Additional margin offset (in pixels) to allow the orb to visually reach the track edges
export const SLIDER_ORB_MARGIN_OFFSET = 70;

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
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const x = useSpring(0, {
    stiffness: 300,
    damping: 20,
    mass: 1,
    bounce: 0.5
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Add global mouse/touch event listeners when dragging starts
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX.current;
      const newX = Math.max(maxLeft - SLIDER_ORB_MARGIN_OFFSET, Math.min(maxRight + SLIDER_ORB_MARGIN_OFFSET, deltaX));
      x.set(newX);
      onDrag(newX);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      const deltaX = e.touches[0].clientX - startX.current;
      const newX = Math.max(maxLeft - SLIDER_ORB_MARGIN_OFFSET, Math.min(maxRight + SLIDER_ORB_MARGIN_OFFSET, deltaX));
      x.set(newX);
      onDrag(newX);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      // Use spring animation to bounce back to center
      x.set(0);
      onRelease();
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchmove', handleGlobalTouchMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, maxLeft, maxRight, onDrag, onRelease, x]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  // Get button image based on dragging state and position
  const getButtonImage = () => {
    if (!isDragging) return orangeButton;
    
    const currentX = x.get();
    if (currentX > 0) {
      return greenButton;
    } else if (currentX < 0) {
      return redButton;
    } else {
      return orangeButton;
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-grab select-none"
      style={{ x }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img
        src={getButtonImage()}
        alt="Slider button"
        className="h-16 w-16 select-none pointer-events-none"
        draggable="false"
      />
    </motion.div>
  );
};

export default SliderOrb;
