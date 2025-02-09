import React from 'react';
import { useState } from 'react'
import './App.css'
import textBGL from './assets/TextBGLeft.png'
import textBGR from './assets/TextBGRight.png'
import hailey from './assets/Hailey.png'
import matthew from './assets/Matthew.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='headText'>
        <div className='textBGImg'>
          <img src={textBGL}/>
          <img src={textBGR}/>
        </div>
        <div className='textOnImage'>
          <h1 className='title1'>
            Anniversary Counter
          </h1>
        </div>
      </div>
      <div className='headText'>
        <div className='textBGImg'>
          <img src={textBGL} style={{width: '20vh'}}/>
          <img src={textBGR} style={{width: '20vh'}}/>
        </div>
        <div className='textOnImage'>
          <h2 className='title2'>
            Matthew @ Hailey
          </h2>
        </div>
      </div>
      <div className='characters'>
        <img src={hailey} style={{ position: "absolute", bottom: "0px", right: "10vw", width: "256px", height: "256px" }}/>
        <img src={matthew} style={{ position: "absolute", bottom: "0px", left: "10vw", width: "256px", height: "256px" }}/>
      </div>
    </>
  )
}

export default App
