import { CSSProperties } from 'react'
import { motion } from 'motion/react'

interface ImageButtonProps {
  children?: React.ReactNode;
  style?: CSSProperties;
}

const ImageButton: React.FC<ImageButtonProps> = ({ children, style }) => {
  return (
    <motion.div
      whileHover = {{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      onClick = {() => console.log("clicked")}
      whileTap = {{ scale: 0.85 }}
      style = {style}
    >
      {children}
    </motion.div>
  );
}

export default ImageButton;
