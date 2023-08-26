import { React, useState}  from 'react';
import { RadioBrowserApi } from "radio-browser-api";
import logo from '../logo.svg';
//import './App.css';

import RadioPlayer from './RadioPlayer/RadioPlayer';
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

  const handleSearchRequest = (searchQuery) => {
    alert(searchQuery)
  }


  return (
    <>
      <Tuner
        onStationLogoClick = {handleStationLogoClick}
        onStationSearch = {handleSearchRequest}>
      </Tuner>
      <RadioPlayer
        currentStation = {currentStation}>
      </RadioPlayer>
    </>
  );
}

export default App;
