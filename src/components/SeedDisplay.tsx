import { CSSProperties, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SeedDisplayProps {
  image: string | null;
  timeout: number;
  style?: CSSProperties;
}

const SeedDisplay: React.FC<SeedDisplayProps> = ({ image, timeout, style }) => {
  if (!image) return null;

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
    }, timeout);
  }, [image]);

  return (
    <AnimatePresence>
      {display ?
        <motion.img
          src = {image}
          initial = {{ opacity: 1, y: 20 }}
          animate = {{ opacity: 1, y: -150 }}
          exit = {{ opacity: 0, y: -200}}
          transition = {{ duration: 0.5 }}
          style = {style}
        />
        : null }
    </AnimatePresence>
  );
};

export default SeedDisplay;
