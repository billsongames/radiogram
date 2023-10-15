const {data} = await axios
.get("https://api.spotify.com/v1/search", {
  headers: {
    Authorization: `Bearer ${token}`
  },
  params: {
    q: searchQuery,
    type: "track",//, artist, playlist, track, show, episode, audiobook",
    limit: 4
  }
})

<div className="spotify-container">

<div className="spotify__header">
  <div className="spotify-title">
    SPOTIFY
  </div>
  {token ?
  <>
  <div className="spotify__search">
    <input className="spotify__search-form" type="text" onChange={event => setSearchQuery(event.target.value)} placeholder = "Search..."/>
    <button type="submit" className="spotify__search-button" onClick={searchArtists}>GO</button>
  </div>

  <div className="spotify__logout">
    <button className="spotify__logout-button" onClick={logout}>LOG OUT</button>
  </div>
  </>
  :
  <></>
  }  
</div>

{token ?
<></>
:
<div className="spotify__login">
  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
    <button className="spotify__login-button">LOG IN TO SPOTIFY</button>
  </a> 
</div>
}


{token ?
<>
<div className="spotify__responseData">
  <div className="spotify__responseSection">
    <h3>SONGS</h3>

  
    <div className="spotify__response-results">
      {responseDataTracks.map(track => (
      <div key={track.id} className="spotify__response-entry">
        <div className="spotify__response-entry-image">
          {track.album.images.length ? <img width={"100px"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
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
  </div>  

  <div className="spotify__responseSection">
    <h3>ALBUMS</h3>
  
    <div className="spotify__response-results">
      {responseDataTracks.map(track => (
      <div key={track.id} className="spotify__response-entry">
        <div className="spotify__response-entry-image">
          {track.album.images.length ? <img width={"100px"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
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
  </div>

  <div className="spotify__responseSection">
    <h3>ARTISTS</h3>
  
    <div className="spotify__response-results">
      {responseDataTracks.map(track => (
      <div key={track.id} className="spotify__response-entry">
        <div className="spotify__response-entry-image">
          {track.album.images.length ? <img width={"100px"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
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
  </div>  
</div>
</>
:
<></>
    }





</div>