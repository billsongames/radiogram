import { React, useState, useRef } from "react";

import "./display-station.css"

function DisplayStation({currentStation}) {
  return(
    <div className="display-station__info">
      <img className="display-station__logo" src={currentStation.favicon} alt={currentStation.name}/>
      <h2>{currentStation.name}</h2>
    </div>
  )
}

export default DisplayStation