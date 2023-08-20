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

  const [radioPlaying, setRadioPlaying] = useState(false)


  const  handleStationLogoClick = event => {
    setCurrentStation({
      name: event.target.name,
      favicon: event.target.src,
      urlResolved: event.target.id
    })
  }

  const handleToggleRadioPlaying = () => {
    setRadioPlaying((prev) => !prev)
  }



  return (
    <>
      <Tuner onStationLogoClick = {handleStationLogoClick}></Tuner>
      <AudioPlayer
        toggleRadioPlaying = {handleToggleRadioPlaying}
        currentStation = {currentStation}
        radioPlaying = {radioPlaying}>
      </AudioPlayer>
    </>
  );
}

export default App;
