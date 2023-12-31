import { React, useEffect, useState}  from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GoogleAuthProvider, browserLocalPersistence, getAuth, setPersistence, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query,  where, getCountFromServer, doc, setDoc, documentId } from "firebase/firestore";
import {db} from "../backend/firebase"

import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent"; 

import PopUp from './PopUp/PopUp';

import Header from './Header/Header';
import Joint800px from './Joints/Joint800px';
import Radio from './Radio/Radio';

import './App.css';


const App = () =>  {
  const [userID, setUserID] = useState("")
  const [userInfo, setUserInfo] = useState({displayName: "", photoURL: ""})
//  const [allowCookies, setAllowCookies] = useState(getCookieConsentValue("radiogram"))
  


//  const [defaultStation, setDefaultStation] = useState([])

/*   const handleCookiesAccept = () => {
    setAllowCookies("true")
  }

  const handleCookiesDecline = () => {
    setAllowCookies("false")
  } */

  const auth = getAuth();
  
  onAuthStateChanged(auth, (user) => {
    
    if (user && getCookieConsentValue("radiogram") === "true") {
      setUserID(user.email)
      setUserInfo({displayName: user.displayName, photoURL: user.photoURL})
    }  
  })


  const handleLogin = () => {
    if (getCookieConsentValue("radiogram") !== "true") return 
      else {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      setPersistence(auth, browserLocalPersistence)
      signInWithPopup(auth, provider)
      .then((result) => {

        // This gives you a Google Access Token. You can use it to access the Google API.
//        const credential = GoogleAuthProvider.credentialFromResult(result);
  
//        const token = credential.accessToken;
        // The signed-in user info.

        setUserID(result.user.email)
        setUserInfo({displayName: result.user.displayName, photoURL: result.user.photoURL})

      //const user = result

      // IdP data available using getAdditionalUserInfo(result)
      // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
  
          console.log(errorCode)
          console.log(errorMessage)
          console.log(email)
          console.log(credential)
        // ...
          });
      }

    }

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
      setUserID("")
      setUserInfo({displayName: "", photoURL: ""})
    })
    .catch((error) => {
      console.log(error)
    })    
  }

  useEffect(() => {
    async function checkIfUserExists() {
      if (userID) {

// CREATE THE QUERY TO COUNT MATCHING DB ENTRIES

        const coll = collection(db, "users")
        const q = query(coll, where(documentId(), "==", `${userID}`))
        
// RUN THE QUERY

        const querySnapshot = await getCountFromServer(q)

        if (querySnapshot.data().count === 0) {
          const fieldData = {
            defaultStation: [],
            presets: []
          }
          await setDoc(doc(coll, `${userID}`),
            fieldData)
        }
      }
    }  

    checkIfUserExists()
  }, [userID])


  return (
      <div className='App'>
        


        <div>

          <Header
            userID={userID}
            userInfo={userInfo}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
          <Joint800px/>
          <Radio
            userID={userID}
          />

        </div>
          <PopUp />
      </div>
  );
}

export default App