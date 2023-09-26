import { React, useEffect, useState}  from 'react';

//############

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import {auth} from "../backend/firebase"

import { collection, get, query,  where, getCountFromServer, doc, setDoc, getDocs, documentId } from "firebase/firestore";
import {db} from "../backend/firebase"

//############

import Header from './Header/Header';
import Tuner from './Tuner/Tuner';
import Presets from './Presets/Presets';
import RadioPlayer from './RadioPlayer/RadioPlayer';
import Joint800px from './Joints/Joint800px'

//############

import radio_antenna from "../assets/img/radio_antenna.png"
import tuning_static from "../assets/audio/tuning-radio-7150.mp3"
import white_logo from "../assets/img/white.png"

//############

import './App.css';
import { api_test_data } from '../data/api_test_data';
import Joint_800px from './Joints/Joint800px';

const staticPlayer = new Audio(tuning_static)
staticPlayer.loop=(true)

//let staticIsPlaying = false




const App = () =>  {

  const [userID, setUserID] = useState("")
  const [tuned, setTuned] = useState(false)
  const [currentStation, setCurrentStation] = useState(
    {
      name: "Select a station...",
      favicon: white_logo
    })
  const [newStation, setNewStation] = useState([])
  const [presets, setPresets] = useState([])



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
    console.log(event.target.dataset.tags)
    if (event.target.id === currentStation.id){
      return
    } else {
        staticPlayer.play()
        setTuned(false)
//        staticIsPlaying = true

        setNewStation({
          id: event.target.id,
          name: event.target.name,
          favicon: event.target.src,
          urlResolved: event.target.dataset.urlresolved,
          tags: event.target.dataset.tags
        })

        setCurrentStation({
          id: event.target.id,
          name: "Tuning...",
          favicon : radio_antenna,
          urlResolved: event.target.dataset.urlresolved,
          tags: event.target.dataset.tags
        })
      }
  }

  const handleStationTuned = () => {
    staticPlayer.pause()
//    staticIsPlaying = false
    setCurrentStation(newStation)
    setTuned(true)
    }

  const handlePresetSaveClicked = async (event, stationInfo) => {
    event.preventDefault()
      const newSavedPreset = {
        id: currentStation.id,
        name: currentStation.name,
        favicon: currentStation.favicon,
        urlResolved: currentStation.urlResolved,
        tags: currentStation.tags
      }

      setPresets([...presets, newSavedPreset])
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
          console.log("No user exists")
          await setDoc(doc(coll, `${userID}`), {
            presets: []
          })
        }
      }
    }  

    checkIfUserExists()
  }, [userID])


  useEffect(() => {
    const timer = setTimeout(() => {
      async function populatePresets() {
        if (userID){

// CREATE THE QUERY TO GET MATCHING DB ENTRIES

        const coll = collection(db, "users");
        const q = query(coll, `${userID}`)
        
// RUN THE QUERY

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setPresets(doc.data().presets);
        })
      }
    }    

    populatePresets()
  }, 500)
  return () => clearTimeout(timer)
  }, [userID])




  useEffect(() => {
    const timer = setTimeout(() => {
      async function writePresets() {
        if (userID){

          // CREATE THE QUERY TO COUNT MATCHING DB ENTRIES
          
          const coll = collection(db, "users");
          const q = query(coll, `${userID}`)
                  
          // RUN THE QUERY
          await setDoc(doc(coll, `${userID}`), {
            presets: presets
          })
        }
      }
      writePresets()
    }, 1000)
    return () => clearTimeout(timer)
    },[userID, presets])






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

        <Joint800px/>

        <RadioPlayer
          tuned={tuned}
          userID={userID}
          currentStation = {currentStation}
          onStationTuned = {handleStationTuned}
          onPresetSaveClicked={handlePresetSaveClicked}
          presets={presets}
        />
      </div>

      <Joint800px/>

        {userID
        ?
        <Presets
//          userID={userID}
          presets={presets}
          onStationLogoClick={handleStationLogoClick}
          onPresetSaveClicked={handlePresetSaveClicked}
          />
        :
        <></>
        }
    </div>
    
  );
}

export default App