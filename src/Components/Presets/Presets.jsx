import {React, useEffect, useState} from "react";
import { Markup } from 'interweave';

import { collection, query,  where, getCountFromServer, getDocs, setDoc } from "firebase/firestore";
import {db} from "../../backend/firebase"

import { api_test_data } from "../../data/api_test_data";
import default_station_logo from "../../assets/img/station_no_logo.png"

import "./presets.css"


const Presets = ({userID, onStationLogoClick}) => {

  const [presets, setPresets] = useState([])

  const SetDefaultSrc = (event) => {
		event.target.src = default_station_logo
	};

/* const markupContent = `
  <span class="saved-station__entry">Helloooo</span>
  <span class="saved-station__entry">Helloooo</span>
  ` */

  useEffect(() => {
    async function populatePresets() {
      if (userID){

// CREATE THE QUERY TO GET MATCHING DB ENTRIES

        const coll = collection(db, "users");
        const q = query(coll, where("userID", "==", `${userID}`))
        
// RUN THE QUERY

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setPresets(doc.data().presets);
        })
      }
    }    

    populatePresets()
  }, [userID])





  
  return(
    <div className='presets-container'>
      <div className="presets__grid" >
        {presets.map((station) => (
          <div className='preset__entry' key={station.id}  onClick ={onStationLogoClick}>
            <img
              className="preset__logo"
              name={station.name}
              src={station.favicon}
              data-urlresolved={station.urlResolved}
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