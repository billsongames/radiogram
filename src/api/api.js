import { RadioBrowserApi } from 'radio-browser-api'
import { api_test_data } from '../data/api_test_data'

const api = new RadioBrowserApi('My Radio App')
const no_image = "./no_image_available.png"


const api_test_call = () => {
  const response = api_test_data
  for (let i=0; i<response.length; i++) {
    if (response[i].favicon === "") {
    response[i].favicon = no_image
    } 
  }
  console.log(response)
  return(response)


}
// query stations by country code and limit to first 10 stations
const apiSearchByCountry = async (countryCode) => {
  if(!countryCode) {
    return Promise.resolve([])
  } else {
    const response = await api.searchStations({
      countryCode: countryCode,
      limit: 10,
      offset: 0 // this is the default - can be omited
    })

    for (let i=0; i<response.length; i++) {
      if (response[i].favicon === "") {
      response[i].favicon = no_image
      } 
    }
    console.log(response)
    return(response)
  }
}  




export { apiSearchByCountry, api_test_call }
