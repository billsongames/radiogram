import {React, useState} from "react";
import Tippy from '@tippyjs/react';

//import 'tippy.js/dist/tippy.css'

import { api_test_data } from "../../data/api_test_data";
import default_station_logo from "../../assets/img/station_no_logo.png"

import "./savedstations.css"

const SavedStations = ({onStationLogoClick}) => {

  const SetDefaultSrc = (event) => {
		event.target.src = default_station_logo
	};




  return(
    <div>

      <Tippy
        interactive={true}
        placement="right"
        content={
          <div className="saved-stations">
            {api_test_data.map((saved_station) => (
              <div className="saved-station__entry" key={saved_station.urlResolved} onClick ={onStationLogoClick}>
                <img
                  className="saved-station__logo"
                  id={saved_station.urlResolved}
                  name={saved_station.name}
                  src={saved_station.favicon}
                  alt={saved_station.name}
                  tags={saved_station.tags}

                  onError={SetDefaultSrc}                  
                />
                <div className="saved-station__name">
                  {saved_station.name}
                </div>
                
              </div>
            ))}
          </div>
        }>
        <button>Saved stations</button>
      </Tippy>
    </div>
  )

}

export default SavedStations