import { CSSProperties } from 'react';
import useCountupSeconds from "../utils/countup";

interface TogetherSinceProps {
  style?: CSSProperties
}

const TogetherSince: React.FC<TogetherSinceProps> = ({ style }) => {
  const seconds = useCountupSeconds(2022, 7, 1, 0, 0);

  return (
    <div className='togetherSince' style={{ ...style }}>
      <p className='togetherSinceText'>So far we've made it...<br/>
      {(seconds / 31557600).toFixed(1)} years<br/>
      {(seconds / 86400).toFixed(1)} days<br/>
      {(seconds / 3600).toFixed(1)} hours<br/>
      {(seconds / 60).toFixed(1)} minutes<br/>
      {seconds} seconds</p>
    </div>
  );
}

export default TogetherSince;
