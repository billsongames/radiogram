import { React, useState, useEffect, useRef } from "react";

import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5"

import "./controls.css"


function Controls({ togglePlayPause, isPlaying }) {
 
  return(
    <div className="controls">
      <div className="control-buttons">

      {isPlaying ? (
        <button
          onClick={() => togglePlayPause(false)}>
          <IoPauseSharp />
        </button>
        ) :
      (
        <button
          onClick={() => togglePlayPause(true)}>
          <IoPlaySharp />
        </button>
        
      )}

      </div>
    </div>  
  )
}

export default Controls