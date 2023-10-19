import { React, useEffect, useState}  from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { collection, query,  where, getCountFromServer, doc, setDoc, documentId } from "firebase/firestore";
import {db} from "../backend/firebase"

import Header from './Header/Header';
import Joint800px from './Joints/Joint800px';
import Radio from './Radio/Radio';

import './App.css';


const App = () =>  {
  const [userID, setUserID] = useState("")
//  const [defaultStation, setDefaultStation] = useState([])

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
//      const credential = GoogleAuthProvider.credentialFromResult(result);
//      const token = credential.accessToken;
      // The signed-in user info.

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
      <div className='App'>
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
  );
}

export default App