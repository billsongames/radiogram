import { React, useCallback, useEffect, useState } from 'react';
import { RadioBrowserApi } from "radio-browser-api";

import { Carousel } from '@trendyol-js/react-carousel';
import { api_test_data } from "../../data/api_test_data";
import { apiSearchByCountry, api_test_call } from "../../api/api"


import "./tuner.css"

const no_image = "./no_image_available.png"




function Tuner( {onStationLogoClick, onStationSearch} ) {

  const [search, setSearch] = useState("");
  const [tunerDisplayData, setTunerDisplayData] = useState(api_test_data)

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onStationSearch(search)
  };

  

      



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

        <form className='search-form' onSubmit={handleSubmit}>
          <input
            className='search-form__input'
            type='text'
            placeholder='Search station tags...'
            value={search}
            onChange={handleSearchInput}
          />

          <button className='search-form__button' type='submit'>Search...</button>  
        </form>

      </div>
    </div>
    
  )
}  


export default Tuner

