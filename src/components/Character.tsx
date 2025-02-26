import { useState, CSSProperties } from 'react';
import ImageButton from '../utils/ImageButton';
import AnimatedImage from '../utils/AnimatedImage';
import SeedDisplay from './SeedDisplay';

import seed1 from '../assets/seed1.png'
import seed2 from '../assets/seed2.png'
import seed3 from '../assets/seed3.png'
import seed4 from '../assets/seed4.png'
import seed5 from '../assets/seed5.png'
import seed6 from '../assets/seed6.png'
import seed7 from '../assets/seed7.png'
import seed8 from '../assets/seed8.png'
import seed9 from '../assets/seed9.png'

const seeds = [seed1, seed2, seed3, seed4, seed5, seed6, seed7, seed8, seed9];

interface CharacterProps {
  isAnniversary: boolean;
  baseImage: string;
  secondaryImage: string;
  style?: CSSProperties;
}

const Character: React.FC<CharacterProps> = ({ isAnniversary, baseImage, secondaryImage, style }) => {
  return (
    <div style = {style}>
      <ImageButton
        style = {{width: "256px", height: "256px"}}
        onClick = {() => console.log("Clicked Character")}
      >
        <AnimatedImage
          isAnimating = {isAnniversary}
          baseImage = {baseImage}
          secondaryImage= {secondaryImage}
          frequency = {4}
          duration = {0.5}
        />
      </ImageButton>
    </div>
  );
};

export default Character;
