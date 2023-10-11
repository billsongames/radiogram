import { React, useEffect, useState } from "react";
import axios from "axios";

import {spotify_api} from "../../api/api"

import "./spotify.css"

import SpotifyMusicPlayer from "./SpotifyMusicPlayer";






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

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
    console.log(`Logged in. Token = ${token}`)
  
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    }  

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
        <div className="spotify__title">
          SPOTIFY
        </div>
        {(token === "") ?
        <div className="spotify__login">
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            <button className="spotify__login-button">LOG IN TO SPOTIFY</button>
          </a> 
        </div>
        :
        <div className="spotify__logout">
          <button className="spotify__logout-button" onClick={logout}>LOG OUT</button>
        </div>
        }
      </div>
      {(token === "") ?
      <></>
      :
      <SpotifyMusicPlayer />
      }
    
    </div>
  )
}
export default SpotifyComponent