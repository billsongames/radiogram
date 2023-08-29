import { React, useEffect, useState, useRef } from "react";

import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5"

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import DisplayStation from "../DisplayStation/DisplayStation";


import "./radio-player.css"
import 'react-h5-audio-player/lib/styles.css'




const RadioPlayer = ({ currentStation }) => {

  const {name,favicon,urlResolved} = currentStation

  
  return(
    <div className="radio-player">
      <div className="display-station">
        <DisplayStation
          currentStation={currentStation}
        />
      </div>
      <div className="audioplayer">
        <AudioPlayer
          autoplay = {false}
          src = {currentStation.urlResolved}
          autoPlayAfterSrcChange = {true}

          layout = "stacked-reverse"
          showSkipControls = {false}          
          showJumpControls = {false}
          showDownloadProgress = {false}
          showFilledProgress = {false}
          showFilledVolume = {false}

          customProgressBarSection = {[]}
          customAdditionalControls = {[]}
          customVolumeControls = {[]}
        />
        
      </div>  
    </div>  
  )
}

export default RadioPlayer