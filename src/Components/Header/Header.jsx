import React from "react";

import Login from "./Login";

import rp_logo from "../../../src/assets/img/logo_radiogram_1.png"

import "./header.css"

const date = new Date(Date.now());
const days=[
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const dateString = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`

const Header = ({ userID, handleLogin, handleLogout }) => {
  return(
    <div className="header-container">

      <div className="header__date">
        {dateString}
      </div>

      <div className="header__logo">        
        <img src={rp_logo} alt="RadioPlayer logo"/>
      </div>

      <div className="header__login">
        <div>
          <Login
            userID={userID}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </div>  
      </div>
    </div>
  )
}

export default Header