import { React, useEffect, useState } from 'react';
import { RadioBrowserApi } from "radio-browser-api";
import { Carousel } from '@trendyol-js/react-carousel';
import { api_test_data } from "../../data/api_test_data";
import getStations from '../../api/api';

import "./tuner.css"

const api = new RadioBrowserApi('RadioPlayer')

const response = await api.searchStations({
  countryCode: "GB",
  limit: 10,
  offset: 0 // this is the default - can be omited
})



function Tuner( {onStationLogoClick} ) {

  const [tunerDisplayData, setTunerDisplayData] = useState([])
  const no_image = "./no_image_available.png"



  for (let i=0; i<response.length; i++) {
    let stationLogo
    let stationName
    let stationUrlResolved

    if (response[i].favicon === "") {
      stationLogo = no_image
    } else {
      stationLogo = (response[i].favicon)
    }
    stationName = (response[i].name)
    stationUrlResolved = (response[i].urlResolved)

    tunerDisplayData.push({favicon: stationLogo,
                           name: stationName,
                           urlResolved: stationUrlResolved
                          })
  }  

  console.log(tunerDisplayData)




  return(
    <div className='tuner'>
      <div className='tuner-carousel'>
        <Carousel
          show = {6}
          slide = {6}
          >

          {tunerDisplayData.map((station) => (
            <div className='carousel-entry'key = {station.name}>
              <div>
                <img
                  className="tuner-station-logo"
                  id={station.urlResolved}
                  name={station.name}
                  src={station.favicon}
                  alt={station.name}
                  onClick ={onStationLogoClick}/>
              </div>
              {}
              <div>
                {station.name}
              </div>
            </div>
          ))}
        </Carousel>

      </div>
    </div>
    
  )
}  


export default Tuner

