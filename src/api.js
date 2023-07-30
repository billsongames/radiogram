import { RadioBrowserApi } from 'radio-browser-api'

const api = new RadioBrowserApi('My Radio App')

// query stations by country code and limit to first 100 stations
const stations = await api.searchStations({
  countryCode: 'US',
  limit: 100,
  offset: 0 // this is the default - can be omited
})

