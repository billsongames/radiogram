useEffect(() => {

  async function getArtist() {
    let response = () => {
      return new Promise(function(resolve, reject) {
        fetch("https://api.deezer.com/artist/1/top?limit=5")
      
      .then(response => {
        resolve(response)
      })
    })
    }
    let responseData = await response()
    console.log(responseData.data);
  }
  
    getArtist()
},[])


useEffect(() => {

  async function getArtist() {
    axios
    .get("https://api.deezer.com/artist/1/top?limit=5", cors(corsOptions))
    .then(function(response) {
      console.log(response)
      })
    .catch((error) => {
      console.log(error)
    })
    }

  getArtist()
},[])