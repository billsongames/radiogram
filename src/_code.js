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