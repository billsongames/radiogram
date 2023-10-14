import { React, useEffect, useCallback, useState } from "react";
import axios from "axios";

import {
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
  usePlaybackState,
  usePlayerDevice,
  useErrorState
} from "react-spotify-web-playback-sdk";

const SPOTIFY_URI = "spotify:track:7ppPZa3TRUSGKaks9wH7VT";

const SpotifyStatus = (token) => {

  let  playerDevice = {
    device_id: "desktop",
    status: "ready" | "not_ready"
  }

  const [deviceName, setDeviceName] = useState("radiogram spotify module")

  const spotifyPlayer = useSpotifyPlayer();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const device = usePlayerDevice();
  const playbackState = usePlaybackState();
  const errorState = useErrorState();

  useEffect(() => {
    spotifyPlayer?.setName(deviceName);
  }, [deviceName]);


  useEffect(() => {
    if (device?.device_id === undefined) return;

    // https://developer.spotify.com/documentation/web-api/reference/#endpoint-transfer-a-users-playback
    fetch(`https://api.spotify.com/v1/me/player`, {
      method: "PUT",
      body: JSON.stringify({ device_ids: [device.device_id], play: false }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }, [device?.device_id]);



  

  const playSong = () => {

    if (device === null) return

    fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`,
    {
      method: "PUT",
      body: JSON.stringify({ uris: [SPOTIFY_URI] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }  
    )
  }    

  return (
    <>
    <div>
      webPlaybackSDK = 
      {webPlaybackSDKReady ?
      <> ready</>
      :
      <> not ready</>}
    </div>

    <div>
      playerDevice = 
      {device ?
      <>{device}</>
      :
      <> no player device</>}
    </div>



    <button onClick={playSong}>Play DLBIA</button>;


  </>
  )  

};

export default SpotifyStatus