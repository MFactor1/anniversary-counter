import { useEffect, useState } from 'react'
import './App.css'
import textBG from './assets/StardewTextBG.png'
import hailey from './assets/Hailey.png'
import matthew from './assets/Matthew.png'
import haileyBlush from './assets/HaileyBlush.png'
import matthewBlush from './assets/MattBlush.png'

import useCountdown from './utils/countdown'
import AnimatedImage from './utils/AnimatedImage'
import ImageButton from './utils/ImageButton'

function App() {
  //const { days, hours, minutes, seconds } = useCountdown(7, 1, 0, 0);
  const { days, hours, minutes, seconds } = useCountdown(2, 13, 0, 4);
  const [isAnniversary, setIsAnniversary] = useState(false);

  useEffect(() => {
    setIsAnniversary(days == 0 && hours == 0 && minutes == 0 && seconds == 0);
  }, [days, hours, minutes, seconds]);

  return (
    <>
      <div className='headText'>
        <div className='textBGImg'>
          <img src={textBG} style={{width: '55vh'}}/>
        </div>
        <div className='textOnImage'>
          <h1 className='title1'>
            Anniversary Counter
          </h1>
        </div>
      </div>
      <div className='headText'>
        <div className='textBGImg'>
          <img src={textBG} style={{width: '32vh'}}/>
        </div>
        <div className='textOnImage'>
          <h1 className='title2'>
            Matthew @ Hailey
          </h1>
        </div>
      </div>
      <div className='characters'>
        <ImageButton style = {{ position: "absolute", bottom: "0px", right: "10vw", width: "256px", height: "256px"}}>
          <AnimatedImage
            isAnimating = {isAnniversary}
            baseImage = {hailey}
            secondaryImage= {haileyBlush}
            frequency = {4}
            duration = {0.5}
          />
        </ImageButton>
        <ImageButton style = {{ position: "absolute", bottom: "0px", left: "10vw", width: "256px", height: "256px"}}>
          <AnimatedImage
            isAnimating = {isAnniversary}
            baseImage = {matthew}
            secondaryImage= {matthewBlush}
            frequency = {4}
            duration = {0.5}
          />
        </ImageButton>
      </div>
      <div className='counter'>
        <p className='counterText'>
          { isAnniversary ? 'Happy Anniversary!!' : days + 'd, ' + hours + 'h, ' + minutes + 'm, ' + seconds + 's' }
        </p>
      </div>
    </>
  )
}

export default App
