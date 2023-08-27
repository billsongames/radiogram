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




function RadioPlayer ({ currentStation, onStationTuned }) {

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

/*           customIcons={{
            play: IoPlaySharp,
            pause: IoPauseSharp
          }} */
          
          layout = "stacked-reverse"
          showSkipControls = {false}          
          showJumpControls = {false}
          showDownloadProgress = {false}
          showFilledProgress = {false}
          showFilledVolume = {false}
          customControlsSection={[
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.VOLUME_CONTROLS,
            ]}
          customProgressBarSection = {[]}

          onPlaying = {onStationTuned}

        />
        
      </div>  
    </div>  
  )
}

export default RadioPlayer