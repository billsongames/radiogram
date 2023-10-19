import {React} from "react";

import default_station_logo from "../../../assets/img/station_no_logo.png"

import { IconContext } from "react-icons";
import { BsXCircleFill } from "react-icons/bs";

import "./presets.css"


const Presets = ({ presets, onStationLogoClick, onPresetRemoveClicked }) => {

  const SetDefaultSrc = (event) => {
		event.target.src = default_station_logo
	};  


  return(
    <div className='presets-container'>
      <div className="presets__title">
        PRESETS
      </div>
      <div className="presets__grid" >
        {presets.map((station) => (
          <div className='preset__entry' key={station.id} id={station.id}>
            <img
              id={station.id}
              className="preset__logo"
              name={station.name}
              src={station.favicon}
              data-urlresolved={station.urlResolved}
              alt={station.name}           
              draggable="false"
              onClick ={onStationLogoClick}              
              onError={SetDefaultSrc}            
            />
            <div className='preset__name'>
              {station.name.length > 24
              ?
              `${station.name.substring(0,24)}...`
              :
              station.name}
            </div>
            <div>
            <IconContext.Provider value={{ color: "red", size: "20px"}}>
              <BsXCircleFill
                id={station.id}
                className="preset__remove-button"                
                onClick={onPresetRemoveClicked}
              />
            </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



export default Presets
