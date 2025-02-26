import { CSSProperties } from "react";
import { motion } from "motion/react";

interface SeedDisplayProps {
  image: string | null;
  style?: CSSProperties;
}

const SeedDisplay: React.FC<SeedDisplayProps> = ({ image, style }) => {
  if (!image) return null;

  return (
    <motion.img
      src = {image}
      initial = {{ opacity: 0 }}
      animate = {{ opacity: 1 }}
      exit = {{ opacity: 0 }}
      transition = {{ duration: 0.5 }}
      style = {style}
    />
  );
};

export default SeedDisplay;
