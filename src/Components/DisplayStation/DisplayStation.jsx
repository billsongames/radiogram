import { React, useState, useRef } from "react";

import {api_test_data} from "../../data/api_test_data"

import "./display-station.css"

const  DisplayStation = ({currentStation}) => {

/*   let tagWords = (currentStation.tags)
  console.log(tagWords)

  for (let i=0; i<tagWords.length; i++) {
    tagWords[i] = tagWords[i][0].toUpperCase() + tagWords[i].substring(1)
  }

  const tags = tagWords.join(", ") */

  return(
    <div className="display-station__info">
      <img className="display-station__logo" src={currentStation.favicon} alt={currentStation.name}/>
      <h2>{currentStation.name}</h2>
    </div>
  )
}

export default DisplayStation