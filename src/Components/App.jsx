import { React, useState}  from 'react';
import { RadioBrowserApi } from "radio-browser-api";

//import './App.css';

import RadioPlayer from './RadioPlayer/RadioPlayer';
import Tuner from './Tuner/Tuner';

import {api_test_data} from "../data/api_test_data"

const api = new RadioBrowserApi('My Radio App')
const no_image = "./no_image_available.png"

const staticPlayer = new Audio("./tuning-radio-7150.mp3")
staticPlayer.loop=(true)

let staticIsPlaying = false




const App = () =>  {

  const [currentStation, setCurrentStation] = useState([])
  const [newStation, setNewStation] = useState([])

  const  handleStationLogoClick = event => {
    staticPlayer.play()
    staticIsPlaying = true

    setNewStation({
      name: event.target.name,
      favicon: event.target.src,
      urlResolved: event.target.id
    })

    setCurrentStation({
      name: "Tuning...",
      favicon : "./radio_antenna.png",
      urlResolved: event.target.id
    })
  }

  const handleStationTuned = () => {
    staticPlayer.pause()
    staticIsPlaying = false
    console.log("static off / radio on")
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