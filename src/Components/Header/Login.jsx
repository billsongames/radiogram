import React from "react";
import FacebookLogin from 'react-facebook-login';

//970142087432030

import "./login.css"



const Login = ({userID, onLogin, onLogout}) => {
  return(
    <div className="login">
      <FacebookLogin
        appId="970142087432030"
        autoLoad={false}
        fields="name,email,picture"
        callback={onLogin}
        cssClass="my-facebook-button-class"
        cookie={true}
      />
    </div>
  )
}

export default Login