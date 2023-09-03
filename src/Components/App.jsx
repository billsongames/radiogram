import { React, useState}  from 'react';
import { RadioBrowserApi } from "radio-browser-api";

//import './App.css';

import RadioPlayer from './RadioPlayer/RadioPlayer';
import Tuner from './Tuner/Tuner';

import radio_antenna from "../assets/img/radio_antenna.png"
import tuning_static from "../assets/audio/tuning-radio-7150.mp3"
import white_logo from "../assets/img/white.png"

const api = new RadioBrowserApi('My Radio App')
const no_image = "./no_image_available.png"

const staticPlayer = new Audio(tuning_static)
staticPlayer.loop=(true)

let staticIsPlaying = false




const App = () =>  {

  const [currentStation, setCurrentStation] = useState(
    {
      name: "Select a station...",
      favicon: white_logo
    })
  const [newStation, setNewStation] = useState([])

  const  handleStationLogoClick = event => {

    if (event.target.name === currentStation.name){
      return
    } else {
        staticPlayer.play()
        staticIsPlaying = true

        setNewStation({
          name: event.target.name,
          favicon: event.target.src,
          urlResolved: event.target.id
        })

        setCurrentStation({
          name: "Tuning...",
          favicon : radio_antenna,
          urlResolved: event.target.id
        })
      }
  }

  const handleStationTuned = () => {
    staticPlayer.pause()
    staticIsPlaying = false
    setCurrentStation(newStation)
    }


  const handleSearchRequest = (searchQuery) => {
    alert(searchQuery)
  }
  




  return (
    <>
      <Tuner
        onStationLogoClick = {handleStationLogoClick}
//        onStationSearch = {handleSearchRequest}
      >
      </Tuner>
      <RadioPlayer
        currentStation = {currentStation}
        onStationTuned = {handleStationTuned}
      >
      </RadioPlayer>
    </>
  );
}

export default App