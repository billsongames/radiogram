import { RadioBrowserApi } from 'radio-browser-api'

const api = new RadioBrowserApi('My Radio App')

// query stations by country code and limit to first 100 stations

const getStations = async () => {
  const results = await api.searchStations({
  countryCode: 'GB',
  limit: 100,
  offset: 0 // this is the default - can be omited
  })

console.log(results)
}


export default getStations
