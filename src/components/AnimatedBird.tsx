import { useState, useEffect, CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import birdgif from '../assets/bird.gif';

interface AnimatedBirdProps {
  style?: CSSProperties;
}

const AnimatedBird: React.FC<AnimatedBirdProps> = ({style}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(true);
      setTimeout(() => setShow(false), 10000);
    }, 20000);
  }, []);

  return (
    <AnimatePresence>
    <motion.img
      src = {birdgif}
      initial = {{ x: 0 }}
      animate = {{ x: 1920 }}
      transition = {{ duration: 10 }}
    />
    </AnimatePresence>

  );
}
