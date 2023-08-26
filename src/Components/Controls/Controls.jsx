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


function Controls({
  isPlaying,
  onPlayPauseClick
}) {
 
  return(
    <div className="controls">
      <div className="control-buttons">

      {isPlaying
      ? 
        <button
          type="button"
          onClick={() => onPlayPauseClick(false)}>
          <IoPauseSharp />
        </button>
        
      : 
        <button
          type="button"
          onClick={() => onPlayPauseClick(true)}>
          <IoPlaySharp />
        </button>        
      }

      </div>
    </div>  
  )
}

export default Controls