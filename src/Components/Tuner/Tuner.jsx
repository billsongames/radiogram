import { React, useEffect, useState } from 'react';
import { RadioBrowserApi } from "radio-browser-api";
import { Carousel } from '@trendyol-js/react-carousel';
import { api_test_data } from "../../data/api_test_data";

import "./tuner.css"

const api = new RadioBrowserApi('RadioPlayer')

const response = await api.searchStations({
  countryCode: 'US',
  limit: 10,
  offset: 0 // this is the default - can be omited
})

function Tuner() {

  const [tunerDisplayData, setTunerDisplayData] = useState([])

  const no_image = "./no_image_available.png"



  for (let i=0; i<response.length; i++) {
    let stationLogo
    let stationName

    if (response[i].favicon === "") {
      stationLogo = no_image
    } else {
      stationLogo = (response[i].favicon)
    }
    stationName = (response[i].name)

    tunerDisplayData.push({favicon: stationLogo, name: stationName})
  }  


    



  




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
                <img className="station-logo" src={station.favicon} alt={station.name} />
              </div>
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

