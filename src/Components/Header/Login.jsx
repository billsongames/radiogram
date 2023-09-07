import React from "react";
import FacebookLogin from 'react-facebook-login';

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
      <FacebookLogin
        appId="970142087432030"
        autoLoad={false}
        fields="name,email,picture"
        callback={onLogin}
        cssClass="my-facebook-button-class"
        cookie={true}
      />
    }
  </div>
  )
}

export default Login