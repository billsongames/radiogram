import { React } from "react";

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import DisplayStation from "../DisplayStation/DisplayStation";

import "./radio-player.css"
import 'react-h5-audio-player/lib/styles.css'


const RadioPlayer = ({ tuned, userID, currentStation, onStationTuned, onPaused, onError, presets, onPresetSaveClicked, onPresetRemoveClicked }) => {

  return(
    <div className="radio-player">
      <div className="display-station-container">
        <DisplayStation
          tuned={tuned}
          userID={userID}
          currentStation={currentStation}
          presets={presets}
          onPresetSaveClicked={onPresetSaveClicked}
          onPresetRemoveClicked={onPresetRemoveClicked}
        />
      </div>
      <div className="audioplayer-container">
        <AudioPlayer
          autoplay = {true}
          src = {currentStation.urlResolved}
          autoPlayAfterSrcChange = {true}
          layout = "stacked-reverse"
          showSkipControls = {false}          
          showJumpControls = {false}
          showDownloadProgress = {false}
          showFilledProgress = {false}
          showFilledVolume = {false}
          customControlsSection={[
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.VOLUME_CONTROLS,
            ]}
          customProgressBarSection = {[]}
          onPlaying = {onStationTuned}
          onPause={onPaused}
          onError={onError}
        />        
      </div>  
    </div>  
  )
}

export default RadioPlayer