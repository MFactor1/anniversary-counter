import { CSSProperties } from 'react'
import { motion } from 'motion/react'

interface ImageButtonProps {
  children?: React.ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}

const ImageButton: React.FC<ImageButtonProps> = ({ children, style, onClick }) => {
  return (
    <motion.div
      whileHover = {{
        scale: 1.05,
        originY: 0,
        transition: { duration: 0.3 },
      }}
      onClick = {onClick}
      whileTap = {{ scale: 1.06, y: -10, transition: { duration: 0.05 } }}
      style = {style}
    >
      {children}
    </motion.div>
  );
}

export default ImageButton;
