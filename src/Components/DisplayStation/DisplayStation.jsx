import { React, useState, useRef } from "react";
import {onPresetSaveButtonClicked} from "../Presets/Presets"
import {api_test_data} from "../../data/api_test_data"

import "./display-station.css"
import saved_preset from "../../assets/img/heart-solid.png"
import not_saved_preset from "../../assets/img/heart-regular.png"

const  DisplayStation = ({currentStation, onPresetSaveClicked}) => {

/*   let tagWords = (currentStation.tags)
  console.log(tagWords)

  for (let i=0; i<tagWords.length; i++) {
    tagWords[i] = tagWords[i][0].toUpperCase() + tagWords[i].substring(1)
  }

  const tags = tagWords.join(", ") */



  return(
    <div className="display-station">
      <div>
        <img className="display-station__logo" src={currentStation.favicon} alt={currentStation.name}/>
      </div>
      <div className="display-station__info">
        <div>
          {currentStation.name}          
        </div>
        <div>
          tags
        </div>
        <div>
          <img
            className= "display-station__hearticon"
            src={not_saved_preset}
            alt = "Station not a preset"
            onClick={onPresetSaveClicked}
            />
        </div>

      </div>
      
      
    </div>
  )
}

export default DisplayStation