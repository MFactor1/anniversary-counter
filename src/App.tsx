import { useEffect, useState } from 'react'
import './App.css'
import textBG from './assets/StardewTextBG.png'
import hailey from './assets/Hailey.png'
import matthew from './assets/Matthew.png'
import haileyBlush from './assets/HaileyBlush.png'
import matthewBlush from './assets/MattBlush.png'
import StardewTextBox from './assets/StardewTextBox.png'
import StardewPage from './assets/StardewPage.png'

import useCountdown from './utils/countdown'
import Character from './components/Character'
import SeedCounters from './components/SeedCounters'
import TogetherSince from './components/TogetherSince'
import useIsMobile from './components/IsMobile'
import {body} from 'motion/react-client'

const backendURL = import.meta.env.VITE_BACKEND_URL || "ws://localhost:3001/";

console.log(backendURL);

let ws: WebSocket;
let seedsMattInc: number[] = new Array(9).fill(0);
let seedsHailInc: number[] = new Array(9).fill(0);
let seedUpdate: boolean = false;

function App() {
  const [seedsMatt, setSeedsMatt] = useState<number[]>(Array(9).fill(0));
  const [seedsHail, setSeedsHail] = useState<number[]>(Array(9).fill(0));
  const [seedsValid, setSeedsValid] = useState(false);
  const [loading, setLoading] = useState("");
  const { days, hours, minutes, seconds } = useCountdown(7, 1, 0, 0);
  const [isAnniversary, setIsAnniversary] = useState(false);
  const isMobile = useIsMobile();

  const updateLoading = () => {
      setLoading((prevLoading) => {
      if (prevLoading == '') {
        return '.';
      } else if (prevLoading == '.') {
        return '..';
      } else if (prevLoading == '..') {
        return '...';
      } else {
        return '';
      }
    })
  }

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

  const createWebsocket = () => {
    if (!ws) {
      console.log("creating websocket");
      ws = new WebSocket(backendURL);
    }
    if (ws.readyState === WebSocket.CLOSED) {
      console.log("recreating websocket");
      ws = new WebSocket(backendURL);
    }
    ws.onopen = () => {
      console.log("Connected to websocket server");
      console.log("ws:", ws);
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("recieved message:", data)

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
        setSeedsValid(true);
      }
    }

    ws.onclose = (event) => {
      console.log("Websocket closed:", event.code, event.reason);
      setTimeout(createWebsocket, 5000);
    }
  }

  useEffect(() => {
    createWebsocket()

    const serverUpdate = () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        if (seedUpdate) {
          ws.send(JSON.stringify({ type: "increment", matt: seedsMattInc, hail: seedsHailInc }));
          seedUpdate = false;
          seedsMattInc.fill(0);
          seedsHailInc.fill(0);
        }
      } else {
        console.log("No connection to backend server");
        setSeedsValid(false);
      }
    }

    const updateInterval = setInterval(serverUpdate, 1000);
    const loadingInterval = setInterval(updateLoading, 1000);
    return () => {
      clearInterval(updateInterval);
      clearInterval(loadingInterval);
      if (ws.readyState == 1) {
        ws.close();
      }
    }
  }, []);

  useEffect(() => {
    setIsAnniversary(days == 0 && hours == 0 && minutes == 0 && seconds == 0);
  }, [days, hours, minutes, seconds]);

  return (
    <>
      <div className='headText'>
        <div className='textBGImg'>
          <img src={textBG} style={{ width: isMobile ? '90vw' : '55vh' }}/>
        </div>
        <div className='textOnImage'>
          <h1 className='title1' style={{ fontSize: isMobile ? '10vw' : '6vh' }}>
            Anniversary Counter
          </h1>
        </div>
      </div>
      <div className='headText'>
        <div className='textBGImg'>
          <img src={textBG} style={{ width: isMobile ? '70vw' : '32vh' }}/>
        </div>
        <div className='textOnImage'>
          <h1 className='title2' style={{ fontSize: isMobile ? '7.6vw' : '3.5vh' }}>
            Matthew @ Hailey
          </h1>
        </div>
      </div>
      {seedsValid || isMobile ? null :
        <div className='loadingText' style={{ marginTop: "4vh" }}>
          <h1 className='title3'>
            Connecting to backend server{loading}
          </h1>
          <h1 className='title4'>
            This may take up to 2 minutes{loading}
          </h1>
        </div>
      }
      { isMobile ?
        <div className='loadingText' style={{ marginTop: "6vh", width: '100vw' }}>
          <h1 className='title3'>
            Mobile is not currently supported. <br/>
            For the full experience, use a desktop. <br />
            Sorry :(
          </h1>
        </div>
      : null }
      <div className='counter'>
        <p className='counterText' style={{ fontSize: isMobile ? "13vw" : "7vw" }}>
          { isAnniversary ? 'Happy Anniversary!!' : days + 'd, ' + hours + 'h, ' + minutes + 'm, ' + seconds + 's' }
        </p>
      </div>
      <div className='textBGImg' style={{ position: 'absolute', bottom: '7vh', left: "0vw", right: "0vw" }}>
        <img src={StardewTextBox} style={{ height: '24vh', width: '36vh'}}/>
      </div>
      <TogetherSince style = {{ position: "absolute", bottom: "10vh", left: "0vw", right: "0vw" }}/>
      { isMobile ? null :
        <>
          <SeedCounters seeds = {seedsHail} valid = {seedsValid} loading = {loading} style = {{ position: "absolute", right: "3vw", top: "17vh" }}/>
          <SeedCounters seeds = {seedsMatt} valid = {seedsValid} loading = {loading} flipped = {true} style = {{ position: "absolute", left: "3vw", top: "17vh" }}/>
        </>
      }
      { isMobile ? null :
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
      }
    </>
  )
}

export default App
