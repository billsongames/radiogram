import React from "react";
//import FacebookLogin from 'react-facebook-login';
import GoogleButton from 'react-google-button'


//970142087432030

import "./login.css"

import saved_stations from "../../data/api_test_data"



const Login = ({userID, onLogin, onLogout}) => {
  return(
    <div className="login">
      {userID
      ?
      <>
        <div>
          logged in
        </div>
      </>  
      :
      <GoogleButton onClick={onLogin} />
    }
  </div>
  )
}

export default Login