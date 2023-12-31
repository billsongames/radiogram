import React from "react";
import { Link } from "react-router-dom";

import Clock from 'react-live-clock';
import Login from "./Login";


import rp_logo from "../../../src/assets/img/logo_radiogram_2.png"
import { sources } from '../../data/sources';

import "./header.css"


const Header = ({ userID, userInfo, handleLogin, handleLogout }) => {
  return(
    <div className="header-container">
      <div className="header__top-row">

      <div className="header__logo">        
          <img  src={rp_logo} alt="RadioPlayer logo"/>
        </div>

        <div className="header__clock">
          <Clock
            ticking={true}/>
        </div>

        <div className="header__login">
          <div>
            <Login
              userID={userID}
              userInfo={userInfo}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          </div>  
        </div>
      </div>


{/*       <div className="header__source-container">
        {sources.map((source) => (
          <div
            key={source}
            id={source}
            className="header__source-item"
          >
            <Link to ={`./${source.toLowerCase()}`}>
              <button type="button" className="source__button">
                <div className="source__button-top">{source.toUpperCase()}</div>
                <div className="source__button-bottom"></div>
                <div className="source__button-base"></div>
              </button>
            </Link>  
          </div>            
        ))}
      </div> */}
    </div>



  )
}

export default Header