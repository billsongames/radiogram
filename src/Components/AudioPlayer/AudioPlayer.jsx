import { React, useState, useRef } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import { api_test_data } from "../../data/api_test_data";

import DisplayStation from "./DisplayStation";
import Controls from './Controls';

import "./audio-player.css"

const api = new RadioBrowserApi('RadioPlayer')

/*
const stations = await api.searchStations({
  countryCode: 'US',
  limit: 10,
  offset: 0 // this is the default - can be omited
})
*/

function AudioPlayer() {  

  const [currentStation, setStation] = useState(api_test_data[5])

  const audioRef = useRef()

  
  return(
    <div className="audio-player">
      <div className="inner">

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