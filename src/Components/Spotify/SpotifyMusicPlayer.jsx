import { React, useEffect, useCallback, useState } from "react";
import axios from "axios";
//import SpotifyPlayer from 'react-spotify-web-playback';
import { WebPlaybackSDK, usePlaybackState, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk";

import SpotifyPlaybackController from "./SpotifyPlaybackController";
import SpotifyStatus from "./sdkComponents/SpotifyStatus";

//import SpotifyIFrame from "./SpotifyIFrame";

import { spotify_api } from "../../api/api"

import { spotify_response_filters } from "../../data/filters"

import "./spotify.css"



const SpotifyMusicPlayer = () => {

  const [token, setToken] = useState(window.localStorage.getItem("token"))
  const getOAuthToken = useCallback(callback => callback(token), []);



  const [player, setPlayer] = useState(undefined);


  const [searchQuery, setSearchQuery] = useState("")
  const [responseData, setResponseData] = useState([])

  const [responseType, setResponseType] = useState("artists")
  const [responseDataArtists, setResponseDataArtists] = useState([])
  const [responseDataTracks, setResponseDataTracks] = useState([])
  const [responseDataAlbums, setResponseDataAlbums] = useState({})


  const searchSubmit = async (event) => {
    event.preventDefault()

    const { data } = await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchQuery,
          type: "artist,album,track",//, artist, album, track, playlist, show, episode, audiobook",
          limit: 4
        }
      })

    console.log(data.artists.items)
    console.log(data.albums.items)
    console.log(data.tracks.items)

    setResponseDataArtists(data.artists.items)
    setResponseDataAlbums(data.albums.items)
    setResponseDataTracks(data.tracks.items)
  }


  let responseJSX = (<></>)



  if (responseDataArtists.length && responseType === "artists") {
    responseJSX = (
      <div>
        <h2>ARTISTS</h2>
        {responseDataArtists.map(artist => (
          <div key={artist.id} className="spotify__response-entry">

            <div className="spotify__response-entry-image">
              {artist.images.length ?
                <img
                  width={"100px"}
                  src={artist.images[0].url}
                  alt=""
                  data-uri={artist.id}

                />
                :
                <div>No Image</div>}
            </div>
            <div className="spotify__response-entry-info">
              <div className="spotify__response-entry-Name">
                {artist.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } else if (responseDataAlbums.length  && responseType === "albums") {
    responseJSX = (
      <div>
        <h2>ALBUMS</h2>
        {responseDataAlbums.map(album => (
          <div key={album.id} className="spotify__response-entry">

            <div className="spotify__response-entry-image">
              {album.images.length ?
                <img
                  width={"100px"}
                  src={album.images[0].url}
                  alt=""
                  data-uri={album.id}

                />
                :
                <div>No Image</div>}
            </div>
            <div className="spotify__response-entry-info">
              <div className="spotify__response-entry-Title">
                {album.name}
              </div>
              <div className="spotify__response-entry-Name">
                {album.artists[0].name}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } else if (responseDataTracks.length  && responseType === "tracks") {
    responseJSX = (
      <div>
        <h2>TRACKS</h2>
        {responseDataTracks.map(track => (
          <div key={track.id} className="spotify__response-entry">

            <div className="spotify__response-entry-image">
              {track.album.images.length ?
                <img
                  width={"100px"}
                  src={track.album.images[0].url}
                  alt=""
                  data-uri={track.id}

                />
                :
                <div>No Image</div>}
            </div>
            <div className="spotify__response-entry-info">
              <div className="spotify__response-entry-Title">
                {track.name}
              </div>
              <div className="spotify__response-entry-Name">
                {track.artists[0].name}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }





  return (
    <div className="spotify-player">





      <div className="spotify__search">
        <input className="spotify__search-form" type="text" onChange={event => setSearchQuery(event.target.value)} placeholder="Search..." />
        <button type="submit" className="spotify__search-button" onClick={searchSubmit}>GO</button>
      </div>

      <div className="spotify-player__main">

        <div className="spotify__response-results">

          <div className="spotify-filter-container">
            {spotify_response_filters.map((filter) => (
              <div
                key={filter}
                id={filter}
                className="tuner-filter__item"
                onClick={() => setResponseType(filter)}
              >

                <button type="button" className="filter__button">
                  <div className="filter__button-top">{filter.toUpperCase()}</div>
                  <div className="filter__button-bottom"></div>
                  <div className="filter__button-base"></div>
                </button>
              </div>
            ))}
          </div>

          <div>
            {responseJSX}

          </div>









          <div>
{            <WebPlaybackSDK
              initialDeviceName="radiogram spotify module"
              getOAuthToken={getOAuthToken}
              connectOnInitialized={true}
              volume={1}>


              <SpotifyStatus token={token}/>  
              
  

              <SpotifyPlaybackController/>
              
            </WebPlaybackSDK>  }
        </div>
        </div>








      </div>
    </div>





  )
}

export default SpotifyMusicPlayer