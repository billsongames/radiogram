import React from "react";
import { Link } from "react-router-dom";

import Clock from 'react-live-clock';
import Login from "./Login";
import Joint800px from "../Joints/Joint800px";

import rp_logo from "../../../src/assets/img/logo_radiogram_1_40pc.png"
import { sources } from '../../data/sources';

import "./header.css"

const Header = ({ userID, handleLogin, handleLogout }) => {
  return(
    <div className="header-container">
      <div className="header__top-row">

        <div className="header__logo">        
          <img src={rp_logo} alt="RadioPlayer logo"/>
        </div>
        
        <div className="header__clock">
          <Clock
            ticking={true}/>
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

      <div className="header__source-container">
        {sources.map((source) => (
          <div
            key={source}
            id={source}
            className="header__source-item"

            onClick={() => console.log("clicked")}
          >
            <Link to ={`./${source.toLowerCase()}`}>
              <button type="button" className="source__button">
                <div className="source__button-top">{source}</div>
                <div className="source__button-bottom"></div>
                <div className="source__button-base"></div>
              </button>
            </Link>  
          </div>            
        ))}
      </div>
    </div>



  )
}

export default Header