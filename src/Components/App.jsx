import { React, useState}  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RadioBrowserApi } from "radio-browser-api";

import Header from './Header/Header';
import Tuner from './Tuner/Tuner';
import SavedStations from './Header/SavedStations';
import RadioPlayer from './RadioPlayer/RadioPlayer';


import radio_antenna from "../assets/img/radio_antenna.png"
import tuning_static from "../assets/audio/tuning-radio-7150.mp3"
import white_logo from "../assets/img/white.png"

import './App.css';
import Login from './Header/Login';


const staticPlayer = new Audio(tuning_static)
staticPlayer.loop=(true)

let staticIsPlaying = false




const App = () =>  {

  const [userID, setUserID] = useState("")

  const handleLogin = (response) => {
    setUserID(response.id)
  }

  const handleLogout = () => {
    window.FB.logout()
    setUserID("")
  }

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
    <div className='App'>
      <div className="top-section">
        <Header
          userID={userID}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleStationLogoClick={handleStationLogoClick}
        />
        <Tuner onStationLogoClick = {handleStationLogoClick}/>
        <RadioPlayer
          currentStation = {currentStation}
          onStationTuned = {handleStationTuned}
        />
        {userID
        ?
        <div className="saved-stations__title">
          PRESETS
        </div>
        :
        <></>          
        }
      </div>

        {userID
        ?
        <SavedStations onStationLogoClick={handleStationLogoClick}/>
        :
        <></>
        }
    </div>
  );
}

export default App