import { React, useEffect, useState}  from 'react';

import RadioPlayer from "./RadioPlayer/RadioPlayer";
import EQ from "./DisplayStation/EQ";
import Tuner from "./Tuner/Tuner"
import Presets from "./Presets/Presets"
import Joint800px from '../Joints/Joint800px';

import { collection, query, doc, setDoc, getDocs, updateDoc } from "firebase/firestore";
import {db} from "../../backend/firebase"

import "./radio.css"


import radio_antenna from "../../assets/img/radio_antenna.png"
import error_tuning from "../../assets/img/error_tuning.png"
import tuning_static from "../../assets/audio/tuning-radio-7150.mp3"
import white_logo from "../../assets/img/white.png"

const staticPlayer = new Audio(tuning_static)
staticPlayer.loop=(true)

const defaultAnimValue = 2
const tuningAnimValue = 0.4
const zeroAnimValue = 0




const Radio = ({ userID }) => {


    const [tuned, setTuned] = useState(false)
    const [currentStation, setCurrentStation] = useState(
      {
        name: "Select a station...",
        favicon: white_logo
      })
    const [defaultStation, setDefaultStation] = useState([])
    const [newStation, setNewStation] = useState([])
    const [backupStation, setBackupStation] = useState([])

    const [presets, setPresets] = useState([])
    
    const r = document.querySelector(':root');


  

    const  handleStationLogoClick = (event) => {
      event.preventDefault()
      if (event.target.id === currentStation.id){
        return
      } else {
          staticPlayer.play()
          setTuned(false)
          r.style.setProperty("--first-anim-value", `${tuningAnimValue}s`)
  //        staticIsPlaying = true
  
          setNewStation({
            id: event.target.id,
            name: event.target.name,
            favicon: event.target.src,
            urlResolved: event.target.dataset.urlresolved,
  //          tags: event.target.dataset.tags
          })
  
          setCurrentStation({
            id: event.target.id,
            name: "Tuning...",
            favicon : radio_antenna,
            urlResolved: event.target.dataset.urlresolved,
  //          tags: event.target.dataset.tags
          })
        }
    }

    const handleStationTuned = () => {
      staticPlayer.pause()
  //    staticIsPlaying = false
      setCurrentStation(newStation)
      setDefaultStation(newStation)
      setTuned(true)
      r.style.setProperty("--first-anim-value", `${defaultAnimValue}s`)
      }
  
    const handlePaused = () => {
      r.style.setProperty("--first-anim-value", `${zeroAnimValue}s`)
    }
  
    const handlePresetSaveClicked = async (event, stationInfo) => {
      event.preventDefault()
        const newSavedPreset = {
          id: currentStation.id,
          name: currentStation.name,
          favicon: currentStation.favicon,
          urlResolved: currentStation.urlResolved,
  //        tags: currentStation.tags
        }
  
        setPresets([...presets, newSavedPreset])
    }
  
    const handlePresetRemoveClicked =(event) => {
      event.preventDefault()
      const indexOfPreset = presets.findIndex(preset =>
        preset.id === event.target.id)
      
      setPresets(prev => {
        return prev.filter((_, i) => i !== indexOfPreset)
      })  
    }
  
    const handleTuningError = () => {
      staticPlayer.pause()
      setCurrentStation({
        name: "ERROR TUNING STATION...",
        favicon : error_tuning,
      })
    }

/*   useEffect(() => {
    async function getDefaultStation() {
      if (userID) {
        const coll = collection(db, "users");
        const q = query(coll, `${userID}`)

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setCurrentStation(doc.data().defaultStation);
        })
      }
    }
    getDefaultStation()
  
  }, [userID]) */


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
          await updateDoc(doc(coll, `${userID}`), {
            presets: presets
          })
        }
      }
      writePresets()
    }, 1000)

    return () => clearTimeout(timer)

    },[userID, presets])


/*     useEffect(() => {
      const timer = setTimeout(() => {
        async function writeDefaultStation() {
          if (userID){
  
            // CREATE THE QUERY TO COUNT MATCHING DB ENTRIES
            
            const coll = collection(db, "users");
            const q = query(coll, `${userID}`)
                    
            // RUN THE QUERY
            await updateDoc(doc(coll, `${userID}`), {
              defaultStation: newStation
            })
          }
        }
        writeDefaultStation()
      }, 1000)

      return () => clearTimeout(timer)
  
      },[userID, newStation]) */




















    return (
    <div className='radio-container'>
      <div className="eq-player-section">

        <div className="eq_graph">
          <EQ />
        </div>

        <RadioPlayer tuned={tuned} userID={userID} currentStation={currentStation} onStationTuned={handleStationTuned} onPaused={handlePaused} onError={handleTuningError} onPresetSaveClicked={handlePresetSaveClicked} onPresetRemoveClicked={handlePresetRemoveClicked} presets={presets} />

        <div className="eq_graph">
          <EQ />
        </div>

      </div>

      <Joint800px />

      <Tuner onStationLogoClick={handleStationLogoClick} />

      <Joint800px />

      {userID ? (
        <>
          <Presets

            presets={presets}
            onStationLogoClick={handleStationLogoClick}
//            onPresetSaveClicked={handlePresetSaveClicked}
          />


        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Radio;
