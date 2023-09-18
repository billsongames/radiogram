import { React, useCallback, useEffect, useState } from 'react';
import { RadioBrowserApi } from "radio-browser-api";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { filters } from '../../data/filters';

import default_station_logo from "../../assets/img/station_no_logo.png"

import "./tuner.css"

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1201 },
    items: 8,
    partialVisibilityGutter: 0
  },
  desktop: {
    breakpoint: { max: 1200, min: 1025 },
    items: 8,
    partialVisibilityGutter: 0
  },
  laptop: {
    breakpoint: { max: 1024, min: 769 },
    items: 8,
    partialVisibilityGutter: 0
  },  
  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 6,
    partialVisibilityGutter: 0
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 4,
    partialVisibilityGutter: 0
    }

    
};


const Tuner = ({onStationLogoClick}) => {

  const [countryCode, setCountryCode] = useState("GB")

  const [searchByNameFilter, setSearchByNameFilter] = useState("")
  const [stationFilter, setStationFilter] = useState({
    countryCode: `${countryCode}`,
    limit: 50,
    offset: 0,
    lastCheckOk: true
  });
  const [tunerDisplayData, setTunerDisplayData] = useState([])

  const SetDefaultSrc = (event) => {
		event.target.src = default_station_logo
	};

  const handleSearchByNameInput = (event) => {
    setSearchByNameFilter(event.target.value);
  };

  const handleSearchByNameSubmit = (event) => {
    event.preventDefault();
    if (setSearchByNameFilter === "") {
      return
    } else {
      setStationFilter({
      countryCode: `${countryCode}`,
      limit: 50,
      name: `${searchByNameFilter}`.toLowerCase(),
      offset: 0,
      lastCheckOk: true
    })
    setSearchByNameFilter("")
    }
  };

  const api = new RadioBrowserApi("BG Radio App")
  api.setBaseUrl('https://at1.api.radio-browser.info/')

  const setupAPI = useCallback(async (stationFilter) => {
    return api.searchStations(stationFilter)
  },[])


  useEffect(() => {
    setupAPI(stationFilter)
    .then((data) => setTunerDisplayData(data))
    .catch(error => {console.log(error)})
  }, [setupAPI, stationFilter])




  return (
    <div className='tuner'>

{/* ### FILTERS ###   */}

      <div className="tuner-filter__container">
        {filters.map((filter) => (
          <div
            key={filter}
            id={filter}
            className="tuner-filter__item"
              
            onClick={() => setStationFilter({
              countryCode: `${countryCode}`,
              limit: 50,
              tag: `${filter}`.toLowerCase(),
              offset: 0,
              lastCheckOk: true
              })                
            }
          >
            {filter}  
          </div>
          ))}
      </div>

      <div className='tuner-carousel'>
        <Carousel
          responsive={responsive}
          infinite={true}
          slidesToSlide = {6}
          >

        {tunerDisplayData.map((station) => (
          <div className='carousel-entry' key={station.id}  onClick ={onStationLogoClick}>
            <img
              className="tuner-station__logo"
              name={station.name}
              src={station.favicon}
              data-urlresolved={station.urlResolved}
              alt={station.name}
              data-tags={station.tags}              
              
              onError={SetDefaultSrc}            
            />
            <div className='tuner-station__name'>
              {station.name}
            </div>
          </div>
        ))}
        </Carousel>
      </div>



{/* #### SEARCH BY NAME ####   */}

      <div>
        <form className='search-form' onSubmit={handleSearchByNameSubmit}>
          <input
            className='search-form__input'
            type='text'
            placeholder='Search station names...'
            value={searchByNameFilter}
            onChange={handleSearchByNameInput}
          />
          <button className='search-form__button' type='submit'>Search</button>  
        </form>
      </div>
    </div>

  )
}

export default Tuner