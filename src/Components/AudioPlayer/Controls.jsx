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


function Controls({ audioRef }) {
  const [isPlaying ,setIsPlaying] = useState(false)

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }


  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, audioRef])


  return(
    <div className="controls">
      <div className="control-buttons">
        <button>
          <IoPlaySkipBackSharp />
        </button>
        <button>
          <IoPlayBackSharp />
        </button>

        <button   onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>

        <button>
          <IoPlayForwardSharp />
        </button>
        <button>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
    </div>  
  )
}

export default Controls