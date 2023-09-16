import {React, useState} from "react";
import { Markup } from 'interweave';

import { api_test_data } from "../../data/api_test_data";
import default_station_logo from "../../assets/img/station_no_logo.png"

import "./presets.css"


const Presets = ({onStationLogoClick}) => {

  const SetDefaultSrc = (event) => {
		event.target.src = default_station_logo
	};

/* const markupContent = `
  <span class="saved-station__entry">Helloooo</span>
  <span class="saved-station__entry">Helloooo</span>
  ` */







  
  return(
    <div className='presets-container'>
      <div className="presets__grid" >
        {api_test_data.map((station) => (
          <div className='preset__entry' key={station.id}  onClick ={onStationLogoClick}>
            <img
              className="preset__logo"
              id={station.urlResolved}
              name={station.name}
              src={station.favicon}
              alt={station.name}
              tags={station.tags}
              draggable="true"
              
              onError={SetDefaultSrc}            
            />
            <div className='preset__name'>
              {station.name}
            </div>
          </div>
        ))}



      </div>
    </div>

  )

}

export default Presets