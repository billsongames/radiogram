import { React, useEffect, useState } from "react";
import axios from "axios";

import {spotify_api} from "../../api/api"

import "./spotify.css"






const SpotifyComponent = () => {
  const CLIENT_ID = spotify_api[0].SPOTIFY_API_ID
  const CLIENT_SECRET = spotify_api[1].SPOTIFY_CLIENT_SECRET
  const REDIRECT_URI = "https://localhost:3000/spotify"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchQuery, setSearchQuery] = useState("elvis")
  const [responseData,setResponseData] = useState([])

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
/*       setResponseData(data.artists.items) */
  }





















  return(
    <div className="spotify-container">
      Spotify

      {!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        :
        <button onClick={logout}>Logout</button>
      }

      {token ?
        <form onSubmit={searchArtists}>
          <input type="text" onChange={event => setSearchQuery(event.target.value)}/>
          <button type={"submit"}>Search</button>
        </form>
        :
        <h2>Please login</h2>
      }

      <div>
{/*         {artists.map(album => (
          <div key={album.id}>
            {album.images.length ? <img width={"100px"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
            {album.name}
          </div>
      ))} */}
      </div>

    </div>
  )
}
export default SpotifyComponent