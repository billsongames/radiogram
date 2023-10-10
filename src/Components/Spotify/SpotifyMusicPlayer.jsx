import { React, useEffect, useState } from "react";
import axios from "axios";
import SpotifyPlayer from 'react-spotify-web-playback';

import SpotifyIFrame from "./SpotifyIFrame";

import {spotify_api} from "../../api/api"

import { spotify_response_filters } from "../../data/filters"

import "./spotify.css"

const track = {
  name: "bob",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}



const SpotifyMusicPlayer = () => {

  const  [token, setToken] = useState(window.localStorage.getItem("token"))

  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);

  const [searchQuery, setSearchQuery] = useState("elvis")
  const [responseData,setResponseData] = useState([])
  
  const [responseType, setResponseType] = useState("artists")
  const [responseDataArtists, setResponseDataArtists] = useState([])
  const [responseDataTracks, setResponseDataTracks] = useState([])
  const [responseDataAlbums, setResponseDataAlbums] = useState({})

  const [iframeURI, setIFrameURI] = useState("")



  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

    const player = new window.Spotify.Player({
      name: 'Web Playback SDK',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });

    setPlayer(player);

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.addListener('player_state_changed', ( state => {

      if (!state) {
        return;
      }
    
      setTrack(state.track_window.current_track);
      setPaused(state.paused);

      player.getCurrentState().then( state => { 
        (!state)? setActive(false) : setActive(true) 
      });
    
    }));

    player.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
      }
    })


  };
}, []);

  const playTrack = async (event) => {
    event.preventDefault()
    alert("clicked")
  }

  const searchSubmit = async (event) => {
    event.preventDefault()

    const {data} = await axios
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


    let responseJSX

    if (responseType === "Tracks") {
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
                    onClick={() => setIFrameURI(track.id)}
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
    } else if (responseType === "Albums") {
      responseJSX = (
        <div>
          <h2>ALBUMS</h2>
            {responseDataAlbums.map(album => (
            <div key={album.id} className="spotify__response-entry">
              
              <div className="spotify__response-entry-image">
                {album.album.images.length ?
                  <img
                    width={"100px"}
                    src={album.album.images[0].url}
                    alt=""
                    data-uri={album.id}
                    onClick={() => setIFrameURI(album.id)}
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
    }





  return (
    <div className="spotify-player">

      <div className="spotify__search">
        <input className="spotify__search-form" type="text" onChange={event => setSearchQuery(event.target.value)} placeholder = "Search..."/>
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
                  <div className="filter__button-top">{filter}</div>
                  <div className="filter__button-bottom"></div>
                  <div className="filter__button-base"></div>
                </button>
            </div>
            ))}
          </div>

          <div>
          {responseJSX}

          </div>
        </div>  







        <div>
          {iframeURI === "" ?
          <div id="spotify__iframe">
            hello
          </div>  
          :  
          <SpotifyIFrame uri={iframeURI} />
          }
        </div>
      </div>
    </div>    


    


  )
}

export default SpotifyMusicPlayer