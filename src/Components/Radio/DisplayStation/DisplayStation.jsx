import { React, useState, useEffect } from "react";

import EQ from "./EQ"

import "./display-station.css"
import saved_preset from "../../../assets/img/heart-solid.png"
import not_saved_preset from "../../../assets/img/heart-regular.png"


const  DisplayStation = ({tuned, userID, currentStation, onPresetSaveClicked, onPresetRemoveClicked, presets}) => {
  const [alreadyPreset, setAlreadyPreset] = useState(0)

  const stationInfo = {
    id: currentStation.id,
    name: currentStation.name,
    favicon: currentStation.favicon,
    urlResolved: currentStation.urlResolved,
//    tags: currentStation.tags
  }

  useEffect(() => {
    setAlreadyPreset(presets.findIndex(station => 
      station.id === currentStation.id))
  },[currentStation.id, presets])


  let save_info_jsx

  if (userID && tuned === true && alreadyPreset === -1) {
    save_info_jsx = (
      <img
        className= "display-station__hearticon"
        src={not_saved_preset}
        alt = "Station not a preset"
        onClick={onPresetSaveClicked}
      />
    )
  } else if (userID && tuned === true && alreadyPreset >= 0) {
    save_info_jsx = (
      <img
        id={currentStation.id}
        className= "display-station__hearticon"
        src={saved_preset}
        alt = "Station saved as preset"
//        data-alreadypreset = {currentStation.id}
        onClick={onPresetRemoveClicked}
      />
    )  
  } else if (userID && tuned === false) {
    save_info_jsx = (
      <></>
    )
  } else {
    save_info_jsx = (
      <>Log in to save presets</>
    )
  }





  return(
    <div className="display-station-container">      
      <div>
        <img className="display-station__logo" id={currentStation.id} src={currentStation.favicon} alt={currentStation.name}/>
      </div>
      <div className="display-station__info">
        <div className="display-station__name">
          {currentStation.name}          
        </div>
        

        <div>
          {save_info_jsx}
        </div>

      </div>
      
      
    </div>
  )
}

export default DisplayStation