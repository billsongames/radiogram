import React from 'react';
import { Carousel } from '@trendyol-js/react-carousel';

import { api_test_data } from "../../data/api_test_data";

function Tuner() {

  const searchResults = api_test_data
  let stationLogos = []
  let stationNames = []

  const no_image = "./no_image_available.png"



  for (let i=0; i<searchResults.length; i++) {
    if (searchResults[i].favicon == "") {
      stationLogos.push(no_image)
    } else {
      stationLogos.push(searchResults[i].favicon)
    }
    stationNames.push(searchResults[i].name)  
  }


  

  return(
    <div className='tuner'>
      <div className='tuner-carousel'>
        <Carousel
          show = {6}
          slide = {6}
          swiping={true}>

          <div>
            <div>
              <img src={stationLogos[0]} />
            </div>
            <div>
              {stationNames[0]}
            </div>        
          </div>

        <div>
          <div>
            <img src={stationLogos[1]} />
          </div>
          <div>
            {stationNames[1]}
          </div>        
        </div>

        <div>
          <div>
            <img src={stationLogos[2]} />
          </div>
          <div>
            {stationNames[2]}
          </div>        
        </div>

        <div>
          <div>
            <img src={stationLogos[3]} />
          </div>
          <div>
            {stationNames[3]}
          </div>        
        </div>

        <div>
            <div>
              <img src={stationLogos[0]} />
            </div>
            <div>
              {stationNames[0]}
            </div>        
          </div>

        <div>
          <div>
            <img src={stationLogos[1]} />
          </div>
          <div>
            {stationNames[1]}
          </div>        
        </div>

        <div>
          <div>
            <img src={stationLogos[2]} />
          </div>
          <div>
            {stationNames[2]}
          </div>        
        </div>

        <div>
          <div>
            <img src={stationLogos[3]} />
          </div>
          <div>
            {stationNames[3]}
          </div>        
        </div>

        <div>
            <div>
              <img src={stationLogos[0]} />
            </div>
            <div>
              {stationNames[0]}
            </div>        
          </div>

        <div>
          <div>
            <img src={stationLogos[1]} />
          </div>
          <div>
            {stationNames[1]}
          </div>        
        </div>

        <div>
          <div>
            <img src={stationLogos[2]} />
          </div>
          <div>
            {stationNames[2]}
          </div>        
        </div>

        <div>
          <div>
            <img src={stationLogos[3]} />
          </div>
          <div>
            {stationNames[3]}
          </div>        
        </div>

        

      </Carousel>
    </div>
    </div>
    
  )
}  


export default Tuner

