import {React, useEffect, useState} from "react";

import { collection, query,  where, getCountFromServer, getDocs, setDoc } from "firebase/firestore";
import {db} from "../../../backend/firebase"

import default_station_logo from "../../../assets/img/station_no_logo.png"

import { IconContext } from "react-icons";
import { BsXCircleFill, BsXSquareFill } from "react-icons/bs";

import "./presets.css"




const Presets = ({ presets, onStationLogoClick, onPresetRemoveClicked }) => {

//  const [presets, setPresets] = useState([])


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
              {station.name.length > 28
              ?
              `${station.name.substring(0,28)}...`
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
