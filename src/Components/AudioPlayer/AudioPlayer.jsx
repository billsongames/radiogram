import { React, useState, useRef } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import { api_test_data } from "../../data/api_test_data";

import Tuner from "../Tuner/Tuner";
import DisplayStation from "./DisplayStation";
import Controls from './Controls';

import "./audio-player.css"




function AudioPlayer() {  

  const [currentStation, setStation] = useState(api_test_data[5])

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