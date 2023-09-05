import React from "react";

import Title from "./Title";
import Login from "./Login";

import rp_logo from "../../../src/assets/img/radio_player.png"

import "./header.css"

const Header = () => {
  return(
    <div className="header">
      <div className="title-container">
        <h1>
          <img src={rp_logo} alt="RadioPlayer logo"/>
        </h1>
      </div>

      
    </div>
  )
}

export default Header