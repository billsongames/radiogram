import { React, useEffect, useState } from "react";
import axios from "axios";
import SpotifyPlayer from 'react-spotify-web-playback';

import SpotifyIFrame from "./SpotifyIFrame";

import { spotify_api } from "../../api/api"

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

  const [token, setToken] = useState(window.localStorage.getItem("token"))

  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);

  const [searchQuery, setSearchQuery] = useState("")
  const [responseData, setResponseData] = useState([])

  const [responseType, setResponseType] = useState("artists")
  const [responseDataArtists, setResponseDataArtists] = useState([])
  const [responseDataTracks, setResponseDataTracks] = useState([])
  const [responseDataAlbums, setResponseDataAlbums] = useState({})

  const [iframeURI, setIFrameURI] = useState("2u30gztZTylY4RG7IvfXs8")



  /*   useEffect(() => {
  
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
    } */

  /* useEffect(() => {
    async function setupIframe() {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const element = document.getElementById('embed-iframe');
        const options = {
          uri: iframeURI
        };

        const callback = (EmbedController) => { };
        IFrameAPI.createController(element, options, callback);
      };
    }
    setupIframe()
  }, []) */

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
                  onClick={() => setIFrameURI(artist.id)}
                />
                :
                <div>No Image</div>}
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
              {album.images.length ?
                <img
                  width={"100px"}
                  src={album.images[0].url}
                  alt=""
                  data-uri={album.id}
                  onClick={() => setIFrameURI(album.id)}
                />
                :
                <div>No Image</div>}
            </div>
          </div>
        ))}
      </div>
      )
  } else if (responseType === "Artists") {
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
                  onClick={() => setIFrameURI(artist.id)}
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
        </div>







        <div>
          {/* {iframeURI === "" ?
          <div id="spotify__iframe">
            hello
          </div>  
          :  
          <div id="spotify__iframe">
            <iframe
              title="spotify__iframe"
              src={`https://open.spotify.com/embed/album/${iframeURI}?utm_source=generator`}
              width="600px"
              height="800px"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              >
            </iframe>
          </div>
          } */}
        </div>
      </div>
    </div>





  )
}

export default SpotifyMusicPlayer