for (let i=0; i<response.length; i++) {
  let stationLogo
  let stationName

  if (response[i].favicon === "") {
    stationLogo = no_image
  } else {
    stationLogo = (response[i].favicon)
  }
  stationName = (response[i].name)

  info.push({favicon: stationLogo, name: stationName})
}



const apiSearchbyCountry = async () => {


  let tunerDisplayData=[]
  const results = await api.searchStations({
    countryCode: "GB",
    limit: 10,
    offset: 0 // this is the default - can be omited
  })

  for (let i=0; i<results.length; i++) {
    let stationLogo
    let stationName
    let stationUrlResolved

    if (results[i].favicon === "") {
      stationLogo = no_image
    } else {
      stationLogo = (results[i].favicon)
    }

    stationName = (results[i].name)
    stationUrlResolved = (results[i].urlResolved)

    tunerDisplayData.push({favicon: stationLogo,
                      name: stationName,
                      urlResolved: stationUrlResolved
                          })
    }

    return tunerDisplayData
}


      <Tippy
        interactive={true}
        placement="right"
        content={
          <div className="saved-stations">
            {api_test_data.map((saved_station) => (
              <div className="saved-station__entry" key={saved_station.urlResolved} onClick ={onStationLogoClick}>
                <img
                  className="saved-station__logo"
                  id={saved_station.urlResolved}
                  name={saved_station.name}
                  src={saved_station.favicon}
                  alt={saved_station.name}
                  tags={saved_station.tags}

                  onError={SetDefaultSrc}                  
                />
                <div className="saved-station__name">
                  {saved_station.name}
                </div>
                
              </div>
            ))}
          </div>
        }>
        <button>Saved stations</button>
      </Tippy>