<div>
<div className='eq-player-section'>
  <div className='eq_graph'>
    <EQ/>
  </div>

  <RadioPlayer
    tuned={tuned}
    userID={userID}
    currentStation = {currentStation}
    onStationTuned = {handleStationTuned}
    onPaused = {handlePaused}
    onError = {handleTuningError}


onPresetSaveClicked={handlePresetSaveClicked}
onPresetRemoveClicked={handlePresetRemoveClicked}
presets={presets}
/>

<div className='eq_graph'>
<EQ/>
</div>

</div>

<Joint800px/>

<Tuner onStationLogoClick = {handleStationLogoClick}/>

<Joint800px/>

{userID
?
<>
<Presets
//          userID={userID}
presets={presets}
onStationLogoClick={handleStationLogoClick}
onPresetSaveClicked={handlePresetSaveClicked}
/>

<Joint800px/>
</>
:
<></>
}
</div>