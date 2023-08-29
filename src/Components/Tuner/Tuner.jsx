import { React, useCallback, useEffect, useState } from 'react';
import { RadioBrowserApi } from "radio-browser-api";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./tuner.css"

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
    }
};


const Tuner = ({onStationLogoClick}) => {

  const [tunerDisplayData, setTunerDisplayData] = useState([])
  const [stationFilter, setStationFilter] = useState("");



  /*   const handleSearchInput = (event) => {
      setSearchFilter(event.target.value);
    }; */

  /*   const handleSubmit = (event) => {
      event.preventDefault();
      onStationSearch(searchFilter)
    }; */

  const api = new RadioBrowserApi("BG Radio App")
  //api.setBaseUrl('https://de1.api.radio-browser.info/')

  const setupAPI = useCallback(async (stationFilter) => {
    return api.searchStations({
      countryCode: 'US',
      limit: 30
    })
  },[])

  useEffect(() => {
    setupAPI(stationFilter).then((data) => setTunerDisplayData(data));
  }, [stationFilter, setupAPI]);



  return (
    <div className='tuner'>
      <div className='tuner-carousel'>
        stations
        <Carousel
          responsive={responsive}
          infinite={true}
          slidesToSlide = {6}
          >

        {tunerDisplayData.map((station) => (
          <div className='carousel-entry' key={station.name}>
            <img
              className="tuner-station-logo"
              id={station.urlResolved}
              name={station.name}
              src={station.favicon}
              alt={station.name}
              
              onClick ={onStationLogoClick}
            />
            <div>
              {station.name}
            </div>
          </div>
        )
        )}


        </Carousel>

        {/* <form className='search-form' onSubmit={handleSubmit}>
          <input
            className='search-form__input'
            type='text'
            placeholder='Search station tags...'
            value={searchFilter}
            onChange={handleSearchInput}
          />
          <button className='search-form__button' type='submit'>Search...</button>  
        </form> */}

      </div>
    </div>

  )
}

export default Tuner