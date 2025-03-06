import { useEffect, useState } from 'react'
import './App.css'
import textBG from './assets/StardewTextBG.png'
import hailey from './assets/Hailey.png'
import matthew from './assets/Matthew.png'
import haileyBlush from './assets/HaileyBlush.png'
import matthewBlush from './assets/MattBlush.png'

import useCountdown from './utils/countdown'
import Character from './components/Character'
import SeedCounters from './components/SeedCounters'

console.log(import.meta.env.VITE_BACKEND_URL);

const backendURL = import.meta.env.VITE_BACKEND_URL || "ws://localhost:3001/";

console.log(backendURL);

let ws: WebSocket;
let seedsMattInc: number[] = new Array(9).fill(0);
let seedsHailInc: number[] = new Array(9).fill(0);
let seedUpdate: boolean = false;

function App() {
  const [seedsMatt, setSeedsMatt] = useState<number[]>(Array(9).fill(0));
  const [seedsHail, setSeedsHail] = useState<number[]>(Array(9).fill(0));
  const { days, hours, minutes, seconds } = useCountdown(7, 1, 0, 0);
  //const { days, hours, minutes, seconds } = useCountdown(2, 13, 0, 4);
  const [isAnniversary, setIsAnniversary] = useState(false);

  const newSeed = (id: string, seed: number) => {
    if (id == "matthew") {
      seedsMattInc[seed]++;
      seedUpdate = true;
      setSeedsMatt((prev) => prev.map((val, i) => (i === seed ? val + 1 : val)));
    } else if (id == "hailey") {
      seedsHailInc[seed]++;
      seedUpdate = true;
      setSeedsHail((prev) => prev.map((val, i) => (i === seed ? val + 1 : val)));
    }
  };

  useEffect(() => {
    const serverUpdate = () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        if (seedUpdate) {
          ws.send(JSON.stringify({ type: "increment", matt: seedsMattInc, hail: seedsHailInc }));
          seedUpdate = false;
          seedsMattInc.fill(0);
          seedsHailInc.fill(0);
        }
      } else {
        console.log("Socket closed or null");
      }
    }

    const updateInterval = setInterval(serverUpdate, 1000);
    return () => clearInterval(updateInterval);
  }, []);

  useEffect(() => {
    console.log("starting useeffect");
    if (!ws) {
      console.log("creating websocket");
      ws = new WebSocket(backendURL);
    }
    if (ws.readyState == 3) {
      console.log("recreating websocket");
      ws = new WebSocket(backendURL);
    }
    ws.onopen = () => {
      console.log("Connected to websocket server");
      console.log("ws:", ws);
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (!data.type) {
        console.log("Recieved message with no type from redis server");
        return;
      }

      if (data.type === "error") {
        if (data.code && data.message) {
          console.log(`Redis server returned error: ${data.code}: ${data.message}`);
        } else {
          console.log("Redis server returned unknown error");
        }

      } else if (data.type === "seedUpdate") {
        if (!data.matt || !data.hail) {
          console.log("Redis server response lacked matt or hail data");
          return;
        }

        if (!Array.isArray(data.matt) || !Array.isArray(data.hail)) {
          console.log("Redis server returned invalid data format for matt or hail");
          return;
        }

        if (data.matt.length != seedsMatt.length || data.hail.length != seedsHail.length) {
          console.log("Redis server returned invalid data length");
          return;
        }

        for (var i = 0; i < data.matt.length; i++) {
          if (typeof data.matt[i] !== "number") {
            console.log("Redis server returned invalid internal data type");
            return;
          }
          if (typeof data.hail[i] !== "number") {
            console.log("Redis server returned invalid internal data type");
            return;
          }
        }

        let mattTemp: number[] = Array(9);
        let hailTemp: number[] = Array(9);
        for (var i = 0; i < data.matt.length; i++) {
          mattTemp[i] = data.matt[i] + seedsMattInc[i];
          hailTemp[i] = data.hail[i] + seedsHailInc[i];
        }

        setSeedsMatt([...mattTemp]);
        setSeedsHail([...hailTemp]);
      }
    };

    ws.onclose = () => console.log("Disconnected from websocket server");

    return () => {
      console.log("Running cleanup");
      if (ws.readyState == 1) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    setIsAnniversary(days == 0 && hours == 0 && minutes == 0 && seconds == 0);
  }, [days, hours, minutes, seconds]);

  return (
    <>
      <div className='headText'>
        <div className='textBGImg'>
          <img src={textBG} style={{width: '35vw'}}/>
        </div>
        <div className='textOnImage'>
          <h1 className='title1'>
            Anniversary Counter
          </h1>
        </div>
      </div>
      <div className='headText'>
        <div className='textBGImg'>
          <img src={textBG} style={{width: '25vw'}}/>
        </div>
        <div className='textOnImage'>
          <h1 className='title2'>
            Matthew @ Hailey
          </h1>
        </div>
      </div>
      <div className='characters'>
        <Character
          isAnniversary = {isAnniversary}
          baseImage = {hailey}
          secondaryImage = {haileyBlush}
          id = "hailey"
          newSeedCallback = {newSeed}
          style = {{ position: "absolute", bottom: "0px", right: "10vw", width: "256px", height: "256px"}}
        />
        <Character
          isAnniversary = {isAnniversary}
          baseImage = {matthew}
          secondaryImage = {matthewBlush}
          id = "matthew"
          newSeedCallback = {newSeed}
          style = {{ position: "absolute", bottom: "0px", left: "10vw", width: "256px", height: "256px"}}
        />
      </div>
      <div className='counter'>
        <p className='counterText'>
          { isAnniversary ? 'Happy Anniversary!!' : days + 'd, ' + hours + 'h, ' + minutes + 'm, ' + seconds + 's' }
        </p>
      </div>
      <SeedCounters seeds = {seedsHail} style = {{ position: "absolute", bottom: "12vh", right: "3vw" }}/>
      <SeedCounters seeds = {seedsMatt} flipped = {true} style = {{ position: "absolute", bottom: "10vh", left: "3vw" }}/>
    </>
  )
}

export default App
