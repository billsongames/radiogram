import React from "react";

import Title from "./Title";
import Login from "./Login";

import "./header.css"

const Header = () => {
  return(
    <div className="header-container">
      <div className="title-container">
        <h1>
          RadioPlayer
        </h1>
      </div>
      <div className="login-container">
        <Login/>
      </div>
      
    </div>
  )
}

export default Header