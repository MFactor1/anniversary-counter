import { useState, useEffect, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedImageParams {
  isAnimating: boolean;
  baseImage: string;
  secondaryImage: string;
  frequency: number;
  duration: number;
  style?: CSSProperties;
}

const MS: number = 1000; // seconds to ms conversion factor

export default function AnimateImage({ isAnimating, baseImage, secondaryImage, frequency, duration, style }: AnimatedImageParams) {
  const [showSecondary, setShowSecondary] = useState(false);
  const [baseOpacity, setBaseOpacity] = useState(1);
  const [secondaryOpacity, setSecondaryOpacity] = useState(0);
  const [baseZ, setBaseZ] = useState(1);
  const [secondaryZ, setSecondaryZ] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setShowSecondary((prev) => {
          return !prev
        });
      }, frequency*MS);
      return () => clearInterval(interval);
    } else {
      setShowSecondary(false);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (showSecondary) {
      setSecondaryZ(1);
      setBaseZ(0);
      setSecondaryOpacity(1);
      setTimeout(() => setBaseOpacity(0), duration*MS);
    } else {
      setSecondaryZ(0);
      setBaseZ(1);
      setBaseOpacity(1);
      setTimeout(() => setSecondaryOpacity(0), duration*MS);
    }
  }, [showSecondary]);

  return (
    <div style = {style}>
      <AnimatePresence>
        <motion.img
          key = "base"
          animate = {{
            opacity: baseOpacity,
            transition: { duration: duration },
          }}
          src = {baseImage}
          style = {{ width: "256px", height: "256px", position: "absolute", left: "0px", bottom: "0px", zIndex: baseZ, overflow: "hidden"}}
        />
        <motion.img
          key = "secondary"
          animate = {{
            opacity: secondaryOpacity,
            transition: { duration: duration },
          }}
          transition = {{ duration: duration }}
          src = {secondaryImage}
          style = {{ width: "256px", height: "256px", position: "absolute", left: "0px", bottom: "0px", zIndex: secondaryZ, overflow: "hidden"}}
        />
      </AnimatePresence>
    </div>
  );
}
