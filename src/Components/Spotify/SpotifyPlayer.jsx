import { React, useEffect, useState } from "react";
import axios from "axios";

import {spotify_api} from "../../api/api"

import "./spotify.css"
import SpotifyPlayer from "./SpotifyPlayer";






const SpotifyComponent = () => {
  const CLIENT_ID = spotify_api[0].SPOTIFY_API_ID
  const CLIENT_SECRET = spotify_api[1].SPOTIFY_CLIENT_SECRET
  const REDIRECT_URI = "https://localhost:3000/spotify"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchQuery, setSearchQuery] = useState("elvis")
  const [responseData,setResponseData] = useState([])
  const [responseDataTracks, setResponseDataTracks] = useState([])
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
  
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
}

useEffect(() => {

  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;

  document.body.appendChild(script);

  window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: cb => { cb(`${token}`); },
          volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
      });


      player.connect();

  };
}, []);

  const searchArtists = async (event) => {
    event.preventDefault()

    const {data} = await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchQuery,
          type: "artist,album,track",//, artist, playlist, track, show, episode, audiobook",
          limit: 4
        }
      })
      console.log(data.artists.items)
      console.log(data.albums.items)
      console.log(data.tracks.items)
      setResponseDataTracks(data.tracks.items)

  }























  return(
    <div className="spotify-container">
      
      <div className="spotify__header">
        <div className="spotify-title">
          SPOTIFY
        </div>
      </div>  
    
      {token ?
        <div className="spotify__logout">
          <button className="spotify__logout-button" onClick={logout}>LOG OUT</button>
        </div>
      :
      <></>
      }
    </div>  
  )
}
export default SpotifyComponent