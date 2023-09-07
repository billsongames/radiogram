import {React, useState} from "react";

import { api_test_data } from "../../data/api_test_data";
import default_station_logo from "../../assets/img/station_no_logo.png"

import "./savedstations.css"


const SavedStations = ({onStationLogoClick}) => {

  const SetDefaultSrc = (event) => {
		event.target.src = default_station_logo
	};









  
  return(
    <div className='saved-stations-container'>
      <div className="saved-stations__title">
        PRESETS
      </div>
      
      <div className="saved-stations__grid" >
        {api_test_data.map((station) => (
          <div className='saved-station__entry' key={station.urlResolved}  onClick ={onStationLogoClick}>
            <img
              className="saved-station__logo"
              id={station.urlResolved}
              name={station.name}
              src={station.favicon}
              alt={station.name}
              tags={station.tags}
              
              onError={SetDefaultSrc}            
            />
            <div className='saved-station__name'>
              {station.name}
            </div>
          </div>
        ))}
  
        <div className="saved-station__entry">
          entry
        </div>
        <div>
          entry
        </div>
      </div>
    </div>

  )

}

export default SavedStations