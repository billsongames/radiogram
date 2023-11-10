import { React } from "react";

import { IconContext } from "react-icons";
import { BiSolidLogOut } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

import "./login.css"


const Login = ({ userID, userInfo, onLogin, onLogout}) => {
  
  return(
    <div className="login">
      {userID ?
      <>
      <div className="login__text">
        Log out
      </div>

      <IconContext.Provider value={{ color: "whitesmoke", size: "36px"}}>
        <BiSolidLogOut
          className="login__button"
          onClick={onLogout}
        />
      </IconContext.Provider>
      <img className="login__userProfilePicture" src={userInfo.photoURL} alt="user profile" />
      </>  
      :
      <>
      <div className="login__text">
        Log in with Google
      </div>
      
      <IconContext.Provider value={{ color: "whitesmoke", size: "36px"}}>
        <FcGoogle
          className="login__button"
          onClick={onLogin}
        />
      </IconContext.Provider>
      </>
    }
  </div>
  )
}

export default Login