import { React, useEffect, useState}  from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GoogleAuthProvider, browserLocalPersistence, getAuth, setPersistence, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query,  where, getCountFromServer, doc, setDoc, documentId } from "firebase/firestore";
import {db} from "../backend/firebase"

import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";

import Header from './Header/Header';
import Joint800px from './Joints/Joint800px';
import Radio from './Radio/Radio';

import './App.css';


const App = () =>  {
  const [userID, setUserID] = useState("")
  const [allowCookies, setAllowCookies] = useState(getCookieConsentValue("radiogram"))


//  const [defaultStation, setDefaultStation] = useState([])

  const auth = getAuth();
  
  onAuthStateChanged(auth, (user) => {
    
    if (user && allowCookies === "true") {
      console.log("signed in")
      setUserID(user.email)
     } else {
      console.log("not signed in")
     }
  })


  const handleLogin = () => {
    console.log(allowCookies)

    if (allowCookies === "false") return 
    else {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      setPersistence(auth, browserLocalPersistence)
      signInWithPopup(auth, provider)
      .then((result) => {

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
  
        console.log(credential)
        const token = credential.accessToken;
        // The signed-in user info.

//      console.log(result.user)

        setUserID(result.user.email)

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
    <>
      <CookieConsent
        debug={true}
        location="bottom"
        buttonText="Rock on!"
        expires={365}
        overlay
      >
        <a href='https://billsongames.weebly.com/privacy.html' target='blank'>Privacy policy</a>
        This website uses cookie to enhance the user experience.
      </CookieConsent>  

      <div className='App'>
        <CookieConsent
          overlay
//          debug={true}
          expires={365}
          location="bottom"
          cookieName="radiogram"
          style={{ background: "#2B373B" ,fontSize: "24px" }}
          buttonText="Understood"
          buttonStyle={{ background: "whitesmoke" ,fontSize: "24px" }}
          onAccept={() => setAllowCookies("true")}
          enableDeclineButton
          declineButtonText="No way!"
          declineButtonStyle={{ background: "red" ,fontSize: "24px" }}
          onDecline={() => setAllowCookies("false")}
          setDeclineCookie={false}
          flipButtons
          
        >
          This website uses cookies to improve your listening experience. {" "}
        </CookieConsent>  


        <div className="top-section">

          <Header
            userID={userID}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
          <Joint800px/>
          <Radio
              userID={userID}
            />
        </div>       
      </div>
    </>  
  );
}

export default App