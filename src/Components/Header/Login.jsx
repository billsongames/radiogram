import React from "react";
import FacebookLogin from 'react-facebook-login';

//970142087432030

import "./login.css"



const Login = ({userID, onLogin, onLogout}) => {
  return(
    <div className="login">
      {userID
      ?
      <div>
        <select>
          <option value="1">1</option>
          <option value="2"><img src="https://mytuner.global.ssl.fastly.net/media/tvos_radios/cjqfbpl6lyyn.png"/></option>
          <option value="3">3</option>
        </select>
        Hello
      </div>

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