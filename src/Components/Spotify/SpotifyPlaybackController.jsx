import React from "react";
import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";

const SpotifyPlaybackControl = () => {
  const player = useSpotifyPlayer();

  if (player === null) return null;

  return(
    <div>
      <button className="" onClick={() => player.previousTrack()}>
          previousTrack
      </button>

      <button className="" onClick={() => player.togglePlay()}>
        togglePlay
      </button>

      <button className="" onClick={() => player.nextTrack()}>
        nextTrack
      </button>

      <button className="" onClick={() => player.pause()}>
        pause
      </button>

      <button className="" onClick={() => player.resume()}>
        resume
      </button>

      <button className="" onClick={() => player.connect()}>
        connect
      </button>
      
      <button className="" onClick={() => player.disconnect()}>
        disconnect
      </button>
    
    </div>
  )
}

export default SpotifyPlaybackControl