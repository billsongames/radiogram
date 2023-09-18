import { React, useEffect, useState}  from 'react';

//############

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import {auth} from "../backend/firebase"

import { collection, query,  where, getCountFromServer, doc, setDoc } from "firebase/firestore";
import {db} from "../backend/firebase"

//############

import Header from './Header/Header';
import Tuner from './Tuner/Tuner';
import Presets from './Presets/Presets';
import RadioPlayer from './RadioPlayer/RadioPlayer';

//############

import radio_antenna from "../assets/img/radio_antenna.png"
import tuning_static from "../assets/audio/tuning-radio-7150.mp3"
import white_logo from "../assets/img/white.png"

//############

import './App.css';
import { api_test_data } from '../data/api_test_data';

const staticPlayer = new Audio(tuning_static)
staticPlayer.loop=(true)

//let staticIsPlaying = false




const App = () =>  {

  const [userID, setUserID] = useState("")
  const [presets, setPresets] = useState([])
  const [currentStation, setCurrentStation] = useState(
    {
      name: "Select a station...",
      favicon: white_logo
    })
  const [newStation, setNewStation] = useState([])

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result
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
        // ...
        });
  }

  const handleLogout = () => {
    window.FB.logout()
    setUserID("")
  }

  const  handleStationLogoClick = event => {
    console.log(event.target.tags)
    if (event.target.id === currentStation.id){
      return
    } else {
        staticPlayer.play()
//        staticIsPlaying = true

        setNewStation({
          name: event.target.name,
          favicon: event.target.src,
          urlResolved: event.target.dataset.urlresolved
        })

        setCurrentStation({
          name: "Tuning...",
          favicon : radio_antenna,
          urlResolved: event.target.dataset.urlresolved
        })
      }
  }

  const handleStationTuned = () => {
    staticPlayer.pause()
//    staticIsPlaying = false
    setCurrentStation(newStation)
    }


  const handlePresetSaveButtonClicked = () => {
    alert("save clicked")
  }  





  useEffect(() => {
    async function checkIfUserExists() {
      if (userID){

// CREATE THE QUERY TO COUNT MATCHING DB ENTRIES

        const coll = collection(db, "users");
        const q = query(coll, where("userID", "==", `${userID}`))
        
// RUN THE QUERY

        const querySnapshot = await getCountFromServer(q)

        if (querySnapshot.data().count === 0) {
          console.log("No user exists")
          await setDoc(doc(coll), {
            userID: `${userID}`,
            presets: [api_test_data[0],api_test_data[1],api_test_data[2]]
          })
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
          handleStationLogoClick={handleStationLogoClick}
        />
        <Tuner onStationLogoClick = {handleStationLogoClick}/>
        <RadioPlayer
          currentStation = {currentStation}
          onStationTuned = {handleStationTuned}
          onPresetSaveButtonClicked = {handlePresetSaveButtonClicked}
        />
        {userID
        ?
        <div className="presets__title">
          PRESETS
        </div>
        :
        <></>          
        }
      </div>

        {userID
        ?
        <Presets userID={userID} onStationLogoClick={handleStationLogoClick}/>
        :
        <></>
        }
    </div>
    
  );
}

export default App