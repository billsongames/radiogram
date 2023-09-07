import React from "react";

import Login from "./Login";
import SavedStations from "./SavedStations";

import rp_logo from "../../../src/assets/img/radio_player.png"

import "./header.css"

const date = new Date(Date.now());
const days=[
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const dateString = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`

const Header = ({ userID, handleLogin, handleLogout, handleStationLogoClick }) => {
  return(
    <div className="header">

      <div className="login-menu-container">
        <div>
          <Login
            userID={userID}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </div>
        
        {userID
        ?
          <div>
            <SavedStations onStationLogoClick = {handleStationLogoClick}/>
          </div>
      
        :
        <>
        </>
        }
      </div>

      <div className="logo-container">        
        <img src={rp_logo} alt="RadioPlayer logo"/>
      </div>

      <div className="date-container">
        {dateString}
      </div>
      
    </div>
  )
}

export default Header