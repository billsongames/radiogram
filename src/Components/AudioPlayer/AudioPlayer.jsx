import { React, useState, useRef } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import { api_test_data } from "../../data/api_test_data";

import Tuner from "../Tuner/Tuner";
import DisplayStation from "./DisplayStation";
import Controls from './Controls';

import "./audio-player.css"
import stations from "../../api/api";
import getStations from "../../api/api";




function AudioPlayer( {currentStation, radioPlaying} ) {

  const audioRef = useRef()
  
  return(
    <div className="audio-player">
      <div className="audio-player-inner">
        <DisplayStation
          currentStation={currentStation}
          audioRef = {audioRef}
        />        

        <Controls
          audioRef = {audioRef}
        />
      </div>
    </div>  
  )
}

export default AudioPlayer