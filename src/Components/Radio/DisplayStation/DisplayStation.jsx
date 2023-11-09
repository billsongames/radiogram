import { React, useState, useEffect } from "react";

import { IconContext } from "react-icons";
import { BsHeartFill, BsHeart } from "react-icons/bs";

import "./display-station.css"


const  DisplayStation = ({tuned, userID, currentStation, onPresetSaveClicked, onPresetRemoveClicked, presets}) => {
  const [alreadyPreset, setAlreadyPreset] = useState(0)

  useEffect(() => {
    setAlreadyPreset(presets.findIndex(station => 
      station.id === currentStation.id))
  },[currentStation.id, presets])

  let save_info_jsx

  if (userID && tuned === true && alreadyPreset === -1) {
    save_info_jsx = (
      <IconContext.Provider value={{ color: "red", size: "36px" }}>
        <BsHeart
//          id={currentStation.id}
          className= "display-station__hearticon"
          alt = "Station not saved as preset"
          onClick={onPresetSaveClicked}
        />
      </IconContext.Provider>
    )
  } else if (userID && tuned === true && alreadyPreset >= 0) {
    save_info_jsx = (
      <IconContext.Provider value={{ color: "red", size: "36px"}}>
        <BsHeartFill
          id={currentStation.id}
          className= "display-station__hearticon"
          alt = "Station saved as preset"
          onClick={onPresetRemoveClicked}
        />
      </IconContext.Provider>
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
        <div className="save_info">
          {save_info_jsx}
        </div>
      </div>      
    </div>
  )
}

export default DisplayStation