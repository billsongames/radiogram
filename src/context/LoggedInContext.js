import { React, createContext, useState } from "react";

const LoggedInContext = createContext()



function LoggedInProvider(props) {

  const [loggedIn, setLoggedIn] = useState(false)

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn)
  }

  

  return (
    <div>
      <LoggedInContext.Provider value={{loggedIn, toggleLoggedIn}}>
        {props.children}
      </LoggedInContext.Provider>
    </div>
  )
}

export {LoggedInContext, LoggedInProvider}