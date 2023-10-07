import { React } from "react";

import GoogleButton from 'react-google-button'





import "./login.css"


//####################

const Login = ({ userID, onLogin, onLogout}) => {



  
  return(
    <div className="login">
      {userID ?
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