import { useState, CSSProperties } from 'react';
import { v4 as uuidv4 } from "uuid";
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
  newSeedCallback?: (seed: number) => void;
  style?: CSSProperties;
}

interface SelfDestructSeedProps {
  id: string;
  image: string;
  offset: number;
  remove: (id: string) => void;
}

const SelfDestructSeed: React.FC<SelfDestructSeedProps> = ({ id, image, offset, remove }) => {
  setTimeout(() => remove(id), 1000);

  return (
    <SeedDisplay
      image = {image}
      timeout = {300}
      style = {{ scale: 0.4, position: "absolute", bottom: "100px", left: `${offset}px`}}
    />
  );
};

const Character: React.FC<CharacterProps> = ({ isAnniversary, baseImage, secondaryImage, newSeedCallback, style }) => {
  const [seedComponents, setSeedComponents] = useState<{ id: string, image:string, offset: number }[]>([]);
  const [seedCooldown, setSeedCooldown] = useState(false);

  function randInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function addSeed() {
    if (!seedCooldown) {
      setSeedCooldown(true);
      setTimeout(() => setSeedCooldown(false), 200);
      const seedNum = randInt(seeds.length)
      const newSeed = { id: uuidv4(), image: seeds[seedNum], offset: randInt(100) - 50 };
      if (newSeedCallback) newSeedCallback(seedNum);
      setSeedComponents((prev) => [...prev, newSeed]);
    }
  }

  function removeSeed(id: string) {
    setSeedComponents((prev) => prev.filter((seedComp) => seedComp.id !== id));
  }

  return (
    <div style = {style}>
      {seedComponents.map((seedComp) => (
        <SelfDestructSeed
          key = {seedComp.id}
          id = {seedComp.id}
          image = {seedComp.image}
          offset = {seedComp.offset}
          remove = {removeSeed}
        />
      ))}
      <ImageButton
        style = {{width: "256px", height: "256px"}}
        onClick = {() => addSeed()}
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
