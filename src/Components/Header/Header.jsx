import React from "react";

import Title from "./Title";
import Login from "./Login";

import rp_logo from "../../../src/assets/img/radio_player.png"

import "./header.css"

const Header = ({ userID, handleLogin, handleLogout} ) => {
  return(
    <div className="header">
      <div className="title-container">
        <img src={rp_logo} alt="RadioPlayer logo"/>
      </div>
      <Login
        userID={userID}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />  

      
    </div>
  )
}

export default Header