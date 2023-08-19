import { React, useState}  from 'react';
import logo from '../logo.svg';
import './App.css';

import AudioPlayer from './AudioPlayer/AudioPlayer';
import DisplayTrack from './AudioPlayer/DisplayStation';
import Controls from './AudioPlayer/Controls';
import Tuner from './Tuner/Tuner';

function App() {
  const [currentStation, setCurrentStation] = useState({
    name: " WVPE HD3 - Blues",
    favicon: "https://cdn-radiotime-logos.tunein.com/s244589d.png",
    urlResolved: "http://live.str3am.com:2240/live"
  })


  const  handleStationLogoClick = event => {
    setCurrentStation({
      name: event.target.name,
      favicon: event.target.src,
      urlResolved: event.target.id
    })
   }

  return (
    <>
      <Tuner onStationLogoClick = {handleStationLogoClick}></Tuner>
      <AudioPlayer currentStation={currentStation}></AudioPlayer>
    </>
  );
}

export default App;
