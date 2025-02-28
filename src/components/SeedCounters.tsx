import { CSSProperties } from 'react';

import seed1 from '../assets/seed1.png'
import seed2 from '../assets/seed2.png'
import seed3 from '../assets/seed3.png'
import seed4 from '../assets/seed4.png'
import seed5 from '../assets/seed5.png'
import seed6 from '../assets/seed6.png'
import seed7 from '../assets/seed7.png'
import seed8 from '../assets/seed8.png'
import seed9 from '../assets/seed9.png'

interface SeedCountersProps {
  seeds: number[]
  flipped?: boolean
  style?: CSSProperties
}

interface CounterProps {
  image: string
  count: number
  flipped: boolean
  style?: CSSProperties
}

const Counter: React.FC<CounterProps> = ({ image, count, flipped, style }) => {
  return (
    <div style = {{ ...style, display: "flex", justifyContent: flipped ? "left" : "right", alignItems: "center" }}>
      {flipped ? <img src = {image} style = {{ width: "6vh", margin: "0px", filter: "drop-shadow(-0.1rem 0.1rem 0.25rem black)" }} /> : null}
      <h1 className='seedCount' style = {{ margin: "0px" }}>
        {count}
      </h1>
      {flipped ? null : <img src = {image} style = {{ width: "6vh", margin: "0px", filter: "drop-shadow(0.1rem 0.1rem 0.25rem black)" }} />}
    </div>
  );
};

const SeedCounters: React.FC<SeedCountersProps> = ({ seeds, flipped = false, style }) => {
  return (
    <div style = {style}>
      <h1 className='seedCount' style = {{ margin: "0px" }}>
        Total: {seeds.reduce((prev, curr) => prev + curr)}
      </h1>
        <Counter image = {seed1} count = {seeds[0]} flipped = {flipped}/>
        <Counter image = {seed2} count = {seeds[1]} flipped = {flipped}/>
        <Counter image = {seed3} count = {seeds[2]} flipped = {flipped}/>
        <Counter image = {seed4} count = {seeds[3]} flipped = {flipped}/>
        <Counter image = {seed5} count = {seeds[4]} flipped = {flipped}/>
        <Counter image = {seed6} count = {seeds[5]} flipped = {flipped}/>
        <Counter image = {seed7} count = {seeds[6]} flipped = {flipped}/>
        <Counter image = {seed8} count = {seeds[7]} flipped = {flipped}/>
        <Counter image = {seed9} count = {seeds[8]} flipped = {flipped}/>
    </div>
  );
};

export default SeedCounters;
