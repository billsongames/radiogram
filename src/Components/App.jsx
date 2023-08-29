import { React, useState}  from 'react';
import { RadioBrowserApi } from "radio-browser-api";

//import './App.css';

import RadioPlayer from './RadioPlayer/RadioPlayer';
import Tuner from './Tuner/Tuner';

import {api_test_data} from "../data/api_test_data"

const api = new RadioBrowserApi('My Radio App')
const no_image = "./no_image_available.png"






const App = () =>  {

  const [currentStation, setCurrentStation] = useState(api_test_data[5])

  const  handleStationLogoClick = event => {
    setCurrentStation({
      name: event.target.name,
      favicon: event.target.src,
      urlResolved: event.target.id
    })
  }

  const handleSearchRequest = (searchQuery) => {
    alert(searchQuery)
  }
  




  return (
    <>
      <Tuner
        onStationLogoClick = {handleStationLogoClick}
//        onStationSearch = {handleSearchRequest}
      >
      </Tuner>
      <RadioPlayer
        currentStation = {currentStation}>
      </RadioPlayer>
    </>
  );
}

export default App