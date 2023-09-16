import { React, useEffect, useState}  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RadioBrowserApi } from "radio-browser-api";

import { collection, query,  where, getCountFromServer, doc, setDoc } from "firebase/firestore";
import {db} from "../backend/firebase"

import Header from './Header/Header';
import Tuner from './Tuner/Tuner';
import Presets from './Presets/Presets';
import RadioPlayer from './RadioPlayer/RadioPlayer';


import radio_antenna from "../assets/img/radio_antenna.png"
import tuning_static from "../assets/audio/tuning-radio-7150.mp3"
import white_logo from "../assets/img/white.png"

import './App.css';
import Login from './Header/Login';



const staticPlayer = new Audio(tuning_static)
staticPlayer.loop=(true)

let staticIsPlaying = false




const App = () =>  {

  const [userID, setUserID] = useState("")
  const [presets, setPresets] = useState([])

  const handleLogin = (response) => {
    setUserID(response.id)
  }

  const handleLogout = () => {
    window.FB.logout()
    setUserID("")
  }

  const [currentStation, setCurrentStation] = useState(
    {
      name: "Select a station...",
      favicon: white_logo
    })
  const [newStation, setNewStation] = useState([])

  const  handleStationLogoClick = event => {
    if (event.target.name === currentStation.name){
      return
    } else {
        staticPlayer.play()
        staticIsPlaying = true

        setNewStation({
          name: event.target.name,
          favicon: event.target.src,
          urlResolved: event.target.id
        })

        setCurrentStation({
          name: "Tuning...",
          favicon : radio_antenna,
          urlResolved: event.target.id
        })
      }
  }

  const handleStationTuned = () => {
    staticPlayer.pause()
    staticIsPlaying = false
    setCurrentStation(newStation)
    }


  const handleSearchRequest = (searchQuery) => {
    alert(searchQuery)
  }
  
/*   useEffect(() => {
    async function checkIfUserExists() {
      if (userID){
        const userCol = collection(db, "users")
        const userSnapshot = await getDocs(userCol)
        const userList = userSnapshot.docs.map(doc => doc.data())
        console.log(userList)
        }
      }
    
    checkIfUserExists()
  }, [userID]) */

  useEffect(() => {
    async function checkIfUserExists() {
      if (userID){

// CREATE THE QUERY TO COUNT MATCHING DB ENTRIES

        const coll = collection(db, "users");
        const q = query(coll, where("userID", "==", `${userID}`))
        
// RUN THE QUERY

        const querySnapshot = await getCountFromServer(q)
        console.log("User exists. Count = ", querySnapshot.data().count)

        if (querySnapshot.data().count === 0) {
          console.log("No user exists")
          await setDoc(doc(coll), {
            userID: `${userID}`,
            presets: []
          })
          console.log("user added")
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
        <Presets onStationLogoClick={handleStationLogoClick}/>
        :
        <></>
        }
    </div>
  );
}

export default App