import { React, useState, useRef } from "react";

import "./display-station.css"

function DisplayStation({currentStation, audioRef}) {
  return(
    <div className="display_station_info">
      <img className="station-logo-player" src={currentStation.favicon} alt={currentStation.name}/>
      <h2>Station: {currentStation.name}</h2>
      
      <audio
        src={currentStation.urlResolved}
        ref={audioRef}
      />
    </div>
  )
}

export default DisplayStation